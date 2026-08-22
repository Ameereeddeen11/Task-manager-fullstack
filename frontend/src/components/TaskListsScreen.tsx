import React from "react";
import { useApp } from "../AppProvider.tsx";
import type { TaskList } from "../domain/TaskList.ts";

export const TaskListsScreen: React.FC = () => {
    const {
        taskLists,
        setSelectedTaskList,
        setCurrentScreen,
        removeTaskList,
        loading
    } = useApp();

    const handleOpenTaskList = (
        taskList: TaskList
    ) => {
        setSelectedTaskList(taskList);
        setCurrentScreen("TASKS");
    };

    const handleEditTaskList = (
        e: React.MouseEvent,
        taskList: TaskList
    ) => {
        e.stopPropagation();
        setSelectedTaskList(taskList);
        setCurrentScreen("UPDATE_TASK_LIST");
    };

    const handleDeleteTaskList = (
        e: React.MouseEvent,
        taskListId?: string
    ) => {
        e.stopPropagation();
        if (!taskListId) return;
        if (window.confirm("Are you sure you want to delete this task list?")) {
            removeTaskList(taskListId);
        }
    };

    const handleCreateTaskListNew = () => {
        setSelectedTaskList(null);
        setCurrentScreen("CREATE_TASK_LIST");
    };

    return (
        <div className={"space-y-6"}>
            <div className={"flex justify-between items-center"}>
                <div>
                    <h1 className={"text-2xl font-bold text-gray-900"}>Task List</h1>
                    <p className={"text-sm text-gray-500"}>Manage your task list</p>
                </div>
                <button
                    onClick={handleCreateTaskListNew}
                    className={
                        "px-4 py-2 " +
                        "bg-indigo-600 hover:bg-indigo-700 text-white " +
                        "font-medium " +
                        "rounded-lg " +
                        "shadow-sm " +
                        "transition-colors"
                    }
                >
                    Add Task List
                </button>
            </div>

            {loading && taskLists.length === 0 ? (
                <div className={"text-center py-12 text-gray-500"}>
                    Loading task lists...
                </div>
            ) : taskLists.length === 0 ? (
                <div className={"text-center py-12 bg-white rounded-xl border border-dashed border-gray-300"}>
                    <p className={"text-gray-500"}>
                        No task lists found
                    </p>
                    <button
                        onClick={handleCreateTaskListNew}
                        className={"mt-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm"}
                    >
                        Create a new task list
                    </button>
                </div>
            ) : (
                <div className={"grid gap-4 sm:grid-cols-1 md:grid-cols-2"}>
                    {taskLists.map((taskList) => {
                        const count = taskList.count ?? (taskList.tasks ? taskList.tasks.length : 0);
                        const progress = Math.round((taskList.progress ?? 0) * 100);

                        return (
                            <div
                                key={taskList.id}
                                onClick={() => handleOpenTaskList(taskList)}
                                className={"bg-white p-5 rounded-xl border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"}
                            >
                                <div>
                                    <div className={"flex justify-between items-start"}>
                                        <h2
                                            className={"text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors"}
                                        >
                                            {taskList.title}
                                        </h2>
                                        <div className={"flex items-center space-x-2"}>
                                            <button
                                                onClick={(e) => handleEditTaskList(e, taskList)}
                                                className={"text-gray-400 hover:text-gray-600 text-sm p-1"}
                                                title={"Edit Task List"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                </svg>
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteTaskList(e, taskList.id)}
                                                className={"text-gray-400 hover:text-red-600 text-sm p-1"}
                                                title={"Delete Task List"}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {taskList.description && (
                                        <p className={"text-gray-600 text-sm mt-1 line-clamp-2"}>
                                            {taskList.description}
                                        </p>
                                    )}
                                </div>

                                <div className={"mt-4 pt-4 border-gray-100"}>
                                    <div className={"flex justify-between text-sm text-gray-500 mb-1"}>
                                        <span>
                                            {count} {count === 1 ? "task" : "tasks"}
                                        </span>
                                        <span>
                                            {progress}% completed
                                        </span>
                                    </div>
                                    <div className={"w-full bg-gray-100 rounded-full h-2 overflow-hidden"}>
                                        <div
                                            className={"bg-indigo-600 h-2 rounded-full transition-all duration-300"}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};