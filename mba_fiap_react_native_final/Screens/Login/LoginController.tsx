import React, { useState, useContext } from "react";
import LoginView from "./LoginView";
import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";
//import { useAppDispatch } from "../../Store/hooks";
//import { setUser } from "../../Store/Login/LoginSlice";
import { UserContext } from "../../Context/UserContext";
import { useNavigation } from "@react-navigation/native";

const LoginController = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);

  //const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const handleMessageButtonCLick = () => {
    navigation.reset({
      routes: [{ name: "Signup" }],
    });
  };

  const makeLogin = (userName: string, password: string) => {
    console.log("Loading Login - " + userName + " - " + password);

    if (userName && password) {
      let info: IParamGetLogin = {
        email: userName,
        password: password,
      };
      setIsLoadingAuth(true);

      getLoginAPI
        .requestPromise("", info)
        .then((user: IUserInfo) => {
          console.log("After Login");
          console.log(user);
          userDispatch({
            type: "setUser",
            payload: {
              user,
            },
          });
          //dispatch(setUser({ user }));
          setIsLoadingAuth(false);
          //navigation.navigate("Home");
          navigation.reset({
            routes: [{ name: "MainDrawer" }],
          });
        })
        .catch((error: any) => {
          console.log("Retornou erro");
          console.log(error);
          setIsLoadingAuth(false);
        });
    } else {
      alert("Preencha os campos...");
    }
  };

  const submitForm = () => {
    makeLogin("etesteemail@email.com", "123456");
  };

  return (
    <LoginView
      handleMessageButtonCLick={handleMessageButtonCLick}
      submitForm={submitForm}
      isLoadingAuth={isLoadingAuth}
    />
  );
};

export default LoginController;
