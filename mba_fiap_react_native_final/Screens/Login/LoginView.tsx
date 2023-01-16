import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Button, StyleSheet } from "react-native";

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
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/armmypicca/armmypicca2209/armmypicca220901796/191064950-online-sales-ideas-for-work-at-home-asian-man-is-answering-phone-calls-to-accept-orders-from-online-.jpg",
        }}
        resizeMode="cover"
      >
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
            <View style={styles.button}>
              {/* <Button title="ir pra home" onPress={irPraHome} /> */}
              {/* <Button title="ir pra Favoritos" onPress={irPraFav} /> */}
              <Button
                title="Registrar"
                onPress={irPraRegister}
                style={styles.button}
              />
            </View>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default LoginView;
