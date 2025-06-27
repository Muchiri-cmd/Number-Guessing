const getSecretNumber = (): number => {
  const secretNumber = Math.floor(Math.random() * 100);
  return secretNumber;
};

export default getSecretNumber;
