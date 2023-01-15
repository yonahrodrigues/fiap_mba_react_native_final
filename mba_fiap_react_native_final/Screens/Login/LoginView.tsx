import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button } from "react-native";

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
  TopScreen,
} from "./LoginStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: () => void;
};
const LoginView = ({ submitForm, isLoadingAuth }: IProps) => {
  let infoButton = <StyledButton title="Login" onPress={submitForm} />;
  if (isLoadingAuth) {
    infoButton = <ActivityIndicator size="large" color="red" />;
  }

  const navigation = useNavigation();
  const irPraHome = () => {
    navigation.navigate("Home");
  };
  const irPraFav = () => {
    navigation.navigate("Favorite");
  };

  const irPraRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <MainContainer>
      <FrontImageBackground>
        <TopScreen>
          <LogoDiv>Loja-Produtos</LogoDiv>
        </TopScreen>
        <BottomScreen>
          <LoginBox>
            <LabelLogin>Login</LabelLogin>
            <Input
              placeholder="email@email.com"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "red",
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
                color: "red",
              }}
              secureTextEntry={true}
              placeholderTextColor={"#999"}
              autoCompleteType="password"
            />
            <BottomButton>{infoButton}</BottomButton>
          </LoginBox>
          <View>
            <Button title="ir pra home" onPress={irPraHome} />
            <Button title="ir pra Favoritos" onPress={irPraFav} />
            <Button title="Registrar" onPress={irPraRegister} />
          </View>
        </BottomScreen>
      </FrontImageBackground>
    </MainContainer>
  );
};

export default LoginView;
