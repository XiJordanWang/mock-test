package com.mock_test.back.task.controller;

import com.mock_test.back.redis.service.RedisListService;
import com.mock_test.back.task.model.Task;
import com.mock_test.back.task.request.TaskCompletionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    RedisListService redisListService;

    @GetMapping
    public List<Task> getTasks() {
        return redisListService.getTasks();
    }

    @PostMapping("/{id}/complete")
    public void completeTask(@PathVariable int id, @RequestBody TaskCompletionRequest request) {
        redisListService.updateTask(id, request.isCompleted());
    }
}
