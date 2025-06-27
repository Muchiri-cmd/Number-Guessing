import { useReducer, useState } from "react";

interface GameStates {
  newGameButtonDisabled: boolean;
  inputReadOnly: boolean;
  guessButtonDisabled: boolean;
  result: string;
  numberOfTries: number;
  secretNumber: number;
}

type GameActions = { type: "NEW_GAME" } | { type: "GUESS"; payload: number };

const getSecretNumber = (): number => {
  const secretNumber = Math.floor(Math.random() * 100);
  return secretNumber;
};

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
        result: `${guessedNumber} is greater than the secret number`,
        numberOfTries: state.numberOfTries - 1,
      };
    }
  }

  return { ...state };
};
const App = () => {
  const [playerGuess, setPlayerGuess] = useState("");
  const [gameState, dispatch] = useReducer(gameReducer, {
    newGameButtonDisabled: false,
    inputReadOnly: true,
    guessButtonDisabled: true,
    result: "Click new game to get started",
    numberOfTries: 10,
    secretNumber: 0,
  });

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <h2>{gameState.numberOfTries} Trials Remaining</h2>

      <input
        type="number"
        placeholder="Guess a number (0-100)"
        readOnly={gameState.inputReadOnly}
        value={playerGuess}
        onChange={(e) => setPlayerGuess(e.target.value)}
      />
      <button
        disabled={gameState.newGameButtonDisabled}
        onClick={() =>
          dispatch({
            type: "NEW_GAME",
          })
        }
      >
        New Game
      </button>
      {gameState.result && <p>{gameState.result}</p>}
      <button
        disabled={gameState.guessButtonDisabled}
        onClick={() =>
          dispatch({
            type: "GUESS",
            payload: Number(playerGuess),
          })
        }
      >
        Guess
      </button>
    </div>
  );
};

export default App;
