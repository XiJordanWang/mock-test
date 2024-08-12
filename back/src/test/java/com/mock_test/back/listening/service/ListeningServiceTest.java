package com.mock_test.back.listening.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ListeningServiceTest {

    @Autowired
    ListeningService listeningService;

    @Test
    public void test(){
        List<Integer> ids = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28);
        AtomicInteger myRawScore = new AtomicInteger(0);
        AtomicInteger totalRawScore = new AtomicInteger(0);
        listeningService.computeScore(ids, myRawScore, totalRawScore);

        System.out.println("myRawScore = " + myRawScore);
        System.out.println("totalRawScore = " + totalRawScore);
        System.out.println("score = " + (int) Math.round(((double) myRawScore.get() / totalRawScore.get()) * 30));
    }
}