export const getPluralOfWord = (word: string, occurance: number) => {
  return occurance > 1 ? word + "s" : word;
};
