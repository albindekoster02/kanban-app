import {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import type {Task, TaskStatus} from '../types/task';
import {getTasks, createTask, deleteTask} from '../services/api';
import type {CreateTaskDTO} from '../services/api';
import * as api from '../services/api';

//Central lagring av frontend

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    addTask: (task: CreateTaskDTO) => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: {children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                setError('Kunde inte ansluta till Express-backend');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (newTaskData: CreateTaskDTO) => {
        const createdTask = await createTask(newTaskData);
        setTasks((prev) => [...prev, createdTask]);
    };

    const updateTaskStatus = async (id: string, status: TaskStatus) => {
        try {
            const update = await api.updateTaskStatus(id, status);
            setTasks((prev) => prev.map((t) => (t.id === id ? update : t)));
        } catch (error) {
            console.error('Kunde inte uppdatera status:', error);
        } 
    };

    const removeTask = async (id: string) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTaskStatus, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext (TaskContext);
    if (!context) {
        throw new Error('useTasks måste användas inom en TaskProvider');
    }
    return context;
}