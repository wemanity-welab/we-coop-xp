export default function sorting(objectA, objectB) {
  if (objectA.id < objectB.id) {
    return -1;
  }
  if (objectA.id > objectB.id) {
    return 1;
  }
  return 0;
}
