import {render, screen, fireEvent} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskForm } from './TaskForm';

//Mocka usetask. Testet behöver ej backend/provider då
vi.mock('../context/TaskContext', () => ({
    useTasks: () => ({
        addTask: vi.fn(),
    }),
}));

describe('TaskForm Component', () => {
    it('visar ett felmeddelande om titel är tom när formuläret skickas', async () => {
        render(<TaskForm />);

        //Hitta knapp 
        const submitButton = screen.getByRole('button', { name: /skapa uppgift/i});
        fireEvent.click(submitButton);

        //Verifiera att felet visas på skärm
        const errorMessage = await screen.findByText(/title är obligatorisk/i);
        expect(errorMessage).toBeInTheDocument();
    });
});