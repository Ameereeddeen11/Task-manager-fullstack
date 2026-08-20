package com.amir.backend.mappers;

import com.amir.backend.domain.dto.TaskDto;
import com.amir.backend.domain.entities.Task;

public interface TaskMapper {
    Task fromDTO(TaskDto taskDto);

    TaskDto toDTO(Task task);
}
