package com.mock_test.back.test.controller;

import com.mock_test.back.test.dto.DashboardDTO;
import com.mock_test.back.test.dto.TestDTO;
import com.mock_test.back.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping
    public Page<TestDTO> getTests(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return testService.findPaginated(page, size);
    }
}
