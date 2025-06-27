import getSecretNumber from "../utils/getSecret";

interface GameStates {
  newGameButtonDisabled: boolean;
  inputReadOnly: boolean;
  guessButtonDisabled: boolean;
  result: string;
  numberOfTries: number;
  secretNumber: number;
}

type GameActions = { type: "NEW_GAME" } | { type: "GUESS"; payload: number };

const gameReducer = (state: GameStates, action: GameActions): GameStates => {
  if (action.type === "NEW_GAME") {
    return {
      ...state,
      newGameButtonDisabled: true,
      inputReadOnly: false,
      guessButtonDisabled: false,
      result: "A secret number has been generated, goodluck finding it",
      numberOfTries: 10,
      secretNumber: getSecretNumber(),
    };
  }

  if (action.type === "GUESS") {
    // console.log(action.payload)
    // console.log(state.secretNumber)
    console.log(state.numberOfTries);

    const guessedNumber = action.payload;
    const trials = state.numberOfTries - 1;
    console.log(trials);

    if (guessedNumber === state.secretNumber) {
      return {
        ...state,
        newGameButtonDisabled: false,
        inputReadOnly: true,
        guessButtonDisabled: true,
        result: `You win. You found the secret Number!`,
        // numberOfTries:10,
      };
    }

    if (trials === 0) {
      return {
        ...state,
        newGameButtonDisabled: false,
        inputReadOnly: true,
        guessButtonDisabled: true,
        result: `You lose. The secret number was ${state.secretNumber}`,
        numberOfTries: 0,
      };
    }

    if (guessedNumber > state.secretNumber) {
      return {
        ...state,
        result: `${guessedNumber} is greater than the secret number`,
        numberOfTries: state.numberOfTries - 1,
      };
    }

    if (guessedNumber < state.secretNumber) {
      return {
        ...state,
        result: `${guessedNumber} is less than the secret number`,
        numberOfTries: state.numberOfTries - 1,
      };
    }
  }

  return { ...state };
};

export default gameReducer;
