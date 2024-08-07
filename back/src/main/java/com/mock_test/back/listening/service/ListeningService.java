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
import com.mock_test.back.reading.dto.GradeReadingDTO;
import com.mock_test.back.redis.service.RedisHashService;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.service.TestService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

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

    @Autowired
    TestService testService;

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
                .questions(listeningQuestionRepository.findByListeningIdOrderBySequenceAsc(listening.getId()).stream()
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
                .correctNumber(selections.stream().filter(ListeningSelection::getIsCorrect).count())
                .question(question.getQuestion())
                .selections(selectionsDTOS)
                .build();
    }

    public void select(Integer questionId, Integer selectionId) {
        ListeningTest result = redisHashService.getListening();
        if (result.getCurrentSection().equals("section1")) {
            updateMyAnswer(result.getSection1(), questionId, selectionId);
        } else {
            updateMyAnswer(result.getSection2(), questionId, selectionId);
        }
        redisHashService.saveOrUpdateListening(result);
    }

    public void multipleSelect(Integer questionId, List<Integer> options) {
        ListeningTest result = redisHashService.getListening();
        if (result.getCurrentSection().equals("section1")) {
            updateMyAnswers(result.getSection1(), questionId, options);
        } else {
            updateMyAnswers(result.getSection2(), questionId, options);
        }
        redisHashService.saveOrUpdateListening(result);
    }

    private void updateMyAnswer(List<ListeningTest.ListeningDetail> section,
                                Integer questionId,
                                Integer selectionId) {
        section.forEach(item -> item.getQuestions().stream()
                .filter(question -> question.getId().equals(questionId))
                .findFirst()
                .ifPresent(question -> question.setMyAnswer(selectionId)));
    }

    private void updateMyAnswers(List<ListeningTest.ListeningDetail> section,
                                 Integer questionId,
                                 List<Integer> options) {
        section.forEach(item -> item.getQuestions().stream()
                .filter(question -> question.getId().equals(questionId))
                .findFirst()
                .ifPresent(question -> question.setMyAnswers(options)));
    }

    private void updateListeningTest(ListeningTest result, String section, int index, int remainTime) {
        result.setCurrentSection(section);
        result.setRemainTime(remainTime);
        result.setIndex(index);

        AtomicInteger currentListeningId = new AtomicInteger(0);
        AtomicInteger currentQuestionId = new AtomicInteger(0);

        List<ListeningTest.ListeningDetail> sectionList = section.equals("section1") ?
                result.getSection1() : result.getSection2();

        sectionList.stream()
                .flatMap(detail -> detail.getQuestions().stream()
                        .filter(question -> question.getIndex().equals(index))
                        .map(question -> new AbstractMap.SimpleEntry<>(detail.getId(), question.getId())))
                .findFirst()
                .ifPresent(entry -> {
                    currentListeningId.set(entry.getKey());
                    currentQuestionId.set(entry.getValue());
                });

        result.setCurrentListeningId(currentListeningId.get());
        result.setCurrentQuestionId(currentQuestionId.get());
        result.setTotal(section.equals("section1") ? 11 : 17);
        redisHashService.saveOrUpdateListening(result);
    }

    public ListeningTest next() {
        ListeningTest result = redisHashService.getListening();
        AtomicInteger index = new AtomicInteger(result.getIndex() + 1);

        // Check if we need to switch sections
        if (index.get() > 11 && result.getCurrentSection().equals("section1")) {
            updateListeningTest(result, "section2", 1, 60 * 10);
        } else {
            result.setIndex(index.get());
            updateListeningTest(result, result.getCurrentSection(), index.get(), result.getRemainTime());
        }

        return result;
    }

    public ListeningTest changeSection() {
        ListeningTest result = redisHashService.getListening();
        updateListeningTest(result, "section1", 11, 60 * 10);
        return result;
    }

    @Transactional
    public void submit() {
        ListeningTest result = redisHashService.getListening();
        List<ListeningTest.ListeningDetail> listeningList = new ArrayList<>();
        listeningList.addAll(result.getSection1());
        listeningList.addAll(result.getSection2());

        List<Integer> listeningIds = new ArrayList<>();
        List<Integer> questionIds = new ArrayList<>();
        List<Integer> myAnswers = new ArrayList<>();
        listeningList.forEach(listening -> {
            listeningIds.add(listening.getId());
            myAnswers.addAll(listening.getQuestions().stream()
                    .map(ListeningTest.ListeningQuestion::getMyAnswer)
                    .filter(Objects::nonNull)
                    .toList());
            questionIds.addAll(listening.getQuestions().stream()
                    .map(ListeningTest.ListeningQuestion::getId)
                    .toList());
        });


        listeningSelectionRepository.updateMyAnswerToTrue(myAnswers);

        AtomicInteger myRawScore = new AtomicInteger(0);
        AtomicInteger totalRawScore = new AtomicInteger(0);
        this.computeScore(questionIds, myRawScore, totalRawScore);

        listeningRepository.updateIsDoneToTrue(listeningIds);

        Test test = testService.findByUUID(result.getId());
        test.setListeningIds(listeningIds);
        test.setListeningScale(myRawScore.get() + "/" + totalRawScore.get());
        test.setListeningScore((int) Math.round(((double) myRawScore.get() / totalRawScore.get()) * 30));
        testService.saveOrUpdate(test);

        listeningRepository.updateIsDoneToTrue(questionIds);
        redisHashService.createSpeakingTest(result.getId());
        redisHashService.delListening();
    }

    private void computeScore(List<Integer> questionIds,
                              AtomicInteger myRawScore,
                              AtomicInteger totalRawScore) {
        List<ListeningQuestion> questions = listeningQuestionRepository.findAllById(questionIds);
        List<Integer> correctQuestionIds = new ArrayList<>();
        questions.forEach(question -> {
            List<ListeningSelection> multipleSelections = listeningSelectionRepository.findByQuestionId(question.getId());
            long correctAnswersCount = multipleSelections.stream()
                    .filter(item -> Boolean.TRUE.equals(item.getIsCorrect()))
                    .count();
            long count = multipleSelections.stream()
                    .filter(item -> Boolean.TRUE.equals(item.getMyAnswer()) && Boolean.TRUE.equals(item.getIsCorrect()))
                    .count();
            if (question.getType().equals(ListeningQuestion.Type.MULTIPLE_CHOICE)) {
                totalRawScore.getAndAdd(2);
                if (count == correctAnswersCount) {
                    myRawScore.getAndAdd(2);
                    correctQuestionIds.add(question.getId());
                }
                if (count == correctAnswersCount - 1) {
                    myRawScore.getAndAdd(1);
                }
                return;
            }
            if (count == 1) {
                myRawScore.getAndAdd(1);
                correctQuestionIds.add(question.getId());
            }
            totalRawScore.getAndAdd(1);
        });
        listeningQuestionRepository.updateCorrectnessToTrue(correctQuestionIds);
    }
}
