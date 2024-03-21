export const useLocalStorage = (keys, defaultValues) => {
  const setItem = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValues[keys.indexOf(key)];
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setItem: (key, value) => setItem(key, value),
    getItem: (key) => getItem(key),
    removeItem: (key) => removeItem(key),
  };
};
