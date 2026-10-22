import {Router, Request, Response} from 'express';
import axios from 'axios';

const router = Router();

interface IcanhazdadjokeResponse {
    id: string;
    joke: string;
    status: number;
}

router.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get<IcanhazdadjokeResponse>(
            'https://icanhazdadjoke.com/',
            {
                headers: {
                    Accept: 'application/json',
                    'User-Agent': 'KanBanApp (https://github.com/albindekoster02/kanban-app)',
                },
            }
        );

        res.json({
            joke: response.data.joke,
        });
    } catch (error) {
        console.error('Fel vid hämtning av pappa skämt', error);
        res.json({
            joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
             
        });
    }
});

export default router;