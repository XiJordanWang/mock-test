package com.mock_test.back.redis.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mock_test.back.task.model.Task;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class RedisListService {

    private static final String TASKS_KEY = "Daily_Task";
    private static final long EXPIRATION_TIME = 16L;

    @Autowired
    RedisTemplate<String, List<Task>> redisListTemplate;

    @Autowired
    ObjectMapper objectMapper;

    @PostConstruct
    public void init() {
        List<Task> tasks = Arrays.asList(
                new Task(1, "Review Vocabulary", false),
                new Task(2, "Spelling Practice", false),
                new Task(3, "Review Useful Words and Phrases", false),
                new Task(4, "Review Writing Errors", false),
                new Task(5, "Watch TED-Ed Videos", false),
                new Task(6, "Mock Test", false),
                new Task(7, "Analyze Mock Test Questions", false),
                new Task(8, "Listen to Podcasts", false)
        );
        List<Task> existTask = getTasks();
        if (existTask == null || existTask.isEmpty()) {
            saveTasks(tasks);
        }
    }

    public List<Task> getTasks() {
        Object tasksObject = redisListTemplate.opsForValue().get(TASKS_KEY);
        if (tasksObject != null) {
            // Handle the case where data might be stored as a List of LinkedHashMap
            List<Map<String, Object>> taskMaps = (List<Map<String, Object>>) tasksObject;
            return objectMapper.convertValue(taskMaps, new TypeReference<>() {
            });
        }
        return null;
    }

    public void saveTasks(List<Task> tasks) {
        ValueOperations<String, List<Task>> ops = redisListTemplate.opsForValue();
        ops.set(TASKS_KEY, tasks, EXPIRATION_TIME, TimeUnit.HOURS);
    }

    public void updateTask(int taskId, boolean completed) {
        List<Task> tasks = getTasks();
        for (Task task : tasks) {
            if (task.getId() == taskId) {
                task.setCompleted(completed);
                break;
            }
        }
        saveTasks(tasks);
    }
}