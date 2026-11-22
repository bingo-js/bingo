export const createFailingFunction = (label: string, user: string) => {
  return (): never => failingFunction(label, user);
};

const failingFunction = (label: string, user: string): never => {
  throw new Error(`Context property '${label}' was used by ${user} but not provided.`);
};
