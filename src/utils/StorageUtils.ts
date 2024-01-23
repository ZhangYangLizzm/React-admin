function storageGet(key: string) {
  return localStorage.getItem(key);
}

function storageSet(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export { storageGet, storageSet };
