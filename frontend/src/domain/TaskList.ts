import type {Task} from './Task';

export interface TaskList {
    id?: string;
    title: string;
    description?: string;
    count?: number;
    progress?: number;
    tasks?: Task[];
}