import { Router, Request, Response } from 'express';
import { readTasks, writeTasks, Task } from '../utils/taskStorage';

const router = Router();

// GET /api/tasks - Hämtar alla uppgifter från tasks.json
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte hämta uppgifter' });
  }
});

// POST /api/tasks - Skapar en ny uppgift och sparar i tasks.json
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Titel krävs' });
    }

    const tasks = await readTasks();

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte skapa uppgift' });
  }
});

// PATCH /api/tasks/:id - Uppdaterar status på en uppgift
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Uppgiften hittades inte' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    await writeTasks(tasks);

    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte uppdatera uppgiften' });
  }
});

// DELETE /api/tasks/:id - Tar bort en uppgift
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tasks = await readTasks();

    const filteredTasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === filteredTasks.length) {
      return res.status(404).json({ error: 'Uppgiften hittades inte' });
    }

    await writeTasks(filteredTasks);
    res.status(200).json({ message: 'Uppgiften har raderats' });
  } catch (error) {
    res.status(500).json({ error: 'Kunde inte radera uppgiften' });
  }
});

export default router;