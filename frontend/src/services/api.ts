import type {TaskList} from '../domain/TaskList';
import type {Task} from '../domain/Task';

const URL = '/api';

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const { headers, ...restOptions } = options;
    
    const config: RequestInit = {
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
        },
    };

    const response = await fetch(`${URL}${endpoint}`, config);

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody || `HTTP error! Status: ${response.status}`);
    }

    if (response.status === 204) {
        return null as unknown as T;
    }

    const responseText = await response.text();
    if (!responseText) {
        return null as unknown as T;
    }

    return JSON.parse(responseText);
}

// Task List API functions
// CRUD operations for task lists and tasks
export const getTaskLists = async (): Promise<TaskList[]> => {
    return request<TaskList[]>('/task-lists');
};

export const getTaskList = async (
    taskListId: string
): Promise<TaskList> => {
    return request<TaskList>(`/task-lists/${taskListId}`);
};

export const createTaskList = async (
    taskList: Partial<TaskList>
): Promise<TaskList> => {
    return request<TaskList>(
        '/task-lists',
        {
            method: 'POST',
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
            method: 'PUT',
            body: JSON.stringify({ ...taskList, id: taskListId }),
        }
    );
};

export const deleteTaskList = async (
    taskListId: string
): Promise<void> => {
    return request<void>(
        `/task-lists/${taskListId}`,
        {
            method: 'DELETE',
        }
    );
};


// Task API functions
// CRUD operations for tasks within a task list
export const getTasks = async (
    taskListId: string
): Promise<Task[]> => {
    return request<Task[]>(`/task-lists/${taskListId}/tasks`);
};

export const createTask = async (
    taskListId: string,
    task: Partial<Task>
): Promise<Task> => {
    return request<Task>(
        `/task-lists/${taskListId}/tasks`,
        {
            method: 'POST',
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
            method: 'PUT',
            body: JSON.stringify({
                ...task,
                id: taskId
            }),
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
            method: 'DELETE',
        }
    );
};