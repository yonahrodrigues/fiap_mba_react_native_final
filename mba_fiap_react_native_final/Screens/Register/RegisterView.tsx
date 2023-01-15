import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  FrontImageBackground,
  LabelLogin,
  LoginBox,
  LogoDiv,
  MainContainer,
  StyledButton,
  StyledImageBackground,
  TopScreen,
} from "./RegisterStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: () => void;
};
const RegisterView = ({ submitForm, isLoadingAuth }: IProps) => {
  let infoButton = <StyledButton title="Registrar" onPress={submitForm} />;
  if (isLoadingAuth) {
    infoButton = <ActivityIndicator size="large" color="red" />;
  }
  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/chagin/chagin1501/chagin150100001/35151812-business-people-working-together.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <TopScreen>
            <LogoDiv>Cadastro</LogoDiv>
          </TopScreen>
          <BottomScreen>
            <LoginBox>
              <LabelLogin>Nome</LabelLogin>
              <Input
                placeholder="Seu Nome"
                placeholderTextColor={"#999"}
                autoCompleteType="text"
              />
              <LabelLogin>Telefone</LabelLogin>
              <Input
                placeholder="(xx) x.xxxx-xxxx"
                leftIcon={{
                  type: "font-awesome",
                  name: "phone",
                  color: "blue",
                }}
                placeholderTextColor={"#999"}
                autoCompleteType="telefone"
              />
              <LabelLogin>Email</LabelLogin>
              <Input
                placeholder="email@email.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "blue",
                }}
                placeholderTextColor={"#999"}
                autoCompleteType="email"
              />
              <LabelLogin>Senha</LabelLogin>
              <Input
                placeholder="ABCabc1234"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "blue",
                }}
                secureTextEntry={true}
                placeholderTextColor={"#999"}
                autoCompleteType="password"
              />
              <BottomButton>{infoButton}</BottomButton>
            </LoginBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default RegisterView;
