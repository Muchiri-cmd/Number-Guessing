import { useReducer,useState } from "react";

interface GameStates {
  newGameButtonDisabled: boolean;
  inputReadOnly: boolean;
  guessButtonDisabled: boolean;
  result: string;
  numberOfTries: number;
  secretNumber: number;
}

type GameActions = 
  | { type:"NEW_GAME"}
  | { type: "GUESS"; payload:number}

const  getSecretNumber = ():number => {
  const secretNumber = Math.floor(Math.random() * 100)
  return secretNumber;
}

const gameReducer = (state:GameStates,action:GameActions): GameStates => {
  if (action.type === "NEW_GAME"){
    return {
      ...state,
      newGameButtonDisabled:true,
      inputReadOnly:false,
      guessButtonDisabled:false,
      result:"A secret number has been generated, goodluck finding it",
      numberOfTries:10,
      secretNumber:getSecretNumber()
    };
  }

  return {...state};
}
const App = () => {
  const [ playerGuess,setPlayerGuess] = useState("")
  const [ gameState,dispatch] = useReducer(gameReducer,{
    newGameButtonDisabled:false,
    inputReadOnly:true,
    guessButtonDisabled:true,
    result:"Click new game to get started",
    numberOfTries: 10,
    secretNumber:0
  })

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <h2>10 Trials Remaining</h2>

      <input 
        type="text" 
        placeholder='Guess a number (0-100)'
        readOnly={gameState.inputReadOnly}
      />
      <button disabled={gameState.newGameButtonDisabled}
        onClick={() => dispatch({
          type:"NEW_GAME"
        })}
      >New Game</button>
      {gameState.result && (
        <p>{gameState.result}</p>
      )}
      <button
        disabled={gameState.guessButtonDisabled}
      >Guess</button>
    </div>
  )
}

export default App
