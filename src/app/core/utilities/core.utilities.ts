import { LoginResponseModel } from "@models/auth/login.model";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";

export function getCurrentUserDecrypt(): LoginResponseModel {
  try {
    const getCookieEncrypt = localStorage.getItem("currentUser");
    const textDecrypt = CryptoJS.AES.decrypt(getCookieEncrypt, environment.key);
    const currentUserDecript = textDecrypt.toString(CryptoJS.enc.Utf8);
    if (currentUserDecript) {
      return JSON.parse(currentUserDecript);
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
    return (a: any, b: any) => compare(attr, a, b);
  }

  return items.sort(generaComparador(field));
}
