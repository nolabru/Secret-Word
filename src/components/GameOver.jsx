import "./GameOver.css";

const GameOver = ({ resetGame, score, logo }) => {
  return (
    <div className="restart">
      <img src={logo} alt="logo-secret-word" />
      <h4>Fim de Jogo</h4>
      <h5>
        A sua Pontuação Foi: <span>{score}</span>
      </h5>
      <p>Clique no Botão Abaixo para Reiniciar o Jogo</p>
      <button onClick={resetGame}>Reiniciar Jogo</button>
    </div>
  );
};

export default GameOver;
