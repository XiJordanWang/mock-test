package com.mock_test.back.writing.servicei;

import com.mock_test.back.redis.service.RedisHashService;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.service.TestService;
import com.mock_test.back.writing.dto.WritingDTO;
import com.mock_test.back.writing.model.Writing;
import com.mock_test.back.writing.model.WritingTest;
import com.mock_test.back.writing.repository.WritingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WritingService {

    @Autowired
    WritingRepository writingRepository;

    @Autowired
    RedisHashService redisHashService;

    @Autowired
    TestService testService;

    public void add(List<Writing> list) {
        writingRepository.saveAll(list);
    }

    public WritingTest start() {
        WritingTest result = redisHashService.getWriting();
        Integer integratedId = writingRepository.findFirstByTypeAndIsDoneFalse(Writing.Type.INTEGRATED).getId();
        Integer academicId = writingRepository.findFirstByTypeAndIsDoneFalse(Writing.Type.ACADEMIC_DISCUSSION).getId();
        result.setIntegratedId(integratedId);
        result.setDiscussionId(academicId);
        redisHashService.saveOrUpdateWriting(result);
        return result;
    }


    public WritingDTO getById(Integer id) {
        Writing writing = writingRepository.getReferenceById(id);
        WritingDTO dto = new WritingDTO();
        BeanUtils.copyProperties(writing, dto);
        return dto;
    }

    public Writing getReferenceById(Integer id) {
        return writingRepository.getReferenceById(id);
    }

    public void updateMyWriting(Integer id, String answer) {
        Writing writing = writingRepository.getReferenceById(id);
        writing.setMyResponse(answer);
        writingRepository.save(writing);
    }

    public void finish() {
        WritingTest result = redisHashService.getWriting();
        List<Integer> ids = List.of(result.getIntegratedId(), result.getDiscussionId());
        Test test = testService.findByUUID(result.getId());
        test.setWritingIds(ids);
        testService.saveOrUpdate(test);
        redisHashService.delWriting();
    }
}
