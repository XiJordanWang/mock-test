package com.mock_test.back.reading.service;

import com.mock_test.back.redis.service.RedisHashService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ArticlesServiceTest {

    @Autowired
    RedisHashService redisHashService;


    @Test
    public void test() {
        redisHashService.createListeningTest("47bc1fcc-311f-497e-a285-79e3dc6d7be7");
    }
}