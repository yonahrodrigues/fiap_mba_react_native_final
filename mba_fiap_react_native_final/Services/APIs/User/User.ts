//import IUserInfo from "../../../Interfaces/iUserInfo";
import api from "../Common/api";

type IParamGetLogin = {
  email: string;
  password: string;
};

const getLogin = (url: string, data: IParamGetLogin) =>
  api.post(url + "storeProducts/login", data);

type IParamGetRegister = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const getRegister = (url: string, data: IParamGetRegister) =>
  api.put(url + "storeProducts/signup", data);

export { getLogin, IParamGetLogin, getRegister, IParamGetRegister };
