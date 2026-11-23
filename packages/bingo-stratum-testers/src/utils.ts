export const createFailingObject = (label: string, user: string): object => {
  return new Proxy(
    {},
    {
      get: createFailingFunction(label, user),
    },
  );
};

const createFailingFunction = (label: string, user: string) => {
  return () => failingFunction(label, user);
};

const failingFunction = (label: string, user: string): never => {
  throw new Error(`Context property '${label}' was used by ${user} but not provided.`);
};
