package com.mock_test.back.file.service;

import com.mock_test.back.listening.repository.ListeningQuestionRepository;
import com.mock_test.back.speaking.model.Speaking;
import com.mock_test.back.speaking.repository.SpeakingRepository;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.ExecuteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.exec.CommandLine;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    @Autowired
    ListeningQuestionRepository listeningQuestionRepository;

    @Autowired
    SpeakingRepository speakingRepository;

    public String getListeningPath(String type, Integer id) {
        String path = "";
        switch (type) {
            case "LISTENING":
//                path = listeningRepository.getReferenceById(id).getPath();
                path = "/Volumes/Info/TOEFLActualQuestions/2020-2023Listening/2022/Audio/1/1_1.mp3";
                break;
            case "QUESTION":
                path = listeningQuestionRepository.getReferenceById(id).getQuestionPath();
                break;
            case "SPEAKING_QUESTION":
                path = speakingRepository.getReferenceById(id).getQuestionPath();
                break;
            default:
                break;
        }
        return path;
    }

    public void saveFile(MultipartFile file, Integer id) throws IOException {
        String uploadDir = "/Volumes/Info/TOEFLActualQuestions/speaking-response/" + id;
        Path uploadPath = Paths.get(uploadDir);

        // 确保目录存在
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 保存文件到指定目录
        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.write(filePath, file.getBytes());
        System.out.println("File saved at: " + filePath.toString());

        // 更新数据库中的response path
        Speaking speaking = speakingRepository.getReferenceById(id);
        speaking.setResponsePath(filePath.toString());
        speakingRepository.save(speaking);  // 保存更新的实体
        System.out.println("Response path set to: " + filePath.toString());
    }
}
