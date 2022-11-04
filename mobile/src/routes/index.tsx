//Using this index file will enable us to just import Routes later
//This code also is responsible to create the logic for choosing between the routes for logged in and logged out users

import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
  return (
    <NavigationContainer>
      {/* <AppRoutes /> */}
      <SignIn/>
    </NavigationContainer>
  );
}
