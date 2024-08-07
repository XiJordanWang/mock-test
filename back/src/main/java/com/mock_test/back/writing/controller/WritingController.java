package com.mock_test.back.writing.controller;

import com.mock_test.back.writing.dto.WritingDTO;
import com.mock_test.back.writing.model.WritingTest;
import com.mock_test.back.writing.servicei.WritingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/writing")
public class WritingController {

    @Autowired
    WritingService writingService;


    @PutMapping("/start")
    public WritingTest start() {
        return writingService.start();
    }

    @GetMapping("/{id}")
    public WritingDTO getById(@PathVariable("id") Integer id) {
        return writingService.getById(id);
    }

    @PatchMapping("/{id}")
    public void updateMyWriting(@PathVariable("id") Integer id, @RequestBody String answer) {
        writingService.updateMyWriting(id, answer);
    }

    @DeleteMapping()
    public void finish() {
        writingService.finish();
    }
}
