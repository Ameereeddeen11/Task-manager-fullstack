import type { TaskList } from "../domain/TaskList.ts";
import { Task } from "../domain/Task.ts";

const API_URL = "http://localhost:8080"

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {} as T;
    }

    return response.json();
}

export const getTaskLists = async (): Promise<TaskList[]> => {
    return request<TaskList[]>("/task-lists");
};

export const createTaskList = async (
    taskList: Partial<TaskList>
): Promise<TaskList> => {
    return request<TaskList>("/task-lists", {
        method: "POST",
        body: JSON.stringify(taskList),
    });
}