package com.mock_test.back.listening.controller;

import com.mock_test.back.listening.dto.ListeningDTO;
import com.mock_test.back.listening.dto.ListeningSaveDTO;
import com.mock_test.back.listening.model.ListeningTest;
import com.mock_test.back.listening.service.ListeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listening")
public class ListeningController {

    @Autowired
    ListeningService listeningService;

    @PostMapping
    public void save(@RequestBody List<ListeningSaveDTO> dto) {
        listeningService.save(dto);
    }

    @PutMapping
    public ListeningTest start() {
        return listeningService.start();
    }

    @GetMapping("/question/{id}")
    public ListeningDTO question(@PathVariable("id") Integer id) {
        return listeningService.getQuestionInfo(id);
    }

    @PatchMapping("/select/{questionId}/{selectionId}")
    public void select(@PathVariable("questionId") Integer questionId,
                       @PathVariable("selectionId") Integer selectionId) {
        listeningService.select(questionId, selectionId);
    }

    @PatchMapping("/select/{questionId}")
    void multipleSelect(@PathVariable("questionId") Integer questionId, @RequestBody List<Integer> options) {
        listeningService.multipleSelect(questionId, options);
    }

    @PutMapping("/next")
    public ListeningTest next() {
        return listeningService.next();
    }

    @PatchMapping("/next/section")
    public ListeningTest changeSection() {
        return listeningService.changeSection();
    }

    @PatchMapping("/submit")
    public void submit() {
        listeningService.submit();
    }
}
