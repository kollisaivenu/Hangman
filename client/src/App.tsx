import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NameForm from "./NameForm.tsx";
import GameForm from "./GameForm.tsx";
import GuessForm from "./GuessForm.tsx";
import PuzzleForm from "./PuzzleForm.tsx";
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<NameForm />} />
              <Route path="/game" element={<GameForm />} />
              <Route path="/guesser" element={<GuessForm/>} />
              <Route path="/riddler" element={<PuzzleForm/>} />
          </Routes>
      </Router>
  )
}

export default App
