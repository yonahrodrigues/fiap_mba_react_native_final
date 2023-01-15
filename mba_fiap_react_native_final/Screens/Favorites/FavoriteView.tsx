import React from "react";
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
  StyledImage,
} from "./FavoriteStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";

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

  return (
    <MainSafeAreaView>
      <DrawerMenu />
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IProduct }) => (
          <RenderItem item={item} />
        )}
        keyExtractor={(item: IProduct) => item._id.toString()}
        testID="flatListHome"
      />
    </MainSafeAreaView>
  );
};

export default FavoriteView;
