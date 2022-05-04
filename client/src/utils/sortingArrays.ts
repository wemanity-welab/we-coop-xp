function sortingByClient(a, b) {
  if (a.client < b.client) {
    return -1;
  }
  if (a.client > b.client) {
    return 1;
  }
  return 0;
}
function sortingByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
function sortingByProfile(a, b) {
  if (a.profile < b.profile) {
    return -1;
  }
  if (a.profile > b.profile) {
    return 1;
  }
  return 0;
}
function sortingByMostRecent(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
export {
  sortingByClient,
  sortingByTitle,
  sortingByProfile,
  sortingByMostRecent,
};
