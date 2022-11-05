import { useRoute } from "@react-navigation/native";
import { isLoading } from "expo-font";
import { HStack, Toast, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPollList } from "../components/EmptyMyPollList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PollCardProps } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}
export function Details() {
  const route = useRoute();

  const { id } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [isOptionSelected, setIsOptionSelected] = useState<
    "guesses" | "ranking"
  >("guesses");

  const [pollDetails, setPoolDetails] = useState<PollCardProps>(
    {} as PollCardProps
  );

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);
      //console.log(response.data.poll);

      setPoolDetails(response.data.poll);
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

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }
  useEffect(() => {
    fetchPoolDetails();
  }, [id]); //id as a dependency for useEffect. So every time id changes, useEffect is called.

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={isOptionSelected === "guesses"}
              onPress={() => setIsOptionSelected("guesses")}
            />
            <Option
              title="Ranking do Grupo"
              isSelected={isOptionSelected === "ranking"}
              onPress={() => setIsOptionSelected("ranking")}
            />
          </HStack>

          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  );
}
