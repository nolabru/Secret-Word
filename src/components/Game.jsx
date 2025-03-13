import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  logo,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <img src={logo} alt="" />
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h3 className="tip">
        Dica Sobre a Palavra:
        <span>{pickedCategory}</span>
      </h3>
      <p className="guesses">
        Você Ainda Tem <span>{guesses}</span> Tentativas
      </p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente Adivinhar Uma Letra da Palavra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(event) => setLetter(event.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras Erradas</p>
        <div>
          {wrongLetters.map((wrongLetter, i) => (
            <span key={i}>{wrongLetter}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
