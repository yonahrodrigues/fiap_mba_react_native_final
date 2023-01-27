import React, { useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Colors from "../../Styles/Colors";
import IProduct from "../../Interfaces/IProduct";
import "react-native-get-random-values";
import { v4 } from "uuid";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
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
  getDataPage: () => void;
  position: LocationObject | null;
  getDataPaginate: () => void;
  initialRegion: {};
  region: {};
};

const HomeView = ({
  isFavorite,
  dataConnection,
  isLoading,
  goToDetail,
  position,
  getDataPage,
  getDataPaginate,
  initialRegion,
  region,
}: iProps) => {
  const RenderItem = ({ item }: { item: IProduct }) => {
    function handleFavClick(item) {
      isFavorite(item._id.toString());
    }

    return (
      <ContainerItem onPress={() => goToDetail(item, position)}>
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
      <StyledActivityIndicator size="large" color={Colors.PrimaryDark} />
    );
  }

  return (
    <MainSafeAreaView>
      {loadingBox}
      {position ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              width: Dimensions.get("window").width,
              height: 200, //Dimensions.get("window").height,
            }}
            region={region}
            initialRegion={initialRegion}
          >
            <Marker
              key={1}
              calloutAnchor={{
                x: 2.9,
                y: 0.8,
              }}
              coordinate={{
                latitude: Number(position?.coords.latitude),
                longitude: Number(position?.coords.longitude),
              }}
            ></Marker>
          </MapView>
        </View>
      ) : (
        ""
      )}
      <View>
        {position ? <MyLocationIcon /> : ""}

        <TextTitle>
          {position ? `Sua localização: ` : "buscando localização..."}
        </TextTitle>
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
          key={v4()}
          onEndReached={getDataPaginate}
          onEndReachedThreshold={0.5}
        />
      </ListArea>
    </MainSafeAreaView>
  );
};

export default HomeView;
