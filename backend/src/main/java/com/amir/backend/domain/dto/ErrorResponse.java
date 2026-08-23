package com.amir.backend.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {
}
