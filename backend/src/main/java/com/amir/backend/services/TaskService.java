package com.amir.backend.services;

import com.amir.backend.domain.entities.Task;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {
    List<Task> getAllTasksByTaskListId(UUID taskListId);
    Task createTask(UUID taskListId, Task task);
    Optional<Task> getTaskById(UUID taskListId, UUID taskId);
    Task updateTask(UUID taskListId, UUID taskId, Task task);
    void deleteTask(UUID taskListId, UUID taskId);
}
