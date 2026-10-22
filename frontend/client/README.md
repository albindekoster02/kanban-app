# Fullstack Kanban Board

En interaktiv och fullstack Kanban-applikation byggd som en kursinlämning. Applikationen hjälper användare att organisera och hantera sina uppgifter visuellt med stöd för persistent lagring och ett externt skämt-API.

---

## 🛠️ Tekniker & Stack

- **Frontend:** React (Vite), TypeScript, HTML5 Drag and Drop API
- **Backend:** Node.js, Express.js (med persistent lagring i `tasks.json` via `fs/promises`)
- **API-hantering:** Axios (inkl. proxy-lösning för externt citat/skämt-API från icanhazdadjoke.com)
- **Tester:** Vitest
- **Driftsättning:** Render (Backend) och Netlify / Vercel (Frontend)

---

## ✨ Viktiga funktioner

- **Uppgiftshantering:** Skapa, visa och radera uppgifter.
- **Drag & Drop:** Dra och släpp uppgifter direkt mellan kolumnerna (*Att göra*, *Pågående*, *Klart*).
- **Status- & Prioritetshantering:** Ändra uppgiftens status via dropdown samt sätt prioritetsnivå (*Låg*, *Medel*, *Hög*).
- **Persistent Lagring:** Alla ändringar sparas automatiskt i en lokal JSON-fil (`tasks.json`) på servern.
- **Externt API:** Hämtar slumpmässiga skämt/citat via Express-proxyn för god felhantering och undvikande av CORS-problem.
- **Responsiv Design:** Anpassad för både dator- och mobilanvändning.

---

## 🚀 Installation & Lokal start

### Förutsättningar
- [Node.js](https://nodejs.org/) (version 18 eller senare rekommenderas)
- `npm` installerat

### 1. Klona projektet och installera beroenden

```bash
# Klona repositoryt
git clone <LÄNK_TILL_DITT_GITHUB_REPO>
cd <PROJEKTMAPPNAMN>

# Installera beroenden för både frontend och backend
npm install

