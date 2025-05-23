import { useNavigate } from "react-router";
import type { GameStatus } from "../types/GameStatus";
import getRandomCharacterId from "../functions/getRandomCharacterId";

type HomeProps = {
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
};
const Home = ({ setGameStatus }: HomeProps) => {
  const navigate = useNavigate();

  const goToQuestions = () => {
    setGameStatus((prev) => {
      return { ...prev, questionIds: [getRandomCharacterId()] };
    });
    navigate("/quiz");
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <img
        src="./home_logo.png"
        className="w-[300px] h-[300px]  md:w-[400px] md:h-[400px]"
      />
      <button className="btn" onClick={goToQuestions}>
        Start Quiz!
      </button>
    </div>
  );
};

export default Home;
