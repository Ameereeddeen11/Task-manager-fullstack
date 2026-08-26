import React from 'react';
import {useApp} from '../AppProvider';
import type {TaskList} from '../domain/TaskList';

export const TaskListsScreen: React.FC = () => {
    const {
        taskLists,
        setSelectedTaskList,
        setCurrentScreen,
        removeTaskList,
        loading,
    } = useApp();

    const handleOpenList = (
        list: TaskList
    ) => {
        setSelectedTaskList(list);
        setCurrentScreen('TASKS');
    };

    const handleEditList = (
        e: React.MouseEvent,
        list: TaskList
    ) => {
        e.stopPropagation();
        setSelectedTaskList(list);
        setCurrentScreen('UPDATE_TASK_LIST');
    };

    const handleDeleteList = (
        e: React.MouseEvent,
        id?: string
    ) => {
        e.stopPropagation();
        if (!id) return;
        if (window.confirm('Opravdu chceš smazat tento seznam úkolů?')) {
            removeTaskList(id);
        }
    };

    const handleCreateNew = () => {
        setSelectedTaskList(null);
        setCurrentScreen('CREATE_TASK_LIST');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Task List
                    </h1>
                    <p className="text-sm text-gray-500">
                        Choose a manage your task lists.
                        Click on a list to view its tasks, or create a new one to get started.
                    </p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className={"px-4 py-2 " +
                                "bg-indigo-600 hover:bg-indigo-700 text-white " +
                                "font-medium rounded-lg shadow-sm transition-colors"
                    }
                >
                    + New List
                </button>
            </div>

            {loading && taskLists.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    Loading lists...
                </div>
            ) : taskLists.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">
                        You don't have any task lists yet.
                    </p>
                    <button
                        onClick={handleCreateNew}
                        className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                    >
                        Create your first list
                    </button>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {taskLists.map((list) => {
                        const count = list.count ?? (list.tasks ? list.tasks.length : 0);
                        const progress = Math.round((list.progress ?? 0) * 100);

                        return (
                            <div
                                key={list.id}
                                onClick={() => handleOpenList(list)}
                                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                                            {list.title}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={(e) => handleEditList(e, list)}
                                                className="text-gray-400 hover:text-gray-600 text-sm p-1"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteList(e, list.id)}
                                                className="text-gray-400 hover:text-red-600 text-sm p-1"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    {list.description && (
                                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            {list.description}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Tasks: {count}</span>
                                        <span>{progress}% complete</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{width: `${progress}%`}}
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