import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import GameOver from "./pages/GameOver";
import type { GameStatus } from "./types/GameStatus";
import PageNotFound from "./pages/PageNotFound";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    score: 0,
    questionIds: [],
    gameOver: false,
  });

  return (
    <BrowserRouter>
      <div className="container mx-auto h-full">
        <div className="flex flex-row-reverse py-2 sticky top-0">
          <ThemeToggle />
        </div>
        <Routes>
          <Route
            path="/"
            element={<Home setGameStatus={setGameStatus} />}
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quiz gameStatus={gameStatus} setGameStatus={setGameStatus} />
            }
          ></Route>
          <Route
            path="/gameover"
            element={
              <GameOver gameStatus={gameStatus} setGameStatus={setGameStatus} />
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
