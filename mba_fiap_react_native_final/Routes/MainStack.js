import "react-native-gesture-handler";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginController from "../Screens/Login/LoginController";
import RegisterController from "../Screens/Register/RegisterController";
import PreloadController from "../Screens/Preload/PreloadController";

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Preload"
    >
      <Stack.Screen name="Preload" component={PreloadController} />
      <Stack.Screen name="Signin" component={LoginController} />
      <Stack.Screen name="Signup" component={RegisterController} />
    </Stack.Navigator>
  );
};
