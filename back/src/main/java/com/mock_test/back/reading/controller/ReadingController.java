package com.mock_test.back.reading.controller;

import com.mock_test.back.reading.dto.AddReadingDTO;
import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.model.ReadingTest;
import com.mock_test.back.reading.service.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reading")
public class ReadingController {

    @Autowired
    ArticlesService articlesService;

    @PostMapping
    void add(@RequestBody List<AddReadingDTO> dto) {
        dto.forEach(item -> articlesService.add(item));
    }

    @PatchMapping
    void submit() {
        articlesService.submit();
    }

    @PostMapping("/start")
    ReadingTest start() {
        return articlesService.startReadingTest();
    }

    @GetMapping("/review")
    ReadingTest review() {
        return articlesService.review();
    }

    @PutMapping("/next/{index}")
    ReadingTest next(@PathVariable("index") Integer index) {
        return articlesService.next(index);
    }

    @PutMapping("/back/{index}")
    ReadingTest back(@PathVariable("index") Integer index) {
        return articlesService.back(index);
    }


    @GetMapping("/question/{index}")
    ReadingTest backToQuestion(@PathVariable("index") Integer index) {
        return articlesService.backToQuestion(index);
    }

    @GetMapping("/{questionNum}")
    ReadingDTO getByQuestionNum(@PathVariable("questionNum") Integer questionNum) {
        return articlesService.getByQuestionNum(questionNum);
    }

    @PatchMapping("/select/{index}/{option}")
    void select(@PathVariable("index") Integer index, @PathVariable("option") Integer option) {
        articlesService.select(index, option);
    }

    @PatchMapping("/select/{index}")
    void multipleSelect(@PathVariable("index") Integer index, @RequestBody List<Integer> options) {
        articlesService.multipleSelect(index, options);
    }
}
