import React, {useEffect, useState} from "react";
import { fetchDailyJoke, } from "../services/api";
import type { Joke } from '../services/api';

//Hämtar citat från backend

export const QuoteHeader: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect (() => {
        fetchDailyJoke()
            .then((data) => setJoke(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if(loading) return <p style={{ color: '#0A0908', fontStyle: 'italic' }}> Laddar dagens skämt...</p>;
    if(!joke) return null;

    return (
        <div style={{
            background: '#F2F4F3',
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: '4px solid #49111C'
        }}>
            <p style={{ margin : 0, fontSize: '0.95rem', fontStyle: 'italic', color: '#49111C' }}>
                "{joke.joke}"
            </p>
        </div>
    );
};