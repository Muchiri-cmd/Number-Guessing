import { useReducer, useState } from "react";
import gameReducer from "../reducers/reducers";
const Game = () => {
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
    <div className="game-card">
      <div className="header">
        <div></div>
        <button
          disabled={gameState.newGameButtonDisabled}
          onClick={() => {
            dispatch({
              type: "NEW_GAME",
            });
            setPlayerGuess("");
          }}
          className="new-game-btn"
        >
          New Game
        </button>
      </div>
      <div className="game-card-header">
        <h2>Guess a number between 0 - 100</h2>
        <h2>{gameState.numberOfTries} Trials Remaining</h2>
      </div>
      <input
        type="number"
        placeholder="Guess a number (0-100)"
        readOnly={gameState.inputReadOnly}
        value={playerGuess}
        onChange={(e) => setPlayerGuess(e.target.value)}
        required
      />

      {gameState.result && <p>{gameState.result}</p>}
      <button
        className="guess-btn"
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

export default Game;
