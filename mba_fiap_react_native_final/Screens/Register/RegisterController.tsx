import React, { useState } from "react";
import RegisterView from "./RegisterView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getRegister, IParamGetRegister } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppDispatch } from "../../Store/hooks";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { setLocale } from "yup";
import { Alert } from "react-native";

const RegisterController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getRegisterAPI = useAPI(getRegister);
  const navigation = useNavigation();
  const handleMessageButtonCLick = () => {
    navigation.reset({
      routes: [{ name: "Signin" }],
    });
  };
  const dispatch = useAppDispatch();

  const makeRegister = (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    console.log("Loading Register - " + userName + " - " + password);

    let info: IParamGetRegister = {
      name: userName,
      phone,
      email,
      password,
    };

    setIsLoadingAuth(true);

    getRegisterAPI
      .requestPromise("", info)
      .then((user: IUserInfo) => {
        console.log("After Register");
        console.log(user.message);
        if (user.message == "User created successfully") {
          Alert.alert("Cadastro criado com sucesso");
        } else {
          Alert.alert("Erro ao efetuar cadastro, tente novamente...");
        }
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const submitForm = (
    userName: string,
    phone: string,
    email: string,
    password: string
  ) => {
    console.log("REgister: " + userName, phone, email, password);

    let schema = yup.object().shape({
      userName: yup.string().required(),
      phone: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required(),
    });
    setLocale({
      // use constant translation keys for messages without values
      mixed: {
        default: "field_invalid",
      },
    });
    // check validity
    schema
      .validate({
        userName,
        phone,
        email,
        password,
      })
      .then(function (valid) {
        if (valid) {
          makeRegister(userName, phone, email, password);
        }
      })
      .catch(function (err) {
        err.errors;
        alert(`${err.errors}`);
        setIsLoadingAuth(false);
      });
    setIsLoadingAuth(false);
  };

  return (
    <RegisterView
      handleMessageButtonCLick={handleMessageButtonCLick}
      submitForm={submitForm}
      isLoadingAuth={isLoadingAuth}
    />
  );
};

export default RegisterController;
