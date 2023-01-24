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
} from "./RegisterStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  handleMessageButtonCLick: () => void;
};
const RegisterView = ({
  handleMessageButtonCLick,
  submitForm,
  isLoadingAuth,
}: IProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  let infoButton = (
    <StyledButton
      title="Registrar"
      onPress={() => submitForm(userName, phone, email, password)}
    />
  );
  if (isLoadingAuth) {
    infoButton = <ActivityIndicator size="large" color="red" />;
  }
  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/imagehitasia/imagehitasia1504/imagehitasia150402635/39004271-great-wall-of-china.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <BottomScreen>
            <LoginBox>
              <LabelLogin>Nome</LabelLogin>
              <Input
                placeholder="Seu Nome"
                placeholderTextColor={"#999"}
                autoCompleteType="text"
                value={userName}
                onChangeText={(t) => setUserName(t)}
              />
              <LabelLogin>Telefone</LabelLogin>
              <Input
                placeholder="(xx) x.xxxx-xxxx"
                leftIcon={{
                  type: "font-awesome",
                  name: "phone",
                  color: "#085087",
                }}
                placeholderTextColor={"#999"}
                autoCompleteType="telefone"
                value={phone}
                onChangeText={(t) => setPhone(t)}
              />
              <LabelLogin>Email</LabelLogin>
              <Input
                placeholder="email@email.com"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "#085087",
                }}
                placeholderTextColor={"#999"}
                autoCompleteType="email"
                value={email}
                onChangeText={(t) => setEmail(t)}
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
                value={password}
                onChangeText={(t) => setPassword(t)}
              />
              <BottomButton>{infoButton}</BottomButton>
            </LoginBox>
            <SignMessageView>
              <SignMessageButton
                title="Registrar"
                onPress={handleMessageButtonCLick}
              >
                <SignMessageButtonText>
                  Já possui um conta?
                </SignMessageButtonText>
                <SignMessageButtonTextBold>
                  Efetue o Login
                </SignMessageButtonTextBold>
              </SignMessageButton>
            </SignMessageView>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default RegisterView;
