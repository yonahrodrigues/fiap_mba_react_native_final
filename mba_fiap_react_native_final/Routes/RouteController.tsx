import "react-native-gesture-handler";
import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";

import HomeController from "../Screens/Home/HomeController";
import DetailController from "../Screens/Detail/DetailController";
import MyPositionController from "../Screens/MyPosition/MyPositionController";
import RegisterController from "../Screens/Register/RegisterController";

import Colors from "../Styles/Colors";
//import { useManageNotification } from "../Services/Notification/useManageNotification";

import LoginController from "../Screens/Login/LoginController";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../Store/store";

import { Provider } from "react-redux";
import { useAppSelector } from "../Store/hooks";

export type RootDrawerParamList = {
  Main: undefined;
  MyPositionDrawer: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Details: { itemID: number; info: string };
  MyPosition: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

let screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
};

export const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeController}
        options={screenOptions}
      />
      <Stack.Screen
        name="Details"
        component={DetailController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

const RouteController = () => {
  //useManageNotification();

  let drawerNavigation: DrawerNavigationOptions = {
    headerShown: false,
    drawerActiveTintColor: Colors.HeaderTintColor,
    drawerInactiveTintColor: Colors.NeutralMedium,
    drawerStyle: {
      backgroundColor: Colors.HeaderBackgroundColor,
      width: 240,
    },
  };

  const StackMyPosition = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyPosition"
          component={MyPositionController}
          options={{ ...screenOptions, title: "Minha Posição" }}
        />
      </Stack.Navigator>
    );
  };

  const userInfo = useAppSelector((state) => state.login.user);
  if (userInfo && userInfo.token !== "") {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Main">
          <Drawer.Screen
            name="Main"
            component={StackHome}
            options={{ drawerLabel: "Main", ...drawerNavigation }}
          />
          <Drawer.Screen
            name="MyPositionDrawer"
            component={StackMyPosition}
            options={{
              drawerLabel: "Minha Posição",
              headerShown: false,
              ...drawerNavigation,
            }}
          />
           <Drawer.Screen
            name="Details"
            component={DetailController}
            options={{ drawerLabel: "Main", ...drawerNavigation }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MyPosition"
                component={LoginController}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeController}
                options={screenOptions}
              />
              <Stack.Screen
                name="Register"
                component={RegisterController}
                options={screenOptions}
              />
              <Stack.Screen
                name="Details"
                component={DetailController}
                options={screenOptions}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
};

const RouteControllerManagement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(RouteControllerManagement);
