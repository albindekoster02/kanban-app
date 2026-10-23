import axios from 'axios'
import type { Task, TaskPriority, TaskStatus } from '../types/task';

// Hämtar URL från miljövariabler, eller faller tillbaka på localhost om du kör lokalt
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API_URL = `${BASE_URL}/tasks`;

export const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
};

export const updateTaskStatus = async (id:string, status: Task['status']): Promise<Task> => {
    const response = await axios.patch<Task>(`${API_URL}/${id}`, {status});
    return response.data;
};

export interface CreateTaskDTO {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
}

export const createTask = async (newTaskData: CreateTaskDTO): Promise<Task> => {
    const response = await axios.post<Task>(API_URL, newTaskData);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export interface Joke {
    joke: string;
}

export const fetchDailyJoke = async (): Promise<Joke> => {
    const response = await fetch(`${BASE_URL}/quote`);
    if (!response.ok) {
        throw new Error('Hade ingen humor idag');
    }
    return response.json();
};
