import "react-native-gesture-handler";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginController from "../Screens/Login/LoginController";
import RegisterController from "../Screens/Register/RegisterController";
import PreloadController from "../Screens/Preload/PreloadController";
import FavoriteController from "../Screens/Favorites/FavoriteController";
import HomeController from "../Screens/Home/HomeController";
import LogoutController from "../Screens/Login/LogoutController";

const Tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeController} />
      <Tab.Screen name="Favorites" component={FavoriteController} />
      <Tab.Screen name="Logout" component={LogoutController} />
    </Tab.Navigator>
  );
};
