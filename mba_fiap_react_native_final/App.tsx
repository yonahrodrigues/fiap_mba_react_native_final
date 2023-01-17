import React from "react";
import { SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./Routes/MainStack";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Store/store";
import { Provider } from "react-redux";

import UserContext from "./Context/UserContext";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserContext>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </UserContext>
      </PersistGate>
    </Provider>
  );
};

export default App;
