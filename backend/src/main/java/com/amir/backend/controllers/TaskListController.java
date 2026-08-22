package com.amir.backend.controllers;

import com.amir.backend.domain.dto.TaskListDto;
import com.amir.backend.domain.entities.TaskList;
import com.amir.backend.mappers.TaskListMapper;
import com.amir.backend.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-lists")
@CrossOrigin(origins = "http://localhost:5173")
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
    ) {
        TaskList createdTaskList = taskListService.createTaskList(
                taskListMapper.fromDto(taskListDto)
        );
        return taskListMapper.toDto(createdTaskList);
    }
}
