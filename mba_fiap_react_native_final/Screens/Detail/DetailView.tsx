import React from "react";
import { ScrollView, View } from "react-native";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  MenuBack,
} from "./DetailStyles";
import Product from "../../Interfaces/IProduct";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Colors from "../../Styles/Colors";
import IPosition from "../../Interfaces/IPosition";

type iProps = {
  objectItem: Product | null;
  objectPosition: IPosition | null;
};
const DetailView = ({ objectItem, objectPosition }: iProps) => {
 // console.log("OBJPOsition" + JSON.stringify(objectPosition));

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
        <TextTitle>{objectPosition ? `Sua localização: ` : ""}</TextTitle>
        <TextDetail>
          {objectPosition != null
            ? `Latitude: ${objectPosition?.coords?.latitude}`
            : ""}
        </TextDetail>
        <TextDetail>
          {objectPosition != null
            ? `Longitude: ${objectPosition?.coords?.longitude} `
            : ""}
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
        {/* <TextDetail>{JSON.stringify(objectItem.stores)}</TextDetail> */}
      </ScrollView>
    </MainContainer>
  );
};

export default DetailView;
