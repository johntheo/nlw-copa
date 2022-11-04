import { Box, FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Game, GameProps } from "./Game";

interface Props {
  pollId: string;
}

export function Guesses({ pollId }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [firstTeamPoints, setFirstTeamPoints] = useState();
  const [secondTeamPoints, setSecondTeamPoints] = useState();
  const [games, setGames] = useState<GameProps[]>([] as GameProps[]);

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (error) {
      return toast.show({
        title: "Não foi os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId]);
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={firstTeamPoints}
          setSecondTeamPoints={secondTeamPoints}
          onGuessConfirm={() => {}}
        />
      )}
    />
  );
}
