import { useState, useEffect } from 'react'
import type { TaskList } from "./domain/TaskList.ts";
import { getTaskLists } from "./services/api.ts";
import './App.css'

function App() {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getTaskLists()
            .then((data) => setTaskLists(data))
            .catch((error) => console.log("Error fetching task lists:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={"p-4 text-center"}>Loading...</div>;

    return (
        <main className={"max-w-xl mx-auto p-6"}>
            <h1 className={"text-2xl font-bold mb-4"}>
                My Task Lists
            </h1>
            <ul className={"space-y-2"}>
                {taskLists.map((taskList) => (
                    <li
                        key={taskList.id}
                        className={"p-4 bg-white rounded-lg shadow border border-gray-200"}
                    >
                        <h2 className={"text-lg font-semibold"}>
                            {taskList.title}
                        </h2>
                        {taskList.description &&
                            <p className={"text-gray-600 text-sm"}>
                                {taskList.description}
                            </p>
                        }
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default App
