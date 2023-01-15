import React from "react";
import { SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackHome } from "./Routes/MainStack";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackHome />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
