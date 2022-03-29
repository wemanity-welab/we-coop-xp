export default class Utils {
  static removeDuplicateObject(array: any[]): any[] {
    const idOfEachObject: any[] = array.map((object) => object.id);

    const filteredId: any[] = [...new Set(idOfEachObject)];

    const arrayOfObject: any[] = filteredId.map((id) => {
      return array.find((object) => object.id === id);
    });

    return arrayOfObject;
  }
}
