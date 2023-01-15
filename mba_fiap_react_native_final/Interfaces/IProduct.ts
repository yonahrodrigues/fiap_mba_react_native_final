import IStore from "./IStore";

export default interface IProduct {
    _id: number;
    name: string;
    price: string;
    favorite: true;
    stores: [IStore];
    createdDate: string;
    updatedDate: string;
  }