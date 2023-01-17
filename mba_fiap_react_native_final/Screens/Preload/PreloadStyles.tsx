import styled from "styled-components/native";
import { ImageBackground } from "react-native";

export const MainContainer = styled.SafeAreaView`
  background-color: #64afe8;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
