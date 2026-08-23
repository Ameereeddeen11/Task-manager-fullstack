package com.amir.backend.services.impl;

import com.amir.backend.domain.entities.TaskList;
import com.amir.backend.repositories.TaskListRepository;
import com.amir.backend.services.TaskListService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {
    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskList> listTaskLists() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskList createTaskList(TaskList taskList) throws IllegalAccessException {
        if (null != taskList.getId()) {
            throw new IllegalArgumentException("Task list ID must be null when creating a new task list");
        }

        if (null == taskList.getTasks() || taskList.getTitle().isBlank()) {
            throw new IllegalAccessException("Task list must have a title and tasks when creating a new task list");
        }

        LocalDateTime now = LocalDateTime.now();

        return taskListRepository.save(new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                null,
                now,
                now
        ));
    }

    @Override
    public Optional<TaskList> getTaskListById(UUID id) {
        return taskListRepository.findById(id);
    }
}
