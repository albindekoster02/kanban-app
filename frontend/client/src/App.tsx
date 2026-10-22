/*import { useTasks } from './context/TaskContext';
import type { TaskStatus } from './types/task';
import { TaskForm } from './components/TaskForm';

export function App() {
  const { tasks, loading, error, moveTask, removeTask } = useTasks();

  if (loading) return <main style={{ padding: '2rem' }}><h2>Laddar Kanban-tavlan...</h2></main>;
  if (error) return <main style={{ padding: '2rem', color: 'red' }}><h2>Fel: {error}</h2></main>;

  const columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'Att göra' },
    { id: 'in_progress', title: 'Pågående' },
    { id: 'done', title: 'Klart' },
  ];

  const handleDelete = async (id: string) => {
    if (window.confirm('Är du säker att du vill ta bort uppgiften?')) {
      try {
        await removeTask(id);
      } catch (err) {
        alert('Kunde inte ta bort uppgiften.');
      }
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>TaskFlow Pro - Kanban</h1>
      <TaskForm />

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {columns.map((col) => (
          <section
            key={col.id}
            style={{ flex: 1, background: '#f4f5f7', padding: '15px', borderRadius: '8px' }}
          >
            <h2>{col.title}</h2>
            {tasks
              .filter((task) => task.status === col.id)
              .map((task) => (
                <article
                  key={task.id}
                  style={{
                    background: '#fff',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '10px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>{task.title}</h3>
                    <button
                      onClick={() => handleDelete(task.id)}
                      style={{
                        background: '#ffebe6',
                        color: '#de350b',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Radera
                    </button>
                  </div>

                  <p style={{ margin: '0 0 10px 0' }}>{task.description}</p>
                  <small>Prioritet: <strong>{task.priority}</strong></small>

                  <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                    {col.id !== 'todo' && (
                      <button onClick={() => moveTask(task.id, 'todo')}>← Att göra</button>
                    )}
                    {col.id !== 'in_progress' && (
                      <button onClick={() => moveTask(task.id, 'in_progress')}>Pågående</button>
                    )}
                    {col.id !== 'done' && (
                      <button onClick={() => moveTask(task.id, 'done')}>Klart →</button>
                    )}
                  </div>
                </article>
              ))}
          </section>
        ))}
      </div>
    </main>
  );
}

export default App; */

import React from 'react';
import { TaskProvider} from './context/TaskContext';
import { TaskForm } from './components/TaskForm';
import { KanBanBoard} from './components/KanBanBoard';
import { QuoteHeader } from './components/QuoteHeader';

//Grundläggande infrastruktur

export const App: React.FC = () => {
  return (
    <TaskProvider>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif'}}>
        <h1> Kanban Productivity App</h1>
        <QuoteHeader/>
        <TaskForm/>
        <KanBanBoard/>
      </div>
    </TaskProvider>
  );
};

export default App;