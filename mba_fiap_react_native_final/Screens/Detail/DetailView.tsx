import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { Icon } from "react-native-elements";
import Colors from "../../Styles/Colors";
import IPosition from "../../Interfaces/IPosition";
import IProduct from "../../Interfaces/IProduct";
import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  MenuBack,
} from "./DetailStyles";
type iProps = {
  objectItem: IProduct | null;
  objectPosition: IPosition | null;
};

const DetailView = ({ objectItem, objectPosition }: iProps) => {
  if (!objectItem) {
    return (
      <>
        <TextNoInfo>Sem informações</TextNoInfo>
      </>
    );
  }
  const navigation = useNavigation();
  return (
    <MainContainer>
      <MenuBack onPress={() => navigation.goBack()} style={{ padding: 0.5 }}>
        <Icon
          name="chevron-left"
          type="font-awesome"
          size={15}
          color={Colors.PrimaryDark}
          style={{ marginLeft: 5 }}
        />
      </MenuBack>
      <ScrollView>
        <TextTitle>Produto</TextTitle>
        <TextDetail>{objectItem.name}</TextDetail>
        <TextTitle>Preço</TextTitle>
        <TextDetail>R${objectItem.price}</TextDetail>
        <TextTitle>Favorito</TextTitle>

        <TextDetail> {objectItem.favorite ? "Sim" : "Não"}</TextDetail>
        <TextTitle>
          {objectPosition != undefined ? `Sua localização: ` : ""}
        </TextTitle>
        {objectPosition ? (
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
              region={{
                latitude: objectPosition?.coords.latitude,
                longitude: objectPosition?.coords.longitude,
                latitudeDelta: 3,
                longitudeDelta: 3,
              }}
              mapType={"satellite"}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                key={1}
                calloutAnchor={{
                  x: 2.9,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: Number(objectPosition?.coords.latitude),
                  longitude: Number(objectPosition?.coords.longitude),
                }}
              ></Marker>
              {objectItem.stores
                ? objectItem.stores.map((item) => (
                    <>
                      <Marker
                        key={item.name}
                        calloutAnchor={{
                          x: 2.9,
                          y: 0.8,
                        }}
                        coordinate={{
                          latitude: Number(item.latitude),
                          longitude: Number(item.longitude),
                        }}
                      ></Marker>
                    </>
                  ))
                : ""}
            </MapView>
          </View>
        ) : (
          ""
        )}
        <TextDetail>
          {objectPosition?.coords?.latitude != undefined
            ? `Latitude: ${objectPosition?.coords?.latitude}`
            : "carregando..."}
        </TextDetail>
        <TextDetail>
          {objectPosition?.coords?.longitude != undefined
            ? `Longitude: ${objectPosition?.coords?.longitude} `
            : "carregando..."}
        </TextDetail>
        <TextTitle>
          {objectItem.stores ? "Lojas com item em Estoque" : " "}
        </TextTitle>
        <View>
          {objectItem.stores
            ? objectItem.stores.map((item) => (
                <>
                  <TextName>{item.name}</TextName>
                  <TextDetail>
                    {item.address} Lat:{item.latitude} Long:{item.longitude}{" "}
                  </TextDetail>
                </>
              ))
            : ""}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default DetailView;
