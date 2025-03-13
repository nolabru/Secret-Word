// Css
import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// Images
import logo from "./assets/logo.png";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Data
import { wordsList } from "./data/Words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState([]);
  const [pickedCategory, setPickedCategory] = useState([]);
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    
    // Pick a Random Category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Pick a Random Word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, []);

  // Starts The Secret Word Game
  const playGame = useCallback(() => {

    // Pick Word and Category
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, []);

  // Process The Letter Input
  const verifyLetter = (letter) => {

    // Check if Letter Has Alredy Been Utilized
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return;
    }

    // Push Guessed Letter or Remove a Guess
    if (letters.includes(letter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, letter]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuesses(guessesQty);
    setScore(0);
  };

  // Check Loss Condition
  useEffect(() => {
    if (guesses <= 0) {
      setWrongLetters([]);
      setGuessedLetters([]);
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Check Win Condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      setScore((prevScore) => (prevScore += 100));

      // Restart The Game
      playGame();
      setGuessedLetters([]);
      setWrongLetters([]);
      setGuesses(guessesQty);
    }
  }, [guessedLetters]);

  const resetGame = () => {
    setGameStage(stages[0].name);
    clearLetterStates();
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen logo={logo} playGame={playGame} />}
      {gameStage === "game" && (
        <Game
          logo={logo}
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && (
        <GameOver score={score} logo={logo} resetGame={resetGame} />
      )}
    </div>
  );
}

export default App;
