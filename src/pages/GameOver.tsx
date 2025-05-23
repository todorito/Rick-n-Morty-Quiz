import { Navigate } from "react-router";
import type { GameStatus } from "../types/GameStatus";

type GameOverProps = {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

const GameOver = ({ gameStatus, setGameStatus }: GameOverProps) => {
  const playAgain = () => {
    setGameStatus({
      score: 0,
      questionIds: [],
      gameOver: false,
    });
  };

  if (!gameStatus.gameOver) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <img
        src="./game_over.png"
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
      />
      <h1>
        Score:{" "}
        <b>
          {gameStatus.score}/{gameStatus.questionIds.length}
        </b>
      </h1>
      <button className="" onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
