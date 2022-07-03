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

const getBrowserEngine = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isGecko =
    userAgent.indexOf("firefox") > -1 || userAgent.indexOf("thunderbird") > -1;
  if (isGecko) {
    return "gecko";
  } else {
    return "blink";
  }
};

const decorator = (func: () => string) => {
  let cache = "";
  return function () {
    if (cache !== "") {
      // console.log("return cache");
      return cache;
    } else {
      // console.log("excute getBrowserEngine");
      cache = func();
      return cache;
    }
  };
};

export const cachedGetBrowserEngine = decorator(getBrowserEngine);
