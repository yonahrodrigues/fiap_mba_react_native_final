import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";
import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
} from "./HomeStyles";
import { Button } from "react-native-elements/dist/buttons/Button";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import MainDrawer from "../../Routes/MainDrawer";
type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const HomeView = ({ dataConnection, isLoading, goToDetail }: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
        testID={"button" + item._id.toString()}
      >
        <>
          <TextsView>
            <View>
              <TextNameStyle>
                <TextTitle>{item.name}</TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>
                  R${item.price} - {item.favorite ? "Favorito" : "Comum"}
                </TextDetail>
              </TextNameStyle>
              <Button />
            </View>
          </TextsView>
          <Separator />
        </>
      </ContainerItem>
    );
  };

  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark}
        testID="activityLoading"
      />
    );
  }

  const navigation = useNavigation();
  const irPraHome = () => {
    navigation.navigate("Home");
  };
  const irPraFav = () => {
    navigation.navigate("Favorite");
  };

  return (
    <MainSafeAreaView>
      <DrawerMenu />

      {/* <MainDrawer /> */}
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IProduct }) => (
          <RenderItem item={item} />
        )}
        keyExtractor={(item: IProduct) => item._id.toString()}
        testID="flatListHome"
      />
      <Button title="ver meus Favoritos" onPress={irPraFav} />
    </MainSafeAreaView>
  );
};

export default HomeView;
