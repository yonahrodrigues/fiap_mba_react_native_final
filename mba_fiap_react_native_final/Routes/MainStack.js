import "react-native-gesture-handler";
import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import LoginController from "../Screens/Login/LoginController";
import HomeController from "../Screens/Home/HomeController";
import FavoriteController from "../Screens/Favorites/FavoriteController";
import DetailController from "../Screens/Detail/DetailController";
import RegisterController from "../Screens/Register/RegisterController";
import MyPositionController from "../Screens/MyPosition/MyPositionController";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../Store/store";
import Colors from "../Styles/Colors";
import { Provider } from "react-redux";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";

import { useAppSelector } from "../Store/hooks";

export type RootStackParamList = {
  Home: undefined,
  Details: { itemID: number, info: string },
  MyPosition: undefined,
};

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

let screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
};

export const StackHome = () => {
  const userInfo = useAppSelector((state) => state.login.user);
  console.log("UserINFO" + userInfo);
  if (userInfo && userInfo.token !== "") {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen
                name="Home"
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
            </Drawer.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack.Navigator>
            <MainStack.Screen
              name="Login"
              component={LoginController}
              options={screenOptions}
            />
            <MainStack.Screen
              name="Home"
              component={HomeController}
              options={screenOptions}
            />
            <MainStack.Screen
              name="Favorite"
              component={FavoriteController}
              options={screenOptions}
            />
            <MainStack.Screen
              name="Details"
              component={DetailController}
              options={screenOptions}
            />
            <MainStack.Screen
              name="Register"
              component={RegisterController}
              options={screenOptions}
            />
          </MainStack.Navigator>
        </PersistGate>
      </Provider>
    );
  }
};
