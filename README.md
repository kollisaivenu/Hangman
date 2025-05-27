# Hangman Game (Full-Stack)

This is a **real-time multiplayer Hangman game** built with **Node.js**, **Express**, **MongoDB Change Streams**, **Socket.IO**, and a **React frontend**.  
Players can join as either:
- A **Riddler** who sets the puzzle, or
- A **Guesser** who attempts to solve it, one letter at a time.

The game state is **persisted in MongoDB**, and **real-time updates** are powered by MongoDB **Change Streams** and **Socket.IO** events.

---

## 🚀 Core Technologies

| Feature                 | Tech Used                           |
|-------------------------|------------------------------------|
| Backend Framework       | Express.js                          |
| Real-time Communication | MongoDB Change Streams + Socket.IO  |
| Database                | MongoDB Atlas (or local MongoDB)    |
| Frontend Components     | React        |

---

## 🧩 Key Features

✅ Real-time multiplayer interaction  
✅ MongoDB Change Streams to track updates in game state  
✅ Socket.IO events to broadcast changes to connected clients  
✅ REST API for game setup and state transitions  
✅ Modular backend architecture (separate files for API routes, event handlers, DB logic)  
✅ Simple React components for frontend UI (form inputs, buttons)

---
