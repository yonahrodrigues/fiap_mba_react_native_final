import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./Routes/MainStack";
import UserContext from "./Context/UserContext";

const App = () => {
  return (
    <UserContext>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
