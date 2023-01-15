import React, { useState } from "react";
import RegisterView from "./RegisterView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getRegister, IParamGetRegister } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppDispatch } from "../../Store/hooks";
import { setUser } from "../../Store/Login/LoginSlice";

const RegisterController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getRegisterAPI = useAPI(getRegister);

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
        console.log(user);
        console.log(user.token);
        dispatch(setUser({ user }));
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const submitForm = () => {
    makeRegister(
      "nomeCLiente",
      "11-122334-4332",
      "nomecliente@email.com",
      "123456"
    );
  };

  return <RegisterView submitForm={submitForm} isLoadingAuth={isLoadingAuth} />;
};

export default RegisterController;
