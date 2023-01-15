import React from "react";
import { ScrollView } from "react-native";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  StyledImage,
} from "./DetailStyles";
import Product from "../../Interfaces/IProduct";

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
  return (
    <MainContainer>
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
