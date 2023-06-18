import { CurrentUserModel } from "@models/auth/current-user.model";
import * as CryptoJS from "crypto-js";
import { environment } from "@environments/environment";

export function getCurrentUserDecrypt(): CurrentUserModel {
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

export function groupBy(inputArray: any, key: any, removeKey = false): any[] {
  const outputType = {};
  inputArray.reduce(
    (previous, current) => {
      const { [key]: keyValue } = current;

      if (removeKey && keyValue) {
        delete current[key];
      }

      const { [keyValue]: reducedValue = [] } = previous;

      return Object.assign(previous, {
        [keyValue]: reducedValue.concat(current),
      });
    },

    outputType
  );

  const levelOne: any = [];
  for (const id in outputType) {
    if (outputType.hasOwnProperty(id)) {
      const element = outputType[id];
      levelOne.push({
        name: id,
        values: element,
      });
    }
  }

  return levelOne;
}

export function groupByMult(items: any[], groups: any[]): any[] {
  const outputType = {};
  const levelOne: any = [];
  try {
    items.forEach((a) => {
      groups
        .reduce((o, g, i) => {
          o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
          return o[a[g]];
        }, outputType)
        .push(a);
    });

    for (const key in outputType) {
      if (outputType.hasOwnProperty(key)) {
        const element = outputType[key];
        levelOne.push({
          name: key,
          values: element,
        });
      }
    }

    levelOne.forEach((item) => {
      const levelTwo: any = [];
      for (const key in item.values) {
        if (item.values.hasOwnProperty(key)) {
          const element = item.values[key];
          levelTwo.push({
            name: key,
            values: element,
          });
        }
      }
      item.values = levelTwo;
    });
  } catch (error) {
    console.error(error);
  }

  return levelOne;
}

export function clearLocalStorage(): void {
  let lang: string = localStorage.getItem("lang");
  localStorage.clear();
  localStorage.setItem("lang", lang != "null" && lang != null ? lang : "es");
}
