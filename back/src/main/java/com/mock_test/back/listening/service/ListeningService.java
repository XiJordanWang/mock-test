package com.mock_test.back.listening.service;

import com.mock_test.back.listening.dto.ListeningSaveDTO;
import com.mock_test.back.listening.model.Listening;
import com.mock_test.back.listening.model.ListeningQuestion;
import com.mock_test.back.listening.model.ListeningSelection;
import com.mock_test.back.listening.repository.ListeningQuestionRepository;
import com.mock_test.back.listening.repository.ListeningRepository;
import com.mock_test.back.listening.repository.ListeningSelectionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListeningService {

    @Autowired
    ListeningRepository listeningRepository;

    @Autowired
    ListeningQuestionRepository listeningQuestionRepository;

    @Autowired
    ListeningSelectionRepository listeningSelectionRepository;

    @Transactional
    public void save(List<ListeningSaveDTO> dto) {
        dto.forEach(item -> {
            Listening listening = listeningRepository.save(Listening.builder()
                    .type(item.getType())
                    .path("/")
                    .build());
            item.getQuestions().forEach(question -> {
                ListeningQuestion listeningQuestion = listeningQuestionRepository.save(ListeningQuestion.builder()
                        .listeningId(listening.getId())
                        .sequence(question.getSequence())
                        .type(question.getType())
                        .question(question.getQuestion())
                        .correctness(false)
                        .correctAnswer(question.getCorrectAnswer())
                        .build());

                List<ListeningSelection> list = question.getSelections().stream().map(selection -> ListeningSelection.builder()
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
}
