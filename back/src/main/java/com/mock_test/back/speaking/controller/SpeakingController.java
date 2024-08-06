package com.mock_test.back.speaking.controller;

import com.mock_test.back.speaking.model.Speaking;
import com.mock_test.back.speaking.model.SpeakingTest;
import com.mock_test.back.speaking.service.SpeakingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/speaking")
public class SpeakingController {

    @Autowired
    SpeakingService speakingService;

    @PatchMapping("/start")
    public SpeakingTest start() {
        return speakingService.start();
    }

    @GetMapping("/{id}")
    public Speaking getById(@PathVariable("id") Integer id) {
        return speakingService.getById(id);
    }
}
