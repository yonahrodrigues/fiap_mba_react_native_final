import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeController from "../Screens/Home/HomeController";

import FavoriteController from "../Screens/Favorites/FavoriteController";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
  return (
    <>
      <Drawer.Navigator
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Principal" component={HomeController} />
        <Drawer.Screen name="Favoritos" component={FavoriteController} />
      </Drawer.Navigator>
    </>
  );
};
