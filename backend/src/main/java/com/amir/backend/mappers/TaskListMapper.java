package com.amir.backend.mappers;

import com.amir.backend.domain.dto.TaskListDto;
import com.amir.backend.domain.entities.TaskList;

public interface TaskListMapper {
    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}
