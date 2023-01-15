import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import MyPositionView from "./MyPositionView";


type IProps = StackScreenProps<RootStackParamList, "MyPosition">;

export default function MyPositionController() {
  //Criando os states para buscar a informação
  const [position, setPosition] = useState<LocationObject | null>(null);
  const [statusPosition, setStatusPosition] = useState<number>(0);

  const startGetGeoLocation = (type: number) => {
    setTimeout(async () => {
      //Verifica se o usuário já deu a permissão e, caso não tenha, solicita a permissão
      let { status } = await Location.requestForegroundPermissionsAsync();
      //Retorna o erro
      if (status !== "granted") {
        setStatusPosition(-1);
        return;
      }

      //Com o permissão em ordem, busca a posição do usuário assincronamente
      let currentPosition;
      if (type === 0) {
        currentPosition = await Location.getCurrentPositionAsync({});
      } else {
        currentPosition = await Location.getLastKnownPositionAsync({});
      }

      setPosition(currentPosition);
      setStatusPosition(2);

      console.log(currentPosition);
    }, 1000);
  };
const cleanInfo = () => {
  setStatusPosition(0);
};

//Mostra o status/resultado na tela
return (
  <MyPositionView
    position={position}
    statusPosition={statusPosition}
    startGetGeoLocation={startGetGeoLocation}    
    cleanInfo={cleanInfo}
  />
);
}