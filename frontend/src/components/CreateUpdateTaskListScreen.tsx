import React, {useState, useEffect} from 'react';
import {useApp} from '../AppProvider';

export const CreateUpdateTaskListScreen: React.FC = () => {
    const {
        currentScreen,
        selectedTaskList,
        saveTaskList,
        setCurrentScreen,
        loading,
    } = useApp();

    const isEditing = currentScreen === 'UPDATE_TASK_LIST';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing && selectedTaskList) {
            setTitle(selectedTaskList.title || '');
            setDescription(selectedTaskList.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [isEditing, selectedTaskList]);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setValidationError(null);

        if (!title.trim()) {
            setValidationError('Title is required.');
            return;
        }

        await saveTaskList({
            id: isEditing && selectedTaskList ? selectedTaskList.id : undefined,
            title: title.trim(),
            description: description.trim() ? description.trim() : undefined,
        });
    };

    const handleCancel = () => {
        setCurrentScreen('TASK_LISTS');
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    {isEditing ?
                        'Edit selected task list'
                        : 'New task list'
                    }
                </h2>
                <p className="text-sm text-gray-500">
                    {isEditing
                        ? 'Change the title and description of the selected task list.'
                        : 'Enter a name and optional description for the new task list.'}
                </p>
            </div>

            {validationError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {validationError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Personal Tasks, Shopping, Work..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        autoFocus
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description (optional)
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Additional information or notes about the task list..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                    />
                </div>

                <div className="flex justify-end items-center space-x-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create List'}
                    </button>
                </div>
            </form>
        </div>
    );
};