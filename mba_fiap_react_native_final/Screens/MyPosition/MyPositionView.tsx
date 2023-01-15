import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { AllScreenStyledButton } from "../../Styles/ButtonStyle";
import Colors from "../../Styles/Colors";
import {
  MainContainer,
  ItemsInfo,
  TitleText,
  DetailText,
  ActivityIndicatorStyled,
} from "./MyPositionStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import { LocationObject } from "expo-location";

type IProps = {
  position: LocationObject | null;
  statusPosition: number;
  startGetGeoLocation: (type: number) => void;
  cleanInfo: () => void;
};

export default function MyPositionView({
  position,
  statusPosition,
  startGetGeoLocation,
  cleanInfo,
}: IProps) {
  let infoBox = null;
  if (statusPosition === 0) {
    infoBox = (
      <>
        <AllScreenStyledButton
          title="Verificar Posição"
          onPress={() => startGetGeoLocation(0)}
        />
        <AllScreenStyledButton
          title="Verificar Ultima Posição"
          onPress={() => startGetGeoLocation(1)}
        />
      </>
    );
  } else if (statusPosition === 1) {
    infoBox = (
      <ActivityIndicatorStyled size="large" color={Colors.PrimaryDark} />
    );
  } else if (statusPosition === 2) {
    let info = "";
    if (position) {
      info =
        "Latitude = " +
        position.coords.latitude +
        " - Longitude = " +
        position.coords.longitude +
        " - accuracy = " +
        position.coords.accuracy;
    }
    infoBox = (
      <>
        <ItemsInfo>
          <TitleText>Latitude: </TitleText>
          <DetailText>{position!.coords.latitude}</DetailText>
        </ItemsInfo>
        <ItemsInfo>
          <TitleText>Longitude: </TitleText>
          <DetailText>{position!.coords.longitude}</DetailText>
        </ItemsInfo>
        <ItemsInfo>
          <TitleText>Precisão: </TitleText>
          <DetailText>{position!.coords.accuracy}</DetailText>
        </ItemsInfo>
        <AllScreenStyledButton title="Recarregar" onPress={cleanInfo} />
      </>
    );
  } else {
    let info = "";
    if (position) {
      info =
        "Latitude = " +
        position.coords.latitude +
        " - Longitude = " +
        position.coords.longitude +
        " - accuracy = " +
        position.coords.accuracy;
    }
    infoBox = (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, color: "red" }}>{info}</Text>
      </View>
    );
  }

  return (
    <MainContainer>
      <DrawerMenu />
      {infoBox}
    </MainContainer>
  );
}