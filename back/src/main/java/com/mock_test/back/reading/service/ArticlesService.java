package com.mock_test.back.reading.service;

import com.mock_test.back.reading.dto.AddReadingDTO;
import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.model.Article;
import com.mock_test.back.reading.model.Question;
import com.mock_test.back.reading.model.Selection;
import com.mock_test.back.reading.repository.ArticlesRepository;
import com.mock_test.back.reading.repository.QuestionRepository;
import com.mock_test.back.reading.repository.SelectionRepository;
import com.mock_test.back.redis.service.RedisHashService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ArticlesService {

    @Autowired
    ArticlesRepository articlesRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SelectionRepository selectionRepository;

    @Autowired
    RedisHashService redisHashService;

    public String startReadingTest() {
        return redisHashService.createReadingTest();
    }


    public ReadingDTO getQuestion(Integer id, Integer questionNum) {
        int index = questionNum - 10 > 0 ? questionNum - 10 : questionNum;
        Article article = articlesRepository.getReferenceById(id);
        Question question = questionRepository.findByArticleIdOrderBySequenceAsc(article.getId()).get(index);
        List<Selection> selections = selectionRepository.findByQuestionId(question.getId());
        List<ReadingDTO.SelectionDTO> selectionDTOS = new ArrayList<>();
        selections.forEach(item -> selectionDTOS.add(ReadingDTO.SelectionDTO.builder()
                .id(item.getId())
                .information(item.getInformation())
                .build()));

        return ReadingDTO.builder()
                .id(article.getId())
                .heading(article.getHeading())
                .context(article.getContext())
                .paragraphNum(question.getParagraphNum())
                .question(question.getQuestion())
                .type(question.getType())
                .selections(selectionDTOS)
                .build();
    }

    @Transactional
    public void add(AddReadingDTO dto) {
        Article article = articlesRepository.save(Article.builder()
                .heading(dto.getHeading())
                .context(dto.getContext())
                .build());

        List<Selection> selections = new ArrayList<>();

        AtomicInteger paragraphNum = new AtomicInteger(1);
        dto.getQuestions().forEach(questionDTO -> {
            int currentParagraphNum = this.getParagraphNum(paragraphNum.get(), questionDTO);
            paragraphNum.set(currentParagraphNum);
            Question question = questionRepository.save(Question.builder()
                    .articleId(article.getId())
                    .paragraphNum(this.getParagraphNum(currentParagraphNum, questionDTO))
                    .question(StringUtils.capitalize(questionDTO.getQuestion()))
                    .sequence(questionDTO.getSequence())
                    .type(this.checkQuestionType(questionDTO))
                    .build());

            questionDTO.getSelections().forEach(item -> {
                selections.add(Selection.builder()
                        .information(StringUtils.capitalize(item.getInformation()))
                        .questionId(question.getId())
                        .questionSequence(question.getSequence())
                        .option(item.getOption())
                        .isCorrect(questionDTO.getCorrectAnswer().contains(item.getOption().toString()))
                        .build());
            });
        });
        selectionRepository.saveAll(selections);
    }

    private int getParagraphNum(int paragraphNum, AddReadingDTO.QuestionDTO questionDTO) {
        if (questionDTO.getQuestion().contains("paragraph")) {
            paragraphNum = Integer.parseInt(Objects.requireNonNull(this.getParagraphNumber(questionDTO.getQuestion())));
        }
        if (questionDTO.getSequence() == 10) {
            paragraphNum = 0;
        }
        return paragraphNum;
    }

    private Question.Type checkQuestionType(AddReadingDTO.QuestionDTO questionDTO) {
        Question.Type type = Question.Type.SELECTION;
        if (questionDTO.getQuestion().contains("The word")) {
            type = Question.Type.VOCABULARY;
        }
        if (questionDTO.getQuestion().contains("TWO")) {
            type = Question.Type.MULTIPLE_CHOICE;
        }
        if (questionDTO.getSequence() == 9) {
            type = Question.Type.INSERTION;
        }
        if (questionDTO.getSequence() == 10) {
            type = Question.Type.DRAG;
        }
        return type;
    }

    private String getParagraphNumber(String input) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }
}
