import fs from 'fs/promises';
import path from 'path';

const FILE_PATCH = path.join(__dirname, '../../task.json');

export interface Task {
    id:string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

// Läser alla tasks från task.json
export const readTasks= async (): Promise<Task[]> => {
    try {
        const data = await fs.readFile(FILE_PATCH, 'utf-8');
        return JSON.parse(data) as Task[];
    } catch (error: unknown) {
        //Om filen inte finns skapas en tom tasks.json
        const err = error as {code?: string};
        if (err.code === 'ENOENT') {
            await writeTasks([]);
            return [];
        }
        console.error('Fel vid läsning av tasks.json', error);
        return [];
    }
};

//Skriver alla tasks till task.json
export const writeTasks = async (tasks: Task[]): Promise<void> => {
    try {
        await fs.writeFile(FILE_PATCH, JSON.stringify(tasks,null, 2), 'utf-8');
    } catch (error) {
        console.error('Fel vid skrivning till taks.json:', error);
        throw new Error('Kunde inte spara data till fil.');
    }
};

