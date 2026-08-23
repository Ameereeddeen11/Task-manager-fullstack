package com.amir.backend.controllers;

import com.amir.backend.domain.dto.TaskListDto;
import com.amir.backend.domain.entities.TaskList;
import com.amir.backend.mappers.TaskListMapper;
import com.amir.backend.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/task-lists")
public class TaskListController {
    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(
            TaskListService taskListService,
            TaskListMapper taskListMapper
    ) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @GetMapping
    public List<TaskListDto> listTaskLists() {
        return taskListService.listTaskLists()
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskListDto createTaskList(
            @RequestBody
            TaskListDto taskListDto
    ) throws IllegalAccessException {
        TaskList createdTaskList = taskListService.createTaskList(
                taskListMapper.fromDto(taskListDto)
        );
        return taskListMapper.toDto(createdTaskList);
    }

    @GetMapping(path = "/{task_list_id}")
    public Optional<TaskListDto> getTaskListById(
            @PathVariable("task_list_id")
            UUID taskListId
    ) {
        return taskListService.getTaskListById(taskListId).map(taskListMapper::toDto);
    }
}