import type { TaskList } from "../domain/TaskList.ts";
import type { Task } from "../domain/Task.ts";

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

    const response = await fetch(
        `${API_URL}${endpoint}`,
        config
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {} as T;
    }

    return response.json();
}

// TaskList API functions
// CRUD operations for TaskList
// Create, Read, Update, Delete
// Each function returns a Promise that resolves to the expected type
export const getTaskLists = async (): Promise<TaskList[]> => {
    return request<TaskList[]>('/task-lists');
};

export const getTaskList = async (
    taskListId: string
): Promise<TaskList> => {
    return request<TaskList>(
        `/task-lists/${taskListId}`
    );
};

export const createTaskList = async (
    taskList: Partial<TaskList>
): Promise<TaskList> => {
    return request<TaskList>(
        '/task-lists',
        {
            method: "POST",
            body: JSON.stringify(taskList),
        }
    );
};

export const updateTaskList = async (
    taskListId: string,
    taskList: Partial<TaskList>
): Promise<TaskList> => {
    return request<TaskList>(
        `/task-lists/${taskListId}`,
        {
            method: "PUT",
            body: JSON.stringify(taskList)
        }
    );
};

export const deleteTaskList = async (
    taskListId: string
): Promise<void> => {
    return request<void>(
        `/task-lists/${taskListId}`,
        {
            method: "DELETE"
        }
    );
};

export const getTasks = async (
    taskListId: string
): Promise<Task[]> => {
    return request<Task[]>(
        `/task-lists/${taskListId}`,
    );
};

export const createTask = async (
    taskListId: string,
    task: Partial<Task>
): Promise<Task> => {
    return request<Task>(
        `/task-lists/${taskListId}`,
        {
            method: "POST",
            body: JSON.stringify(task),
        }
    );
};

export const updateTask = async (
    taskListId: string,
    taskId: string,
    task: Partial<Task>
): Promise<Task> => {
    return request<Task>(
        `/task-lists/${taskListId}/tasks/${taskId}`,
        {
            method: "PUT",
            body: JSON.stringify(task),
        }
    );
};

export const deleteTask = async (
    taskListId: string,
    taskId: string
): Promise<void> => {
    return request<void>(
        `/task-lists/${taskListId}/tasks/${taskId}`,
        {
            method: "DELETE",
        }
    );
};