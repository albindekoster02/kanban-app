import React, { useState } from 'react';
import type {TaskPriority, TaskStatus} from '../types/task';
import {useTasks} from '../context/TaskContext';

//Skapa uppgifter

export function TaskForm() {
    const {addTask} = useTasks ();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setFormError('Title är obligatorisk');
            return;
        }
        
        try {
            setSubmitting(true);
            setFormError(null);

            await addTask({
                title: title.trim(),
                description: description.trim(),
                status: status, 
                priority,
            });

            //Rensa
            setTitle('');
            setDescription('');
            setStatus('todo');
            setPriority('medium');
        } catch (err) {
            setFormError('Kunde inte skapa uppgift. Försök igen.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: '#49111C',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '30px',
                boxShadow: '0 2px 8px rgba (0,0,0,0.1)',
                maxWidth: '500px',
                margin: '0 auto 30px auto',
                color: '#F2F4F3' 
            }}
        >
            <h2> Skapa ny uppgift  </h2>

            {formError &&
                <p style={{ color: '#F2F4F3', marginBottom: '10px'}}>{formError}</p>}

            <div style={{ marginBottom: '12px'}}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title på uppgift..."
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px'}}>
                <label style={{display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>
                    Beskrivning
                    </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Kort Beskrivning...'
                    rows={3}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box'}}
                />
            </div>

            <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                <div style={{ flex: 1 }}>
                    <label style={{display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                        style={{ width: '100%', padding: '8px'}}
                    >
                        <option value="todo">Att göra</option>
                        <option value="in_progress">Pågående</option>
                        <option value="done">Klart</option>
                    </select>
                </div>
            

            <div style={{flex: 1}}>
                <label style={{display: 'block', marginBottom: '4px', fontWeight: 'bold'}}>
                    Prioritet
                </label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    style={{ width: '100%', padding: '8px'}}
                >
                    <option value="low">Låg</option>
                    <option value="medium">Medel</option>
                    <option value="high">Hög</option>  
                </select>
            </div>
        </div>
            
            <button 
                type='submit'
                disabled={submitting}
                style={{
                    background: '#F2F4F3',
                    color: '#0A0908',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                }}
                >
                    {submitting ? 'Skapar...' : 'Skapa uppgift'}
                </button>
        </form>
    );
}