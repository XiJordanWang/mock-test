package com.mock_test.back.listening.service;

import com.mock_test.back.listening.dto.ListeningDTO;
import com.mock_test.back.listening.dto.ListeningSaveDTO;
import com.mock_test.back.listening.model.ListeningTest;
import com.mock_test.back.listening.model.Listening;
import com.mock_test.back.listening.model.ListeningQuestion;
import com.mock_test.back.listening.model.ListeningSelection;
import com.mock_test.back.listening.repository.ListeningQuestionRepository;
import com.mock_test.back.listening.repository.ListeningRepository;
import com.mock_test.back.listening.repository.ListeningSelectionRepository;
import com.mock_test.back.redis.service.RedisHashService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ListeningService {

    @Autowired
    ListeningRepository listeningRepository;

    @Autowired
    ListeningQuestionRepository listeningQuestionRepository;

    @Autowired
    ListeningSelectionRepository listeningSelectionRepository;

    @Autowired
    RedisHashService redisHashService;

    private final String COMMON_PATH = "/Volumes/Info/TOEFLActualQuestions/2020-2023Listening/2022/Audio/";

    @Transactional
    public void save(List<ListeningSaveDTO> dto) {
        dto.forEach(item -> {
            String folder = COMMON_PATH + item.getDocumentId() + "/";

            Listening listening = listeningRepository.save(Listening.builder()
                    .type(item.getType())
                    .path(folder + item.getDocumentId() + ".mp3")
                    .isDone(false)
                    .build());
            item.getQuestions().forEach(question -> {
                ListeningQuestion listeningQuestion = listeningQuestionRepository.save(ListeningQuestion.builder()
                        .listeningId(listening.getId())
                        .sequence(question.getSequence())
                        .questionPath(folder + item.getDocumentId() + "_" + question.getSequence() + ".mp3")
                        .type(question.getType())
                        .question(question.getQuestion())
                        .correctness(false)
                        .correctAnswer(question.getCorrectAnswer())
                        .build());

                List<ListeningSelection> list = question.getSelections().stream()
                        .map(selection -> ListeningSelection.builder()
                                .questionId(listeningQuestion.getId())
                                .questionSequence(listeningQuestion.getSequence())
                                .information(selection.getInformation())
                                .option(selection.getOption())
                                .isCorrect(question.getCorrectAnswer().contains(selection.getOption().toString()))
                                .build()).toList();

                listeningSelectionRepository.saveAll(list);
            });
        });
    }

    public ListeningTest start() {
        ListeningTest result = redisHashService.getListening();

        Map<Listening.Type, List<Listening>> collect = listeningRepository.findByIsDoneFalse().stream()
                .collect(Collectors.groupingBy(Listening::getType));

        List<Listening> conversations = collect.getOrDefault(Listening.Type.CONVERSATION, new ArrayList<>());
        List<Listening> lectures = collect.getOrDefault(Listening.Type.LECTURE, new ArrayList<>());

        if (conversations.size() < 2 || lectures.size() < 3) {
            return result;
        }

        AtomicInteger index = new AtomicInteger(1);
        List<ListeningTest.ListeningDetail> section1 = List.of(
                createListeningDetail(conversations.get(0), index),
                createListeningDetail(lectures.get(0), index)
        );

        index.set(1);
        List<ListeningTest.ListeningDetail> section2 = List.of(
                createListeningDetail(conversations.get(1), index),
                createListeningDetail(lectures.get(1), index),
                createListeningDetail(lectures.get(2), index)
        );

        result.setIndex(1);
        result.setTotal(11);
        result.setStartTime(LocalDateTime.now().toString());
        result.setRemainTime(60 * 6 + 30);
        result.setCurrentSection("section1");
        result.setCurrentListeningId(conversations.get(0).getId());
        result.setCurrentQuestionId(section1.get(0).getQuestions().get(0).getId());
        result.setSection1(section1);
        result.setSection2(section2);

        redisHashService.startListeningTest(result);
        return result;
    }

    private ListeningTest.ListeningDetail createListeningDetail(Listening listening, AtomicInteger index) {
        return ListeningTest.ListeningDetail.builder()
                .id(listening.getId())
                .type(listening.getType().toString())
                .questions(listeningQuestionRepository.findByListeningId(listening.getId()).stream()
                        .map(item -> ListeningTest.ListeningQuestion.builder()
                                .index(index.getAndAdd(1))
                                .id(item.getId())
                                .type(item.getType().toString())
                                .question(item.getQuestion())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public ListeningDTO getQuestionInfo(Integer id) {
        ListeningQuestion question = listeningQuestionRepository.getReferenceById(id);
        List<ListeningSelection> selections = listeningSelectionRepository.findByQuestionId(question.getId());
        List<ListeningDTO.ListeningSelectionsDTO> selectionsDTOS = new ArrayList<>();
        selections.forEach(item -> {
            selectionsDTOS.add(ListeningDTO.ListeningSelectionsDTO.builder()
                    .id(item.getId())
                    .information(item.getInformation())
                    .build());
        });
        return ListeningDTO.builder()
                .id(question.getId())
                .type(question.getType())
                .question(question.getQuestion())
                .selections(selectionsDTOS)
                .build();
    }

    public void select(Integer questionId, Integer selectionId) {
        ListeningTest result = redisHashService.getListening();
        updateMyAnswer(result.getSection1(), questionId, selectionId);
        updateMyAnswer(result.getSection2(), questionId, selectionId);
        redisHashService.saveOrUpdateListening(result);
    }

    private void updateMyAnswer(List<ListeningTest.ListeningDetail> section,
                                Integer questionId,
                                Integer selectionId) {
        section.forEach(item -> item.getQuestions().stream()
                .filter(question -> item.getId().equals(questionId))
                .findFirst()
                .ifPresent(question -> question.setMyAnswer(selectionId)));
    }

    public ListeningTest next() {
        ListeningTest result = redisHashService.getListening();
        AtomicInteger index = new AtomicInteger(result.getIndex() + 1);

        // Check if we need to switch sections
        if (index.get() > 11 && result.getCurrentSection().equals("section1")) {
            result.setCurrentSection("section2");
            index.set(1);
            result.setRemainTime(60 * 10);
        }
        result.setIndex(index.get());

        // Determine the current section list
        List<ListeningTest.ListeningDetail> section = result.getCurrentSection().equals("section1") ?
                result.getSection1() : result.getSection2();

        // Find the next question
        AtomicInteger currentListeningId = new AtomicInteger(0);
        AtomicInteger currentQuestionId = new AtomicInteger(0);

        section.stream()
                .flatMap(detail -> detail.getQuestions().stream()
                        .filter(question -> question.getIndex().equals(index.get()))
                        .map(question -> new AbstractMap.SimpleEntry<>(detail.getId(), question.getId())))
                .findFirst()
                .ifPresent(entry -> {
                    currentListeningId.set(entry.getKey());
                    currentQuestionId.set(entry.getValue());
                });

        result.setCurrentListeningId(currentListeningId.get());
        result.setCurrentQuestionId(currentQuestionId.get());
        result.setTotal(result.getCurrentSection().equals("section1") ? 11 : 17);
        redisHashService.saveOrUpdateListening(result);
        return result;
    }


    public String getListeningPath(String type, Integer id) {
        String path = "";
        switch (type) {
            case "LISTENING":
                path = listeningRepository.getReferenceById(id).getPath();
                break;
            case "QUESTION":
                path = listeningQuestionRepository.getReferenceById(id).getQuestionPath();
                break;
            default:
                break;
        }
        return path;
    }
}
