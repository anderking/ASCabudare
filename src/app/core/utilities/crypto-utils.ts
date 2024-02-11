import { environment } from "@environments/environment";
import * as CryptoJS from "crypto-js";

export const encrypted = (value) => {
  if (value) {
    const valueEncrypt = CryptoJS.AES.encrypt(value, environment.key);
    return valueEncrypt;
  }
};

export const decrypted = (value) => {
  if (value) {
    const valueDecrypt = CryptoJS.AES.decrypt(value, environment.key);
    const currentUserDecript = valueDecrypt.toString(CryptoJS.enc.Utf8);
    return currentUserDecript;
  }
};
