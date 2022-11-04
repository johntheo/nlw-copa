import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Favor inserir um código de bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/polls/join", { code });
      return toast.show({
        title: "Você entrou em um bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      if (error.response?.data?.message === "Poll not found") {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already part of this Poll") {
        return toast.show({
          title: "Você já está nesse bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      return toast.show({
        title: "Não foi encontrado o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
      navigate("polls");
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button title="BUSCAR BOLÃO" onPress={handleJoinPoll} />
      </VStack>
    </VStack>
  );
}
