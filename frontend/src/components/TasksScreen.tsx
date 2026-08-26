import {useState} from "react";
import {useApp} from "../AppProvider.tsx";
import {TaskStatus} from "../domain/TaskStatus.ts";
import type {Task} from "../domain/Task.ts";
import {TaskPriority} from "../domain/TaskPriority.ts";

export const TasksScreen: React.FC = () => {
    const {
        selectedTaskList,
        setCurrentScreen,
        setSelectedTask,
        saveTask,
        removeTask,
        loading
    } = useApp();
    const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL');
    const tasks = selectedTaskList?.tasks || [];
    const count = tasks.length;
    const closedCount = tasks.filter((task) =>
        task.status === TaskStatus.CLOSED
    ).length;
    const progress = count > 0 ? Math.round((closedCount / count) * 100) : 0;

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'OPEN') return task.status === TaskStatus.OPEN;
        if (filter === 'CLOSED') return task.status === TaskStatus.CLOSED;
        return true;
    });


    const handleToggleStatus = (
        task: Task
    ) => {
        const nextStatus = task.status === TaskStatus.OPEN ? TaskStatus.CLOSED : TaskStatus.OPEN;
        saveTask({
            ...task,
            status: nextStatus,
        });
    };

    const handleEditTask = (
        task: Task
    ) => {
        setSelectedTask(task);
        setCurrentScreen('UPDATE_TASK');
    }

    const handleDeleteTask = (
        taskId?: string
    ) => {
        if (!taskId) return;
        if (window.confirm('Are you sure you want to delete this task?')) {
            removeTask(taskId);
        }
    };

    const handleCreateTask = () => {
        setSelectedTask(null);
        setCurrentScreen('CREATE_TASK');
    };

    const getPriorityBadge = (
        priority: TaskPriority
    ) => {
        switch (priority) {
            case TaskPriority.HIGH:
                return (
                    <span className={"px-2 py-0.5 " +
                        "text-xs font-semibold rounded" +
                        "bg-red-100 text-red-700"
                    }>
                        High
                    </span>
                );
            case TaskPriority.MEDIUM:
                return (
                    <span className={"px-2 py-0.5" +
                        "text-xs font-semibold rounded" +
                        "bg-amber-100 text-amber-700"
                    }>
                        Medium
                    </span>
                );
            case TaskPriority.LOW:
            default:
                return (
                    <span className={"px-2 py-0.5" +
                        "text-xs font-semibold rounded" +
                        "bg-green-100 text-green-700"
                    }>
                        Low
                    </span>
                );
        }
    };

    if (!selectedTaskList) {
        return (
            <div className={"text-center py-12"}>
                <p className={"text-gray-500"}>
                    No tasks is selected
                </p>
                <button
                    className={"mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm"}
                    onClick={() => setCurrentScreen('TASK_LISTS')}
                >
                    Back to task list
                </button>
            </div>
        );
    }

    return (
        <div className={"space-y-6"}>
            <div
                className={
                    "bg-white p-6 rounded-xl " +
                    "border border-gray-200 " +
                    "shadow-sm space-y-4"
                }
            >
                <div
                    className={
                        "flex flex-col sm:flex-row " +
                        "justify-between sm:items-center gap-4"
                    }
                >
                    <div>
                        <button
                            onClick={() => setCurrentScreen('TASK_LISTS')}
                            className={
                                "text-xs font-semibold text-indigo-600 hover:text-indigo-800 " +
                                "flex items-center gap-1 mb-2"
                            }
                        >
                            ← Back to task lists
                        </button>
                        <h1 className={"text-2xl font-bold text-gray-900"}>
                            {selectedTaskList.title}
                        </h1>
                        {selectedTaskList.description && (
                            <p className="text-sm text-gray-600 mt-1">
                                {selectedTaskList.description}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleCreateTask}
                        className={
                            "px-4 py-2 " +
                            "bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg " +
                            "shadow-sm transition-colors self-start sm:self-auto"
                        }
                    >
                        + New Task
                    </button>
                </div>

                <div className="pt-2">
                    <div className={"flex justify-between text-xs font-medium text-gray-500 mb-1"}>
                        <span>
                            Completed: {closedCount} of {count}
                        </span>
                        <span>
                            {progress}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex bg-gray-200 p-1 rounded-lg text-xs font-medium text-gray-700">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-3 py-1.5 rounded-md transition-colors ${
                            filter === 'ALL' ? 'bg-white shadow text-gray-900' : 'hover:text-gray-900'
                        }`}
                    >
                        All ({count})
                    </button>
                    <button
                        onClick={() => setFilter('OPEN')}
                        className={`px-3 py-1.5 rounded-md transition-colors ${
                            filter === 'OPEN' ? 'bg-white shadow text-gray-900' : 'hover:text-gray-900'
                        }`}
                    >
                        Open ({tasks.filter((t) => t.status === TaskStatus.OPEN).length})
                    </button>
                    <button
                        onClick={() => setFilter('CLOSED')}
                        className={`px-3 py-1.5 rounded-md transition-colors ${
                            filter === 'CLOSED' ? 'bg-white shadow text-gray-900' : 'hover:text-gray-900'
                        }`}
                    >
                        Completed ({closedCount})
                    </button>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">
                        {tasks.length === 0
                            ? 'There are no tasks in this list yet.'
                            : 'No tasks match the selected filter.'}
                    </p>
                    {tasks.length === 0 && (
                        <button
                            onClick={handleCreateTask}
                            className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        >
                            Add First Task
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTasks.map((task) => {
                        const isClosed = task.status === TaskStatus.CLOSED;

                        return (
                            <div
                                key={task.id}
                                className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4 transition-all ${
                                    isClosed ? 'opacity-70 bg-gray-50' : ''
                                }`}
                            >
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <input
                                        type="checkbox"
                                        checked={isClosed}
                                        onChange={() => handleToggleStatus(task)}
                                        disabled={loading}
                                        className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <div className="min-w-0">
                                        <h3
                                            className={`text-sm font-semibold text-gray-900 truncate ${
                                                isClosed ? 'line-through text-gray-500' : ''
                                            }`}
                                        >
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                                {task.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            {getPriorityBadge(task.priority)}
                                            {task.dueDate && (
                                                <span className="text-[11px] text-gray-400">
                          📅 {new Date(task.dueDate).toLocaleDateString('cs-CZ')}
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="text-gray-400 hover:text-gray-600 text-sm p-1.5 rounded hover:bg-gray-100 transition-colors"
                                        title="Edit Task"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-gray-400 hover:text-red-600 text-sm p-1.5 rounded hover:bg-gray-100 transition-colors"
                                        title="Delete Task"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};