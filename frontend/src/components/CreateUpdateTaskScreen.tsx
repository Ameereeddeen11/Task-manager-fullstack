import {useEffect, useState} from "react";
import {useApp} from "../AppProvider.tsx";
import {TaskPriority} from "../domain/TaskPriority.ts";
import {TaskStatus} from "../domain/TaskStatus.ts";

export const CreateUpdateTaskScreen: React.FC = () => {
    const {
        currentScreen,
        selectedTask,
        saveTask,
        setCurrentScreen,
        loading
    } = useApp();

    const isEditing = currentScreen === 'UPDATE_TASK';

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.OPEN);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing && selectedTask) {
            setTitle(selectedTask.title || '');
            setDescription(selectedTask.description || '');
            setDueDate(
                selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toISOString().split('T')[0]
                    : ''
            );
            setPriority(selectedTask.priority || TaskPriority.MEDIUM);
            setStatus(selectedTask.status || TaskStatus.OPEN);
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority(TaskPriority.MEDIUM);
            setStatus(TaskStatus.OPEN);
        }
    }, [isEditing, selectedTask]);

    const handleSubmit = async (
        event: React.FormEvent
    )=> {
        event.preventDefault();
        setValidationError(null);

        if (!title.trim()) {
            setValidationError('Title is required.');
            return;
        }

        await saveTask({
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
            priority,
            status,
        });
    };

    const handleCancel = () => {
        setCurrentScreen('TASKS');
    };

    return (
        <div
            className={
                "max-w-xl mx-auto " +
                "bg-white border border-gray-200 " +
                "shadow-sm p-6 rounded-xl"
            }
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    {isEditing ? 'Edit task' : 'Create new task'}
                </h2>
                <p className="text-sm text-gray-500">
                    {isEditing
                        ? 'Change the details and status of the task.'
                        : 'Fill in the information to create a new task.'}
                </p>
            </div>

            {validationError && (
                <div
                    className={
                        "mb-4 p-3 " +
                        "bg-red-50 border border-red-200 " +
                        "text-red-700 text-sm rounded-lg"
                    }
                >
                    {validationError}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div>
                    <label
                        htmlFor="task-title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="task-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="e.g. Complete REST API documentation..."
                        className={
                            "w-full px-3 py-2 " +
                            "border border-gray-300 " +
                            "rounded-lg shadow-sm focus:outline-none " +
                            "focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        }
                        autoFocus
                    />
                </div>

                <div>
                    <label
                        htmlFor="task-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Task Description (optional)
                    </label>
                    <textarea
                        id="task-description"
                        rows={3}
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Details or steps needed to complete..."
                        className={
                            "w-full px-3 py-2 " +
                            "border border-gray-300 " +
                            "rounded-lg shadow-sm focus:outline-none focus:ring-2 " +
                            "focus:ring-indigo-500 focus:border-indigo-500 " +
                            "text-sm resize-none"
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="task-priority"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Priority
                        </label>
                        <select
                            id="task-priority"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value as TaskPriority)
                            }
                            className={
                                "w-full px-3 py-2 " +
                                "border border-gray-300 " +
                                "rounded-lg shadow-sm " +
                                "focus:outline-none focus:ring-2 " +
                                "focus:ring-indigo-500 focus:border-indigo-500 " +
                                "text-sm bg-white"
                            }
                        >
                            <option value={TaskPriority.LOW}>
                                🟢 Low
                            </option>
                            <option value={TaskPriority.MEDIUM}>
                                🟡 Medium
                            </option>
                            <option value={TaskPriority.HIGH}>
                                🔴 High
                            </option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="task-due-date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Due Date (optional)
                        </label>
                        <input
                            id="task-due-date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className={
                                "w-full px-3 py-2 " +
                                "border border-gray-300 " +
                                "rounded-lg shadow-sm focus:outline-none focus:ring-2 " +
                                "focus:ring-indigo-500 focus:border-indigo-500 " +
                                "text-sm bg-white"
                            }
                        />
                    </div>
                </div>

                {isEditing && (
                    <div>
                        <label
                            htmlFor="task-status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status
                        </label>
                        <select
                            id="task-status"
                            value={status}
                            onChange={(event) =>
                                setStatus(event.target.value as TaskStatus)
                            }
                            className={
                                "w-full px-3 py-2 " +
                                "border border-gray-300 " +
                                "rounded-lg shadow-sm focus:outline-none focus:ring-2 " +
                                "focus:ring-indigo-500 focus:border-indigo-500 " +
                                "text-sm bg-white"
                            }
                        >
                            <option value={TaskStatus.OPEN}>
                                Open
                            </option>
                            <option value={TaskStatus.CLOSED}>
                                Closed
                            </option>
                        </select>
                    </div>
                )}

                <div className="flex justify-end items-center space-x-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className={
                            "px-4 py-2 " +
                            "text-sm font-medium text-gray-700 " +
                            "hover:bg-gray-100 rounded-lg transition-colors"
                        }
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={
                            "px-4 py-2 " +
                            "text-sm font-medium text-white " +
                            "bg-indigo-600 hover:bg-indigo-700 " +
                            "rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        }
                    >
                        {loading ?
                            'Saving...'
                            : isEditing ?
                                'Save Changes'
                                : 'Create Task'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};