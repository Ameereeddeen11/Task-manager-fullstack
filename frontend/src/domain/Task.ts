import { TaskPriority } from './TaskPriority';
import { TaskStatus } from './TaskStatus';

export interface Task {
    id?: string;
    title: string;
    description?: string;
    dueDate?: string;
    priority: TaskPriority;
    status: TaskStatus;
}