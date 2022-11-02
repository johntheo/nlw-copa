import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Center } from "native-base";

export default function App() {
  return (
    //This will enure that all the application will be able to use Native Base components
    <NativeBaseProvider> 
      <Center flex={1} bgColor="black">
        <Text color="white" fontSize={24} >Hello React Native!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
