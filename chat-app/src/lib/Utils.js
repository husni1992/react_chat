export default {
  getFromLocalStorage: key => {
    return sessionStorage.getItem(key);
  },
  setLocalStorage: (key, value) => {
    return sessionStorage.setItem(key, value);
  }
};
