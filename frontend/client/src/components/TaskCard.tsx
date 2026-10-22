import React from "react";
import type { Task, TaskStatus } from "../types/task";
import { useTasks } from '../context/TaskContext';
import { formatPriority } from "../utils/formatters";

//Hnaterar enskilda uppgiftskort

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { updateTaskStatus, removeTask} = useTasks();

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateTaskStatus ( task.id, e.target.value as TaskStatus);
    };
    
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', task.id);
    };
    


    return (
        <div 
            draggable
            onDragStart={handleDragStart}
            style={{
                background: '#F2F4F3',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '10px',
                boxShadow: '0 1px 3px rgba(8, 7, 7, 0.12)',
                cursor: 'grab',
                color: '#0A0908'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem'}}>{task.title}</h4>
                <span style={{ fontSize: '0.8rem'}}>{formatPriority(task.priority)}</span>
            </div>

            {task.description && (
                <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#00272B'}}>
                    {task.description}
                </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    style={{ padding: '4px', fontSize: '0.8rem'}}
                    >
                        <option value="todo">Att göra</option>
                        <option value="in_progress">Pågående</option>
                        <option value="done">Klart</option>
                    </select>

                    <button
                    onClick={() => removeTask(task.id)}
                    style={{
                        background: '#00272B',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                    }}
                    >Ta Bort</button>
            </div>
        </div>
    );
};