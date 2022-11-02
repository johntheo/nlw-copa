import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, Center } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { SignIn } from "./screens/SignIn";
import { Loading } from "./components/Loading";
import { THEME } from "./src/styles/theme";

export default function App() {
  //Using fontsLoaded to ensure the font is loaded
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    //This will enure that all the application will be able to use Native Base components
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
