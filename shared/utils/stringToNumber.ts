
export const stringToNumber = (value: string): number => {
  return +value.split('.').join('').split(',').join('.');
};
