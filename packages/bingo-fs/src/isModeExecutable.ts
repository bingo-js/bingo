export const isModeExecutable = (mode: number): boolean => {
  return (mode & 0o1) !== 0;
};
