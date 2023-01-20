import "react-native-gesture-handler";
import React, { useState, useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import LoginController from "../Screens/Login/LoginController";
import RegisterController from "../Screens/Register/RegisterController";
import PreloadController from "../Screens/Preload/PreloadController";

import { MainTab } from "./MainTab";
import DetailController from "../Screens/Detail/DetailController";
import LogoutController from "../Screens/Login/LogoutController";
import HomeController from "../Screens/Home/HomeController";

import FavoriteController from "../Screens/Favorites/FavoriteController";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export const MainDrawer = () => {
 
  //console.log("MaindraweUserInfo =" + userState.user.name);
  return (
    <>
      {/* <Text>{userState.user?.name !== null ? userState.user.name : ""}</Text> */}

      <Drawer.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        // initialRouteName="Home"
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Principal" component={HomeController} />
        <Drawer.Screen name="Favoritos" component={FavoriteController} />
        {/* <Drawer.Screen name="Logout" component={CustomDrawer} /> */}
      </Drawer.Navigator>
    </>
  );
};
