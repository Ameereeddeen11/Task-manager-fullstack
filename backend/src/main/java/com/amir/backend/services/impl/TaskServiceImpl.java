package com.amir.backend.services.impl;

import com.amir.backend.domain.entities.Task;
import com.amir.backend.domain.entities.TaskList;
import com.amir.backend.domain.entities.TaskPriority;
import com.amir.backend.domain.entities.TaskStatus;
import com.amir.backend.repositories.TaskListRepository;
import com.amir.backend.repositories.TaskRepository;
import com.amir.backend.services.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            TaskListRepository taskListRepository
    ) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<Task> getAllTasksByTaskListId(
            UUID taskListId
    ) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Transactional
    @Override
    public Task createTask(
            UUID taskListId,
            Task task
    ) {
        if (task.getId() != null) {
            throw new IllegalArgumentException("Task already has an ID!");
        }
        if (task.getTitle() == null || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task must have a title!");
        }

        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);
        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List ID provided!"));

        LocalDateTime now = LocalDateTime.now();

        Task taskToSave = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                taskStatus,
                taskPriority,
                taskList,
                task.getDueDate(),
                now,
                now
        );

        return taskRepository.save(taskToSave);
    }

    @Override
    public Optional<Task> getTaskById(
            UUID taskListId,
            UUID taskId
    ) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Transactional
    @Override
    public Task updateTask(
            UUID taskListId,
            UUID taskId,
            Task task
    ) {
        if (task.getId() == null || !task.getId().equals(taskId)) {
            throw new IllegalArgumentException("Task must have an ID that matches the provided taskId!");
        }
        if (!Objects.equals(taskId, task.getId())) {
            throw new IllegalArgumentException("Task IDs do not match!");
        }
        if (task.getPriority() == null) {
            throw new IllegalArgumentException("Task must have a valid priority!");
        }
        if (task.getStatus() == null) {
            throw new IllegalArgumentException("Task must have a valid status!");
        }

        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId, taskId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found!")
                );

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(existingTask);
    }

    @Transactional
    @Override
    public void deleteTask(
            UUID taskListId,
            UUID taskId
    ) {
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}
