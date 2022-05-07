export const shuffleArr = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
};

export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const validateName = (str: string) => {
  // only alpha, number,
  const regex = /^[|a-z|A-Z|0-9|]+$/;
  return regex.test(str) && str.length > 1 && str.length < 20;
};
