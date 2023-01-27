import styled from "styled-components/native";
import { Image } from "react-native-elements";
import Colors from "../../Styles/Colors";

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

export const ContainerItem = styled.TouchableHighlight`
  margin-bottom: 10px;
`;

export const TextsView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 2px;
`;

export const TextNameStyle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
export const TextTitle = styled.Text`
  font-size: 18px;
`;
export const TextDetail = styled.Text`
  font-size: 12px;
`;

export const Separator = styled.Text`
  flex: 1;
  height: 2px;
  background-color: ${Colors.NeutralMedium};
  margin-left: 10px;
  margin-right: 10px;
`;

export const StyledImage = styled(Image).attrs({
  containerStyle: {
    width: 50,
    height: 50,
    margin: 10,
  },
})``;

export const ProdFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #999999;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const ListArea = styled.View`
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const LocationArea = styled.View`
  background-color: #308bd1;
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #ffffff;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

