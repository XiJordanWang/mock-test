package com.mock_test.back.file.controller;

import com.mock_test.back.listening.service.ListeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    ListeningService listeningService;

    @GetMapping("/{type}/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable("type") String type, @PathVariable("id") Integer id) {
        try {
            String listeningPath = listeningService.getListeningPath(type, id);
//            String listeningPath = "/Volumes/Info/TOEFLActualQuestions/2020-2023Listening/2022/Audio/1/1_1.mp3";
            Path filePath = Paths.get(listeningPath).toAbsolutePath().normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
