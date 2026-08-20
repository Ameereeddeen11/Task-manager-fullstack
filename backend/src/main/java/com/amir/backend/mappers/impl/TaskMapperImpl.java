package com.amir.backend.mappers.impl;

import com.amir.backend.domain.dto.TaskDto;
import com.amir.backend.domain.entities.Task;
import com.amir.backend.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements TaskMapper {
    @Override
    public Task fromDTO(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.status(),
                taskDto.priority(),
                null,
                taskDto.dueDate(),
                null,
                null
        );
    }

    @Override
    public TaskDto toDTO(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }
}
