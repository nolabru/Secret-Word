import "./StartScreen.css";

const StartScreen = ({ playGame, logo }) => {
  return (
    <div className="start">
      <img src={logo} alt="logo-secret-word" />
      <p>Clique no Botão Abaixo para Começar a Jogar</p>
      <button onClick={playGame}>Começar o Jogo</button>
    </div>
  );
};

export default StartScreen;
