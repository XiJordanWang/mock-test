package com.mock_test.back.listening.controller;

import com.mock_test.back.listening.dto.ListeningSaveDTO;
import com.mock_test.back.listening.service.ListeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
