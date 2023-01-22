import "react-native-gesture-handler";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FavoriteController from "../Screens/Favorites/FavoriteController";
import HomeController from "../Screens/Home/HomeController";

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
    </Tab.Navigator>
  );
};
