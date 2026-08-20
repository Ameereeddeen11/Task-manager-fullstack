package com.amir.backend.domain.dto;

import com.amir.backend.domain.entities.TaskPriority;
import com.amir.backend.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}
