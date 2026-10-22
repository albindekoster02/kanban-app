export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignedTo?: User;
    createdAt: string;
    dueDate: string;
}

//Skapa ny task
export type CreatedTaskDTO = Omit<Task, 'id' | 'createdAt'>;

//Uppdatera task
export type UpdateTaskDTO = Partial<CreatedTaskDTO>;