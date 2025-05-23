import { useEffect, useState } from "react";
import { fetchCharacter, fetchCharacters } from "../apis/Api";
import type { Character } from "../types/Character";
import getRandomCharacterId from "../functions/getRandomCharacterId";
import type { Question } from "../types/Question";

type QuestionState = {
  data: null | Question;
  loading: boolean;
  error: boolean | string;
};

const useQuestion = (id: number) => {
  const [question, setQuestion] = useState<QuestionState>({
    data: null,
    loading: false,
    error: false,
  });

  const getIds = () => {
    const arr: number[] = [];
    while (arr.length < 4) {
      const temp = getRandomCharacterId();
      if (temp !== id && !arr.includes(temp)) {
        arr.push(temp);
      }
    }

    return arr;
  };

  const fetchData = async () => {
    setQuestion({ data: null, loading: true, error: false });
    try {
      const response = await fetchCharacter(id);

      const wrongCharacters: Character[] = await fetchCharacters(getIds());
      const answers = wrongCharacters.map((char) => char.name);
      const randomIndex = Math.trunc(Math.random() * 4);
      answers.splice(randomIndex, 0, response.name);
      setQuestion({
        data: {
          character: response,
          answers,
        },
        loading: false,
        error: false,
      });
    } catch (e) {
      if (e instanceof Error) {
        setQuestion({ data: null, loading: false, error: e.message });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return question;
};
export default useQuestion;
