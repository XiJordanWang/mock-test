package com.mock_test.back.reading.service;

import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.model.Article;
import com.mock_test.back.reading.model.Question;
import com.mock_test.back.reading.model.Selection;
import com.mock_test.back.reading.repository.ArticlesRepository;
import com.mock_test.back.reading.repository.QuestionRepository;
import com.mock_test.back.reading.repository.SelectionRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticlesService {

    @Autowired
    ArticlesRepository articlesRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    SelectionRepository selectionRepository;

    public ReadingDTO getQuestion(Integer id, Integer questionNum) {
        int index = questionNum - 10 > 0 ? questionNum - 10 : questionNum;
        Article article = articlesRepository.getReferenceById(id);
        Question question = questionRepository.findByArticleId(article.getId()).get(index);
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
}
