package com.mock_test.back.redis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

@Service
public class RedisHashService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final static String READING = "READING";

    public String createReadingTest() {
        String id = UUID.randomUUID().toString();
        String key = READING + ":" + id;
        Map<String, Object> hash = new HashMap<>();
        hash.put("startTime", LocalDateTime.now());
        hash.put("field2", "value2");
        // 获取 Hash 操作对象
        redisTemplate.opsForHash().putAll(key, hash);
        redisTemplate.expire(key, 2, TimeUnit.HOURS);
        return id;
    }
}
