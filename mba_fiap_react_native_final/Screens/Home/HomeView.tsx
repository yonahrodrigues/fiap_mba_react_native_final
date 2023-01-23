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
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteIconFull from "../../assets/favorite_full.svg";
import MyLocationIcon from "../../assets/my_location.svg";
import { LocationObject } from "expo-location";
type iProps = {
  dataConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct, position: LocationObject | null) => void;
  isFavorite: (item: string) => void;
  position: LocationObject | null;
  statusPosition: number;
  startGetGeoLocation: (type: number) => void;
  cleanInfo: () => void;
};

const HomeView = ({
  isFavorite,
  dataConnection,
  isLoading,
  goToDetail,
  position,
}: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    function handleFavClick(item) {
      isFavorite(item._id.toString());
    }

    return (
      <ContainerItem
        onPress={() => goToDetail(item, position)}
        testID={"button" + item._id.toString()}
      >
        <>
          <TextsView>
            <View>
              <TextNameStyle>
                <ProdFavButton onPress={() => handleFavClick(item)}>
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
      {loadingBox}
      <View>
        {position ? <MyLocationIcon /> : ""}

        <TextTitle>{position ? `Sua localização: ` : ""}</TextTitle>
        <TextTitle>
          {position ? `Latitude: ${position.coords.latitude}` : ""}
        </TextTitle>
        <TextTitle>
          {position ? `Longitude: ${position.coords.longitude} ` : ""}
        </TextTitle>
      </View>
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
