//Using this index file will enable us to just import Routes later
//This code also is responsible to create the logic for choosing between the routes for logged in and logged out users

import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    //This box is just to prevent some glitches when changing routes
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}
