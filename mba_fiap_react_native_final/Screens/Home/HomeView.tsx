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
  ProdFavButton,
  ListArea,
} from "./HomeStyles";
import { Button } from "react-native-elements/dist/buttons/Button";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import MainDrawer from "../../Routes/MainDrawer";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteIconFull from "../../assets/favorite_full.svg";
import useAPI from "../../Services/APIs/Common/useAPI";

type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
  isFavorite: (item: string) => void;
};

// let info: IParamGetManageFavorite = {
//   productID: item._id.toString(),
// };

const HomeView = ({
  isFavorite,
  dataConnection,
  isLoading,
  goToDetail,
}: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    function handleFavClick(item) {
      //todo aplicar logica favorited

      isFavorite(item._id.toString());
    }

    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
        testID={"button" + item._id.toString()}
      >
        <>
          <TextsView>
            <View>
              <TextNameStyle>
                <ProdFavButton onPress={handleFavClick(item)}>
                  {item.favorite ? (
                    <FavoriteIconFull width="24" height="24" fill="#4400ff" />
                  ) : (
                    <FavoriteIcon width="24" height="24" fill="#4400ff" />
                  )}
                </ProdFavButton>
                <TextTitle> R${item.price}</TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>{item.name}</TextDetail>
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

  return (
    <MainSafeAreaView>
      <DrawerMenu />

      {/* <MainDrawer /> */}
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

export default HomeView;
