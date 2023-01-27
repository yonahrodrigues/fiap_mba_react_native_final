import AsyncStorage from "@react-native-async-storage/async-storage";

export async function useGetStorageItem(key: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.getItem(key).then((value: string | null) => {
        let jsonInfo = JSON.parse(value!);
        console.log(jsonInfo);
        resolve(jsonInfo);
      });
    } catch (e) {
      console.log("useGetStorageItem Error = ");
      console.log(e);
      reject(null);
    }
  });
}
export async function useSetStorageItem(
  key: string,
  value: object | string | null | undefined
) {
  return new Promise((resolve, reject) => {
    try {
      let jsonInfo = JSON.stringify(value);
      AsyncStorage.setItem(key, jsonInfo);
      return true;
    } catch (e) {
      console.log("useSetStorageItem Error = ");
      console.log(e);
    }
    return false;
  });
}

export async function useRemoveStorageItem(key: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.log("useRemoveStorageItem Error = ");
      console.log(e);
    }
    return false;
  });
}
