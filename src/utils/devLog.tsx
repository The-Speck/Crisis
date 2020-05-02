export const devLog = (...args: (string | number)[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
