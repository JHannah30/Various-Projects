import { useEffect, useState } from 'react';
import './App.css';
import StartScreen from '../StartScreen/StartScreen';
import GameScreen from '../GameScreen/GameScreen';

// Playing card images
import playingCard0 from '../Images/card-0-lightMode.png';
import playingCard1 from '../Images/card-1-lightMode.png';
import playingCard2 from '../Images/card-2-lightMode.png';
import playingCard3 from '../Images/card-3-lightMode.png';
import playingCard4 from '../Images/card-4-lightMode.png';
import playingCard5 from '../Images/card-5-lightMode.png';
import playingCard6 from '../Images/card-6-lightMode.png';
import playingCard7 from '../Images/card-7-lightMode.png';
import playingCard8 from '../Images/card-8-lightMode.png';
import playingCard9 from '../Images/card-9-lightMode.png';
import playingCard10 from '../Images/card-10-lightMode.png';
import playingCard11 from '../Images/card-11-lightMode.png';

function App() {
  
  // Game structure:
  //   - player starts game by pressing start button
  //     - button generates random number on click and stores value in state
  //     - that state value is displayed on the screen (middle card)

  //   - player can now decide if they want to go higher or lower 
  //     - lower button generates another random number 
  //       - if the new value is lower than the current value, player wins/continues
  //       - if the new number is higher than the current value, player loses and game ends
  //       - if the number is the same, try again
  //     - higher button generates another random number 
  //       - if the new value is higher than the current value, player wins/continues
  //       - if the new number is lower than the current value, player loses and game ends
  //       - if the number is the same, try again
  //     - game ends 
  //       - player can click button to play again 
  //         - game begins again 
  //         - resets all variables except for the high score 


  // Page structure:
  //   - Title
  //   - Game start button (disappear after clicked)
  //   - Number being displayed 
  //   - Higher/Lower buttons
  //   - Win/Lose announcement 
  //   - Winning streak/High score displayed
  //   - Previous numbers displayed 

  // Hide/Show game screen
  const [hideGameScreen, setHideGameScreen] = useState(true);

  // Triggers CSS transitioning to move between pages
  const [screenTransition, setScreenTransition] = useState(false);

  // Game numbers being displayed on screen
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumber, setPreviousNumber] = useState("");
  // const [pastNumbersList, setPastNumbersList] = useState([]);
  const [score, setScore] = useState(0);
  
  // Result announcement after each round
  const [result, setResult] = useState("");
  
  // Images of playing cards that will be rendered according to the number being displayed
  const cards = [
    playingCard0,
    playingCard1,
    playingCard2,
    playingCard3,
    playingCard4,
    playingCard5,
    playingCard6,
    playingCard7,
    playingCard8,
    playingCard9,
    playingCard10,
    playingCard11,
  ];

  // Triggers CSS transitioning to move between pages
  const handleScreenTransition = () => {
    setScreenTransition(true);
    setTimeout(() => {
      setScreenTransition(false)
    }, 2000);
  }

  const handleGameReset = () => {
    setPreviousNumber("");
    setCurrentNumber("");
    // setPastNumbersList("");
    setScore(0);
    setResult("");
  }

  const getRandomNumber = () => {
    let random = Math.floor( Math.random() * 10 ) + 1;
    return random;
  }

  // When the 'start' button is clicked, the start screen begins to fade out and the game screen fades in. A random number is also generated.
  const handleGameStart = () => {
    handleScreenTransition();
    setTimeout(() => {
      setHideGameScreen(false)
      setCurrentNumber(getRandomNumber());
    }, 1000);
  }


  // When user exits the game by clicking the 'back' button, the game screen fades out, the game is reset and the start screen is visible again
  const handleGameExit = () => {
    handleScreenTransition();
    setTimeout(() => {
      setHideGameScreen(true)
      handleGameReset();
    }, 1000);
  }

  const handleHigher = () => {
    setPreviousNumber(currentNumber);
    setCurrentNumber(getRandomNumber());
    
    if(previousNumber < currentNumber){
      setResult("win")
      setScore(score + 1);
    } else if (previousNumber === currentNumber){
      setResult("draw")
    } else {
      setResult("lose")
      setScore(0);
    }
  }

  const handleLower = () => {
    setPreviousNumber(currentNumber);
    setCurrentNumber(getRandomNumber());

    if(previousNumber > currentNumber){
      setResult("win")
      setScore(score + 1);
    } else if (previousNumber === currentNumber){
      setResult("draw");
    } else {
      setResult("lose")
      setScore(0);
    }
  }

  useEffect(() => {
    console.log("CurrentNumber is " + currentNumber);
    console.log("PreviousNumber is " + previousNumber);
  }, [currentNumber]);

  return (
    <div className={screenTransition === true ? "fadeOutAndIn" : "empty"}>
      { hideGameScreen && <StartScreen startGame={handleGameStart} /> }
      { !hideGameScreen && <GameScreen 
        previousNumber={previousNumber}
        currentNumber={currentNumber}
        placeholderCard={cards[11]}
        previousCard={cards[previousNumber]}
        currentCard={cards[currentNumber]}
        guessCard={cards[0]}
        score={score}
        result={result}
        handleHigher={handleHigher}
        handleLower={handleLower}
        exitGame={handleGameExit}
      /> }
    </div>
  );
}

export default App;