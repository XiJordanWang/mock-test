package com.mock_test.back.test.controller;

import com.mock_test.back.test.dto.DashboardDTO;
import com.mock_test.back.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    TestService testService;

    @GetMapping("/last")
    public DashboardDTO getLastTest() {
        return testService.getLastTest();
    }

    @GetMapping("/average")
    public DashboardDTO getAverage() {
       return testService.getAverage();
    }
}
