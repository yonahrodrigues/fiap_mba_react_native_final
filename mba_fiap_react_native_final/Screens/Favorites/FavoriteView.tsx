import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";

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
  StyledImage,
  ListArea,
} from "./FavoriteStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const FavoriteView = ({ dataConnection, isLoading, goToDetail }: iProps) => {
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
  return (
    <MainSafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ padding: 5 }}
      >
        <Icon
          name="bars"
          type="font-awesome"
          size={20}
          tvParallaxProperties={undefined}
          color={Colors.HeaderTintColor}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      {loadingBox}
      <ListArea>
        <FlatList
          data={dataConnection}
          renderItem={({ item }: { item: IProduct }) => (
            <RenderItem item={item} />
          )}
          keyExtractor={(item: IProduct) => item._id.toString()}
        />
      </ListArea>
    </MainSafeAreaView>
  );
};

export default FavoriteView;
