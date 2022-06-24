export const validateEmail = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const validateName = (str: string) => {
  // only alpha, number,
  const regex = /^[|a-z|A-Z|0-9|]+$/;
  return regex.test(str) && str.length > 1 && str.length < 11;
};
