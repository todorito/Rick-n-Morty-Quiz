import Answer from "../components/Answer";
import getRandomCharacterId from "../functions/getRandomCharacterId";
import useQuestion from "../hooks/useQuestion";
import { useState } from "react";
import type { GameStatus } from "../types/GameStatus";
import { Navigate } from "react-router";

type QuizProps = {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};

const Quiz = ({ gameStatus, setGameStatus }: QuizProps) => {
  const { data, loading, error } = useQuestion(
    gameStatus.questionIds[gameStatus.questionIds.length - 1]
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleCheckClick = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (data?.character.name === selectedAnswer) {
      setGameStatus((prev) => {
        return { ...prev, score: prev.score + 1 };
      });
    }
  };

  const navigateNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (gameStatus.questionIds.length >= 5) {
      setGameStatus((prev) => {
        return { ...prev, gameOver: true };
      });
      return;
    }

    setGameStatus((prev) => {
      return {
        ...prev,
        questionIds: [...prev.questionIds, getRandomCharacterId()],
      };
    });
  };

  if (!gameStatus.questionIds.length) {
    return <Navigate to="/" />;
  }
  if (gameStatus.gameOver) {
    return <Navigate to="/gameover" />;
  }
  return (
    <div className="flex flex-col items-center ">
      {loading && <>...Loading</>}
      {error && <p>{error}</p>}
      {data && (
        <>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">
              Question: #{gameStatus.questionIds.length}
            </h1>
            <h2 className="text-xl">
              Score: <b>{gameStatus.score}</b>
            </h2>
            <img src={data.character.image} />
            <div>
              {data?.answers.map((name) => {
                return (
                  <Answer
                    value={name}
                    disabled={isAnswered}
                    label={name}
                    name="answer"
                    onChange={handleChange}
                  />
                );
              })}
            </div>
            {!isAnswered && <button onClick={handleCheckClick}>Check</button>}
            {isAnswered && <button onClick={navigateNext}>Next</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
