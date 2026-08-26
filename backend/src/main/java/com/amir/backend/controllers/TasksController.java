package com.amir.backend.controllers;

import com.amir.backend.domain.dto.TaskDto;
import com.amir.backend.domain.entities.Task;
import com.amir.backend.mappers.TaskMapper;
import com.amir.backend.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists/{task_list_id}/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TasksController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;


    public TasksController(
            TaskService taskService,
            TaskMapper taskMapper
    ) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping
    public List<TaskDto> getAllTasks(
            @PathVariable("task_list_id")
            UUID taskListId
    ) {
        return taskService.getAllTasksByTaskListId(taskListId)
                .stream()
                .map(taskMapper::toDTO)
                .toList();
    }

    @GetMapping(path = "/{task_id}")
    public Optional<TaskDto> getTaskById(
            @PathVariable("task_list_id")
            UUID taskListId,
            @PathVariable("task_id")
            UUID taskId
    ) {
        return taskService.getTaskById(taskListId, taskId).map(taskMapper::toDTO);
    }

    @PostMapping
    public TaskDto createTask(
            @PathVariable("task_list_id")
            UUID taskListId,
            @RequestBody
            TaskDto taskDto
    ) {
        Task createdTask = taskService.createTask(
                taskListId,
                taskMapper.fromDTO(taskDto)
        );
        return taskMapper.toDTO(createdTask);
    }

    @PutMapping(path = "/{task_id}")
    public TaskDto updateTask(
            @PathVariable("task_list_id")
            UUID taskListId,
            @PathVariable("task_id")
            UUID taskId,
            @RequestBody
            TaskDto taskDto
    ) {
        Task updatedTask = taskService.updateTask(
                taskListId,
                taskId,
                taskMapper.fromDTO(taskDto)
        );
        return taskMapper.toDTO(updatedTask);
    }

    @DeleteMapping(path = "/{task_id}")
    public void deleteTask(
            @PathVariable("task_list_id")
            UUID taskListId,
            @PathVariable("task_id")
            UUID taskId
    ) {
        taskService.deleteTask(taskListId, taskId);
    }
}
