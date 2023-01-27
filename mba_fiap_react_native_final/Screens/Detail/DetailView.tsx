import React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
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
