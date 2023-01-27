import styled from "styled-components/native";
import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";

export const MainContainer = styled.SafeAreaView`
  background-color: #64afe8;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 5px;
`;
export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const SignMessageView = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
`;

export const BottomScreen = styled.View`
  flex: 4;
  flex-direction: column;
  justify-content: center;
`;

export const FrontImageBackground = styled.View`
  flex: 1;
  padding-top: 40px;
  padding-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const LoginBox = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 35px;
  border-radius: 15px;
  border-width: 1px;
  border-color: #085087;
  padding: 20px;
`;

export const LabelLogin = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #333;
`;

export const BottomButton = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: "#085087",
    borderRadius: 10,
  },
  containerStyle: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
})``;

export const StyledImageBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
`;
