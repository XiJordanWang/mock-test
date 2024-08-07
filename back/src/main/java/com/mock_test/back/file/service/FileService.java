package com.mock_test.back.file.service;

import com.mock_test.back.listening.repository.ListeningQuestionRepository;
import com.mock_test.back.listening.repository.ListeningRepository;
import com.mock_test.back.speaking.model.Speaking;
import com.mock_test.back.speaking.repository.SpeakingRepository;
import com.mock_test.back.writing.servicei.WritingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    @Autowired
    ListeningRepository listeningRepository;

    @Autowired
    ListeningQuestionRepository listeningQuestionRepository;

    @Autowired
    SpeakingRepository speakingRepository;

    @Autowired
    WritingService writingService;

    public String getListeningPath(String type, Integer id) {
        String path = "";
        switch (type) {
            case "LISTENING":
                path = listeningRepository.getReferenceById(id).getPath();
                break;
            case "QUESTION":
                path = listeningQuestionRepository.getReferenceById(id).getQuestionPath();
                break;
            case "SPEAKING_QUESTION":
                path = speakingRepository.getReferenceById(id).getQuestionPath();
                break;
            case "SPEAKING_LISTENING":
                path = speakingRepository.getReferenceById(id).getListeningPath();
                break;
            case "INTEGRATED_WRITING":
                path = writingService.getReferenceById(id).getListeningPath();
                break;
            default:
                break;
        }
        return path;
    }

    public void saveFile(MultipartFile file, Integer id) throws IOException {
        String uploadDir = "/Volumes/Info/TOEFLActualQuestions/speaking-response/" + id;
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
        System.out.println("File saved at: " + filePath.toString());

        Speaking speaking = speakingRepository.getReferenceById(id);
        speaking.setResponsePath(filePath.toString());
        speakingRepository.save(speaking);
        System.out.println("Response path set to: " + filePath.toString());
    }
}
