import { ICompetition } from "../types/football-type";

class Utils {
  static setLocalStorage(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getValueLocalStorage(key: string): any | null {
    const value = localStorage.getItem(key);
    let re = null;
    value && (re = Utils.parseJson(value));
    return re;
  }
  static removeItemLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  static parseJson(str: string): any | null {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  static formatDate(date: Date): string {
    return new Date(date).toDateString();
  }

  static newDate(date: Date): Date {
    return new Date(date);
  }

  static getMassage(): string {
    return "Failed to get response from server. To protect the API from unnecessary load it is rate limited, please try again in 30 seconds!!!";
  }

  static getAge(date: string) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
export default Utils;
