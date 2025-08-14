import { useCallback, useEffect, useRef, useState } from "react";
import Card from "@/components/card";

type Pokemon = {
  name: string;
  url: string;
};

const CardsGrid = () => {
  const LIST_API = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0";
  const hasFetched = useRef(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch(LIST_API);
        const data = await response.json();
        console.log(data.results);
        setPokemonList(data.results);
        const initialTrack: Record<string, boolean> = {};
        data.results.forEach((pokemon: Pokemon) => {
          initialTrack[pokemon.name] = false;
        });
        setClickingTrack(initialTrack);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [clickingTrack, setClickingTrack] = useState<Record<string, boolean>>(
    {}
  );
  const handleCardClick = useCallback(
    (name: string) => {
      if (clickingTrack[name]) {
        const resetTrack: Record<string, boolean> = {};
        pokemonList.forEach((pokemon) => {
          resetTrack[pokemon.name] = false;
        });
        setClickingTrack(resetTrack);
        if (currentScore > highScore) {
          setHighScore(currentScore);
        }
        setCurrentScore(0);
      } else {
        setClickingTrack((prev) => ({ ...prev, [name]: true }));
        setCurrentScore((prev) => prev + 1);
      }
      const newPokemonList = pokemonList.sort(() => 0.5 - Math.random());
      setPokemonList(newPokemonList);
    },
    [clickingTrack, currentScore, highScore, pokemonList]
  );

  return (
    <div className="custom-container py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Current Score: {currentScore}</h2>
        <h2 className="text-2xl font-bold">High Score: {highScore}</h2>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
            onClick={() => handleCardClick(pokemon.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
