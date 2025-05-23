const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const baseURL: string = "https://rickandmortyapi.com/api";

export const fetchCharacter = async function (id: number) {
  const response = await fetch(`${baseURL}/character/${id}`, options);

  return await response.json();
};

export const fetchCharacters = async function (ids: number[]) {
  const response = await fetch(
    `${baseURL}/character/${ids.join(",")}`,
    options
  );

  return await response.json();
};
