import { useApp } from './AppProvider';
import { TaskListsScreen } from './components/TaskListsScreen';
import { CreateUpdateTaskListScreen } from './components/CreateUpdateTaskListScreen';

export default function App() {
    const { currentScreen, error } = useApp();

    const renderScreen = () => {
        switch (currentScreen) {
            case 'TASK_LISTS':
                return <TaskListsScreen />;
            case 'CREATE_TASK_LIST':
            case 'UPDATE_TASK_LIST':
                return <CreateUpdateTaskListScreen />;
            case 'TASKS':
                return <div>Task detail screen</div>;
            case 'CREATE_TASK':
            case 'UPDATE_TASK':
                return <div>Task form</div>;
            default:
                return <TaskListsScreen />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-black text-indigo-600 tracking-tight">TaskFlow</span>
                    </div>
                </div>
            </header>

            {error && (
                <div className="max-w-4xl mx-auto px-4 mt-4">
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                </div>
            )}

            <main className="max-w-4xl mx-auto px-4 py-8">
                {renderScreen()}
            </main>
        </div>
    );
}