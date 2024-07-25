package com.mock_test.back.reading.controller;

import com.mock_test.back.reading.dto.AddReadingDTO;
import com.mock_test.back.reading.dto.ReadingDTO;
import com.mock_test.back.reading.service.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reading")
public class ReadingController {

    @Autowired
    ArticlesService articlesService;

    @PostMapping("/start")
    String start() {
        return articlesService.startReadingTest();
    }


    @GetMapping("/{id}/{questionNum}")
    ReadingDTO getById(@PathVariable("id") Integer id, @PathVariable("questionNum") Integer questionNum) {
        return articlesService.getQuestion(id, questionNum);
    }

    @PostMapping("")
    void add(@RequestBody AddReadingDTO dto) {
        articlesService.add(dto);
    }
}
