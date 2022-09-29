export const capitalizeFirstLetter = (value: string) => {
  const result = value.split("");
  result[0] = result[0].toUpperCase();
  return result.join("");
};
