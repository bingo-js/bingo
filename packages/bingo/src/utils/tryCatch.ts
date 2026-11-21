export const tryCatchError = async <T>(promise: Promise<T>): Promise<Error | T> => {
  try {
    return await promise;
  } catch (error) {
    return error as Error;
  }
};

export const tryCatchSafe = async <T>(promise: Promise<T>): Promise<T | undefined> => {
  try {
    return await promise;
  } catch {
    return undefined;
  }
};

export const tryCatchSafeSync = <T>(computer: () => T): T | undefined => {
  try {
    return computer();
  } catch {
    return undefined;
  }
};
