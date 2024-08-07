package com.mock_test.back.speaking.service;

import com.mock_test.back.redis.service.RedisHashService;
import com.mock_test.back.speaking.model.Speaking;
import com.mock_test.back.speaking.model.SpeakingTest;
import com.mock_test.back.speaking.repository.SpeakingRepository;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpeakingService {

    @Autowired
    SpeakingRepository speakingRepository;

    @Autowired
    RedisHashService redisHashService;

    @Autowired
    TestService testService;

    public void add(List<Speaking> speakings) {
        speakingRepository.saveAll(speakings);
    }

    public SpeakingTest start() {
        SpeakingTest result = redisHashService.getSpeaking();
        Speaking section1 = speakingRepository.findFirstByTypeAndIsDoneFalse(Speaking.Type.SECTION1);
        Speaking section2 = speakingRepository.findFirstByTypeAndIsDoneFalse(Speaking.Type.SECTION2);
        Speaking section3 = speakingRepository.findFirstByTypeAndIsDoneFalse(Speaking.Type.SECTION3);
        Speaking section4 = speakingRepository.findFirstByTypeAndIsDoneFalse(Speaking.Type.SECTION4);
        result.setSection1Id(section1.getId());
        result.setSection2Id(section2.getId());
        result.setSection3Id(section3.getId());
        result.setSection4Id(section4.getId());
        redisHashService.saveOrUpdateSpeaking(result);
        return result;
    }

    public Speaking getById(Integer id) {
        return speakingRepository.findById(id).orElse(null);
    }

    public void submit() {
        SpeakingTest result = redisHashService.getSpeaking();
        List<Integer> ids = List.of(result.getSection1Id(),
                result.getSection2Id(),
                result.getSection3Id(),
                result.getSection4Id());

        Test test = testService.findByUUID(result.getId());
        test.setSpeakingIds(ids);
        test.setSpeakingScore(20);
        testService.saveOrUpdate(test);

        speakingRepository.updateIsDoneByIds(ids);

        redisHashService.createWritingTest(result.getId());
        redisHashService.delSpeaking();
    }
}
