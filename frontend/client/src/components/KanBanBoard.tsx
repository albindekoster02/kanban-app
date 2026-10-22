import React from "react";
import { KanBanColumn } from "./KanBanColumn";

//Struktur kanbantavla

export const KanBanBoard: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
            <KanBanColumn title="Att göra" status="todo"/>
            <KanBanColumn title="Pågående" status="in_progress" />
            <KanBanColumn title="Klart" status="done" />
        </div>
    );
};