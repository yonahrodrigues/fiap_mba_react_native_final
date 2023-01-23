import React, { useState, useContext } from "react";
import LoginView from "./LoginView";
import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";
import { UserContext } from "../../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { setLocale } from "yup";

const LoginController = () => {
  const { dispatch: userDispatch } = useContext(UserContext);

  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);

  const navigation = useNavigation();

  const handleMessageButtonCLick = () => {
    navigation.reset({
      routes: [{ name: "Signup" }],
    });
  };

  let schema = yup.object().shape({
    userName: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required(),
  });

  const makeLogin = (userName: string, password: string) => {
    console.log("Validando Login - " + userName + " - " + password);
    setLocale({
      // use constant translation keys for messages without values
      mixed: {
        default: "field_invalid",
      },
    });
    // check validity
    schema
      .validate({
        userName: "Aaaaaaaaaa@email.com",
        password: "AAABBBCCCbb24",
      })
      .then(function (valid) {
        console.log(
          "Validando Login - " + userName + " - " + password + " valid" + valid
        );
        if (valid) {
          console.log("Loading Login - " + userName + " - " + password);

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
              setIsLoadingAuth(false);
              navigation.reset({
                routes: [{ name: "MainDrawer" }],
              });
            })
            .catch((error: any) => {
              console.log("Retornou erro");
              console.log(error);
              setIsLoadingAuth(false);
            });
        }
      })
      .catch(function (err) {
        err.errors;
        alert(`${err.errors}`);
      });
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
