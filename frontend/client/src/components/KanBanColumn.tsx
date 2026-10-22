import React from "react";
import type { Task, TaskStatus } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

//Behållare/sorterare och samlar rätt på uppgiftskorten samt hanterar mottagandet av drag and drop. 

interface KanBanColumnProps {
    title: string;
    status: TaskStatus;
    tasks?: Task[];
}

export const KanBanColumn: React.FC<KanBanColumnProps> = ({ title, status }) => {
    const { tasks, updateTaskStatus } = useTasks();

    const columnTasks = tasks.filter((task) => task.status === status);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        if (taskId) {
            await updateTaskStatus(taskId, status)
        };
    };

    return ( 
        <div onDragOver={handleDragOver}
            onDrop={handleDrop}
         style={{
            flex: 1,
            background: '#49111C',
            padding: '12px',
            borderRadius: '8px',
            minWidth: '250px' 
        }}>
            <h3 style={{marginTop: 0, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', color: '#F2F4F3'}}>
                <span>{title}</span>
                <span style={{background: '#F2F4F3', borderRadius: '10px', padding: '2px 8px', fontSize: '0.85rem'}}>
                    {columnTasks.length}
                </span>
            </h3>

            <div>
               {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
               ))} 
            </div>
        </div>
        
    );
};
  
 