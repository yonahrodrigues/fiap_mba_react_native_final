import React, { useState } from "react";
import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  FrontImageBackground,
  LabelLogin,
  LoginBox,
  MainContainer,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
  SignMessageView,
  StyledButton,
  StyledImageBackground,
} from "./LoginStyles";

type IProps = {
  isLoadingAuth: boolean;
  handleMessageButtonCLick: () => void;
  submitForm: (emailField: string, passwordField: string) => void;
};
const LoginView = ({
  handleMessageButtonCLick,
  submitForm,
  isLoadingAuth,
}: IProps) => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  let infoButton = (
    <StyledButton
      title="Login"
      onPress={() => submitForm(emailField, passwordField)}
    />
  );
  if (isLoadingAuth) {
    infoButton = <ActivityIndicator size="large" color="red" />;
  }

  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/armmypicca/armmypicca2209/armmypicca220901796/191064950-online-sales-ideas-for-work-at-home-asian-man-is-answering-phone-calls-to-accept-orders-from-online-.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <BottomScreen>
            <LoginBox>
              <LabelLogin>Login</LabelLogin>
              <Input
                placeholder="email@email.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#085087",
                }}
                placeholderTextColor={"#999"}
                autoCompleteType="email"
                value={emailField}
                onChangeText={(t) => setEmailField(t)}
              />
              <LabelLogin>Senha</LabelLogin>
              <Input
                placeholder="ABCabc1234"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "#085087",
                }}
                secureTextEntry={true}
                placeholderTextColor={"#999"}
                autoCompleteType="password"
                value={passwordField}
                onChangeText={(t) => setPasswordField(t)}
              />
              <BottomButton>{infoButton}</BottomButton>
            </LoginBox>
            <SignMessageView>
              <SignMessageButton
                title="Registrar"
                onPress={handleMessageButtonCLick}
              >
                <SignMessageButtonText>
                  Ainda não possui um conta?
                </SignMessageButtonText>
                <SignMessageButtonTextBold>
                  Registre-se
                </SignMessageButtonTextBold>
              </SignMessageButton>
            </SignMessageView>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default LoginView;
