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

export function oderBy(items: any[], field: string): any[] {
  function compare(attr: string, obj1: any, obj2: any) {
    return obj1[attr].localeCompare(obj2[attr]);
  }

  function generaComparador(attr: string) {
    return function (a: any, b: any) {
      return compare(attr, a, b);
    };
  }

  return items.sort(generaComparador(field));
}
