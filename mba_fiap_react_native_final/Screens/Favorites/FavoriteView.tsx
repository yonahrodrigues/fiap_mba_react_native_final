import React from "react";
import { View, FlatList } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import "react-native-get-random-values";
import { v4 } from "uuid";
import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
  ListArea,
  ProdFavButton,
} from "./FavoriteStyles";
import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteIconFull from "../../assets/favorite_full.svg";
type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
  isFavorite: (item: string) => void;
};

const FavoriteView = ({
  isFavorite,
  dataConnection,
  isLoading,
  goToDetail,
}: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    function handleFavClick(item) {
      isFavorite(item._id.toString());
    }
    return (
      <ContainerItem onPress={() => goToDetail(item)}>
        <>
          <TextsView>
            <View>
              <TextNameStyle>
                <ProdFavButton onPress={() => handleFavClick(item)}>
                  {!item.favorite ? (
                    <FavoriteIconFull width="24" height="24" fill="#ff0004" />
                  ) : (
                    <FavoriteIcon width="24" height="24" fill="#ff0004" />
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
      {loadingBox}
      <ListArea>
        <FlatList
          data={dataConnection}
          renderItem={({ item }: { item: IProduct }) => (
            <RenderItem item={item} />
          )}
          key={v4()}
        />
      </ListArea>
    </MainSafeAreaView>
  );
};

export default FavoriteView;
