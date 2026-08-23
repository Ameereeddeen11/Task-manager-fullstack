package com.amir.backend.services;

import com.amir.backend.domain.entities.TaskList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskListService {
    List<TaskList> listTaskLists();
    TaskList createTaskList(TaskList taskList) throws IllegalAccessException;
    Optional<TaskList> getTaskListById(UUID id);
    TaskList updateTaskList(UUID id, TaskList taskList);
}
