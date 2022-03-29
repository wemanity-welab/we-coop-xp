export default class Utils {
  static removeDuplicateObject(array: any[]): any[] {
    const arrayOfObject: any[] = Array.from(
      new Set(array.map((object) => object.id)),
    ).map((id) => {
      return array.find((object) => object.id === id);
    });
    return arrayOfObject;
  }
}
