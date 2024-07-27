package com.mock_test.back.reading.controller;

import com.mock_test.back.reading.dto.AddReadingDTO;
import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.model.ReadingTest;
import com.mock_test.back.reading.service.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/reading")
public class ReadingController {

    @Autowired
    ArticlesService articlesService;

    @PostMapping("/start")
    ReadingTest start() {
        return articlesService.startReadingTest();
    }

    @GetMapping("/review")
    ReadingTest review() {
        return articlesService.review();
    }

    @GetMapping("/question/{index}")
    ReadingTest backToQuestion(@PathVariable("index") Integer index) {
        return articlesService.backToQuestion(index);
    }

    @PutMapping("/next/{index}/{option}")
    ReadingTest next(@PathVariable("index") Integer index, @PathVariable("option") Integer option) {
        return articlesService.next(index, option);
    }

    @PutMapping("/back/{index}")
    ReadingTest back(@PathVariable("index") Integer index) {
        return articlesService.back(index);
    }

    @GetMapping("/{questionNum}")
    ReadingDTO getByQuestionNum(@PathVariable("questionNum") Integer questionNum) {
        return articlesService.getByQuestionNum(questionNum);
    }

    @PostMapping("")
    void add(@RequestBody AddReadingDTO dto) {
        articlesService.add(dto);
    }
}
