import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NamePage from "./Components/Pages/NamePage.tsx";
import GamePage from "./Components/Pages/GamePage.tsx";
import GuessPage from "./Components/Pages/GuessPage.tsx";
import PuzzlePage from "./Components/Pages/PuzzlePage.tsx";
function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<NamePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/guesser" element={<GuessPage />} />
              <Route path="/riddler" element={<PuzzlePage />} />
          </Routes>
      </Router>
  )
}

export default App
