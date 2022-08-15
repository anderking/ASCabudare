import { LoginResponseModel } from "@models/auth/login.model";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";

export function getCurrentUserDecrypt(): LoginResponseModel {
  try {
    let getCookieEncrypt = localStorage.getItem("currentUser");
    let textDecrypt = CryptoJS.AES.decrypt(getCookieEncrypt, environment.key);
    let currentUserDecript = textDecrypt.toString(CryptoJS.enc.Utf8);
    if (currentUserDecript) {
      let decryptedData = JSON.parse(currentUserDecript);
      return decryptedData;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
