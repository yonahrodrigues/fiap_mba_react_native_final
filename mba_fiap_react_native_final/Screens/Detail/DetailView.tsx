import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  StyledImage,
  MenuBack,
} from "./DetailStyles";
import Product from "../../Interfaces/IProduct";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import Colors from "../../Styles/Colors";

type iProps = {
  objectItem: Product | null;
};
const DetailView = ({ objectItem }: iProps) => {
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
        <TextTitle>Nome</TextTitle>
        <TextName>{objectItem.name}</TextName>
        <TextTitle>Preço</TextTitle>
        <TextDetail>R${objectItem.price}</TextDetail>
        <TextTitle>Favorito</TextTitle>

        <TextDetail> {objectItem.favorite ? "Sim" : "Não"}</TextDetail>
        <TextTitle>Sua Localização</TextTitle>
        <TextDetail>{objectItem?.localization}</TextDetail>
        <TextTitle>Lojas com item em Estoque</TextTitle>
        <TextDetail>{JSON.stringify(objectItem.stores)}</TextDetail>
      </ScrollView>
    </MainContainer>
  );
};

export default DetailView;
