import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {TaskList} from './domain/TaskList';
import type {Task} from './domain/Task';
import * as api from './services/api';

export type Screen =
    | 'TASK_LISTS'
    | 'CREATE_TASK_LIST'
    | 'UPDATE_TASK_LIST'
    | 'TASKS'
    | 'CREATE_TASK'
    | 'UPDATE_TASK';

interface AppContextType {
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
    taskLists: TaskList[];
    selectedTaskList: TaskList | null;
    setSelectedTaskList: (list: TaskList | null) => void;
    selectedTask: Task | null;
    setSelectedTask: (task: Task | null) => void;
    loading: boolean;
    error: string | null;

    // Actions for TaskLists
    fetchTaskLists: () => Promise<void>;
    saveTaskList: (data: Partial<TaskList>) => Promise<void>;
    removeTaskList: (id: string) => Promise<void>;

    // Actions for Tasks
    saveTask: (data: Partial<Task>) => Promise<void>;
    removeTask: (taskId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<
    { children: ReactNode }
> = (
    { children }
) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('TASK_LISTS');
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [selectedTaskList, setSelectedTaskList] = useState<TaskList | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTaskLists = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await api.getTaskLists();
            const safeData = data || [];
            setTaskLists(safeData);

            if (selectedTaskList?.id) {
                const updatedSelected = safeData.find((l) => l.id === selectedTaskList.id);
                if (updatedSelected) {
                    setSelectedTaskList(updatedSelected);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Chyba při načítání seznamů.');
        } finally {
            setLoading(false);
        }
    }, [selectedTaskList?.id]);

    useEffect(() => {
        fetchTaskLists();
    }, [fetchTaskLists]);

    // Creation / Update of TaskList
    const saveTaskList = async (
        data: Partial<TaskList>
    ) => {
        setLoading(true);

        try {
            if (selectedTaskList?.id && currentScreen === 'UPDATE_TASK_LIST') {
                await api.updateTaskList(selectedTaskList.id, data);
            } else {
                await api.createTaskList(data);
            }
            await fetchTaskLists();
            setCurrentScreen('TASK_LISTS');
        } catch (err: any) {
            setError(err.message || 'Chyba při ukládání seznamu.');
        } finally {
            setLoading(false);
        }
    };

    // Deletion of TaskList
    const removeTaskList = async (
        id: string
    ) => {
        setLoading(true);

        try {
            await api.deleteTaskList(id);
            if (selectedTaskList?.id === id) {
                setSelectedTaskList(null);
            }
            await fetchTaskLists();
            setCurrentScreen('TASK_LISTS');
        } catch (err: any) {
            setError(err.message || 'Chyba při mazání seznamu.');
        } finally {
            setLoading(false);
        }
    };

    // Creation / Update of Task in a selected TaskList
    const saveTask = async (
        data: Partial<Task>
    ) => {
        if (!selectedTaskList?.id) return;

        setLoading(true);

        try {
            if (selectedTask?.id && currentScreen === 'UPDATE_TASK') {
                await api.updateTask(selectedTaskList.id, selectedTask.id, data);
            } else {
                await api.createTask(selectedTaskList.id, data);
            }
            await fetchTaskLists();
            setCurrentScreen('TASKS');
        } catch (err: any) {
            setError(err.message || 'Chyba při ukládání úkolu.');
        } finally {
            setLoading(false);
        }
    };

    // Deletion of Task
    const removeTask = async (
        taskId: string
    ) => {
        if (!selectedTaskList?.id) return;
        setLoading(true);

        try {
            await api.deleteTask(selectedTaskList.id, taskId);
            await fetchTaskLists();
            setCurrentScreen('TASKS');
        } catch (err: any) {
            setError(err.message || 'Chyba při mazání úkolu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppContext.Provider
            value={{
                currentScreen,
                setCurrentScreen,
                taskLists,
                selectedTaskList,
                setSelectedTaskList,
                selectedTask,
                setSelectedTask,
                loading,
                error,
                fetchTaskLists,
                saveTaskList,
                removeTaskList,
                saveTask,
                removeTask,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};