import { Button } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoriteController from "../Screens/Favorites/FavoriteController";
import HomeController from "../Screens/Home/HomeController";
import LoginController from "../Screens/Login/LoginController";
import MyPositionController from "../Screens/MyPosition/MyPositionController";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MyPositiona" component={MyPositionController} />
      <Drawer.Screen name="Home" component={HomeController} />
      <Drawer.Screen name="Favoritos" component={FavoriteController} />
      {/* <Drawer.Screen name="LogOut" component={LoginController} /> */}
    </Drawer.Navigator>
  );
};
