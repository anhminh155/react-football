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
  static getMassage(): string {
    return "Failed to get response from server. Please try again in 10 seconds!!!";
  }
}
export default Utils;
