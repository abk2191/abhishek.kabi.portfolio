// TicTacToeGame.jsx
import { useState, useRef, useEffect } from "react";
import Theboard from "./Theboard";
import Confetti from "react-confetti";

function TicTacToeGame({ setStartGame }) {
  const [xPlayed, setXPlayed] = useState(true);
  const [value, setValue] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("Player");
  const [winner, setWinner] = useState(null);
  const [winningIndexes, setWinningIndexes] = useState([]);
  const [history, setHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [randomEmoji, setRandomEmoji] = useState("");
  const [celebrationText, setCelebrationText] = useState("");
  const [gameMode, setGameMode] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);

  const audioRef = useRef(null);
  const losingAudioRef = useRef(null);
  const emojis = ["😊", "🥰", "😇"];
  const losingEmojis = ["😭", "🥶", "🤯", "😰"];
  const losingTexts = [
    "Try again",
    "Darn it",
    "Better Luck Next Time",
    "Try Harder",
  ];

  // Initialize game with random first turn for AI mode
  const initializeGame = (mode) => {
    setValue(Array(9).fill(null));
    setWinner(null);
    setWinningIndexes([]);
    setHistory([]);
    setShowConfetti(false);
    setShowEmoji(false);
    setAiThinking(false);
    setGameMode(mode);

    if (mode === "ai") {
      const playerGoesFirst = Math.random() > 0.5;
      setXPlayed(playerGoesFirst);
      setPlayer(playerGoesFirst ? "Player" : "AI");

      if (!playerGoesFirst) {
        setAiThinking(true);
        setTimeout(() => {
          const bestMove = findBestMove(Array(9).fill(null));
          if (bestMove !== -1) {
            handleFirstAIMove(bestMove);
          }
          setAiThinking(false);
        }, 800);
      }
    } else {
      setXPlayed(true);
      setPlayer("X");
    }
  };

  const handleFirstAIMove = (index) => {
    const newValue = Array(9).fill(null);
    newValue[index] = "O";

    setHistory((prev) => [
      ...prev,
      {
        board: Array(9).fill(null),
        xPlayed: false,
        player: "AI",
        winner: null,
        winningIndexes: [],
      },
    ]);

    setValue(newValue);
    setPlayer("Player");
    setXPlayed(true);
  };

  const makeAIMove = (currentBoard) => {
    setAiThinking(true);
    setTimeout(() => {
      const bestMove = findBestMove([...currentBoard]);
      if (bestMove !== -1) {
        handleAIMove(bestMove, currentBoard);
      }
      setAiThinking(false);
    }, 800);
  };

  const handleAIMove = (index, currentBoard) => {
    if (currentBoard[index] || winner) return;

    const newValue = [...currentBoard];
    newValue[index] = "O";

    setHistory((prev) => [
      ...prev,
      {
        board: [...currentBoard],
        xPlayed: false,
        player: "AI",
        winner: winner,
        winningIndexes: [...winningIndexes],
      },
    ]);

    setValue(newValue);
    setPlayer("Player");
    setXPlayed(true);

    const gameWinner = calculatewinner(newValue);
    if (gameWinner) {
      const winnerName = gameWinner === "X" ? "Player" : "AI";
      setWinner(winnerName);
      setShowConfetti(true);

      if (winnerName === "AI") {
        const randomIndex = Math.floor(Math.random() * losingEmojis.length);
        setRandomEmoji(losingEmojis[randomIndex]);
        const randomText =
          losingTexts[Math.floor(Math.random() * losingTexts.length)];
        setCelebrationText(randomText);
        if (losingAudioRef.current) {
          losingAudioRef.current.currentTime = 0;
          losingAudioRef.current.play();
        }
      } else {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        setRandomEmoji(emojis[randomIndex]);
        const texts = [
          "Amazing!",
          "Incredible!",
          "Brilliant!",
          "Well Played!",
          "Fantastic!",
        ];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        setCelebrationText(randomText);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }

      setShowEmoji(true);
      setTimeout(() => {
        setShowEmoji(false);
      }, 2000);
    } else if (newValue.every((cell) => cell !== null)) {
      setWinner("Draw");
    }
  };

  const updateBoard = (index) => {
    if (value[index] || winner || aiThinking) return;

    setHistory((prev) => [
      ...prev,
      {
        board: [...value],
        xPlayed: xPlayed,
        player: player,
        winner: winner,
        winningIndexes: [...winningIndexes],
      },
    ]);

    const newValue = [...value];
    newValue[index] = xPlayed ? "X" : "O";

    const gameWinner = calculatewinner(newValue);
    if (gameWinner) {
      const winnerName =
        gameMode === "twoPlayer"
          ? gameWinner
          : gameWinner === "X"
            ? "Player"
            : "AI";

      setWinner(winnerName);
      setShowConfetti(true);

      if (gameMode === "ai" && winnerName === "AI") {
        const randomIndex = Math.floor(Math.random() * losingEmojis.length);
        setRandomEmoji(losingEmojis[randomIndex]);
        const randomText =
          losingTexts[Math.floor(Math.random() * losingTexts.length)];
        setCelebrationText(randomText);
        if (losingAudioRef.current) {
          losingAudioRef.current.currentTime = 0;
          losingAudioRef.current.play();
        }
      } else {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        setRandomEmoji(emojis[randomIndex]);
        const texts = [
          "Amazing!",
          "Incredible!",
          "Brilliant!",
          "Well Played!",
          "Fantastic!",
        ];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        setCelebrationText(randomText);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }

      setShowEmoji(true);
      setTimeout(() => {
        setShowEmoji(false);
      }, 2000);

      setValue(newValue);
      if (gameMode === "twoPlayer") {
        setPlayer(xPlayed ? "O" : "X");
      } else {
        setPlayer(xPlayed ? "AI" : "Player");
      }
      setXPlayed(!xPlayed);
    } else if (newValue.every((cell) => cell !== null)) {
      setWinner("Draw");
      setValue(newValue);
      if (gameMode === "twoPlayer") {
        setPlayer(xPlayed ? "O" : "X");
      } else {
        setPlayer(xPlayed ? "AI" : "Player");
      }
      setXPlayed(!xPlayed);
    } else {
      setValue(newValue);

      if (gameMode === "ai" && !gameWinner) {
        setPlayer("AI");
        setXPlayed(false);
        makeAIMove(newValue);
      } else {
        if (gameMode === "twoPlayer") {
          setPlayer(xPlayed ? "O" : "X");
        } else {
          setPlayer(xPlayed ? "AI" : "Player");
        }
        setXPlayed(!xPlayed);
      }
    }
  };

  const checkWinnerForAI = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const findBestMove = (board) => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        if (checkWinnerForAI(board) === "O") {
          board[i] = null;
          return i;
        }
        board[i] = null;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        if (checkWinnerForAI(board) === "X") {
          board[i] = null;
          return i;
        }
        board[i] = null;
      }
    }

    if (board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter((i) => board[i] === null);
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    return -1;
  };

  const calculatewinner = (value) => {
    setWinningIndexes([]);

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        setWinningIndexes([a, b, c]);
        return value[a];
      }
    }
    return null;
  };

  const undoMove = () => {
    if (history.length === 0 || aiThinking) return;

    const lastState = history[history.length - 1];
    setValue(lastState.board);
    setXPlayed(lastState.xPlayed);
    setPlayer(lastState.player);
    setWinner(lastState.winner);
    setWinningIndexes(lastState.winningIndexes);
    setHistory((prev) => prev.slice(0, -1));
  };

  const restartGame = () => {
    if (gameMode === "ai") {
      initializeGame("ai");
    } else {
      setValue(Array(9).fill(null));
      setXPlayed(true);
      setPlayer("X");
      setWinner(null);
      setWinningIndexes([]);
      setHistory([]);
      setShowConfetti(false);
      setShowEmoji(false);
      setAiThinking(false);
    }
  };

  const startGameWithMode = (mode) => {
    if (mode === "ai") {
      initializeGame("ai");
    } else {
      setValue(Array(9).fill(null));
      setXPlayed(true);
      setPlayer("X");
      setWinner(null);
      setWinningIndexes([]);
      setHistory([]);
      setShowConfetti(false);
      setShowEmoji(false);
      setAiThinking(false);
      setGameMode(mode);
    }
  };

  const backToMenu = () => {
    setValue(Array(9).fill(null));
    setXPlayed(true);
    setPlayer("X");
    setWinner(null);
    setWinningIndexes([]);
    setHistory([]);
    setShowConfetti(false);
    setShowEmoji(false);
    setAiThinking(false);
    setGameMode(null);
  };

  useEffect(() => {
    if (!winner) {
      setShowConfetti(false);
    }
  }, [winner]);

  const getDisplayText = () => {
    if (winner === "Draw") {
      return "It's a Draw! 🤝";
    } else if (winner) {
      if (gameMode === "twoPlayer") {
        return `${winner} Wins!`;
      } else {
        return `${winner} Wins!`;
      }
    } else {
      if (gameMode === "twoPlayer") {
        return `${player}'s Turn`;
      } else {
        return `${player}'s Turn`;
      }
    }
  };

  return (
    <>
      <div className="tic-tac-toe-wrapper">
        <audio ref={losingAudioRef} src="./fail.mp3" preload="auto" />
        <audio ref={audioRef} src="./winner-sound.mp3" preload="auto" />

        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={150}
            gravity={0.15}
            wind={0}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
            }}
          />
        )}

        {showEmoji && (
          <div className="emoji-celebration">
            <span className="emoji">{randomEmoji}</span>
            <div className="celebration-text">{celebrationText}</div>
          </div>
        )}

        <div className="wrapper">
          <div className="banner">
            <h2
              style={{
                fontFamily: "Amarante, serif",
              }}
              className="gradient-text"
            >
              Classic Tic-Tac-Toe
            </h2>
          </div>

          {!gameMode ? (
            <div className="mode-selection-container">
              <div className="mode-buttons">
                <button
                  onClick={() => startGameWithMode("twoPlayer")}
                  className="mode-button two-player-button"
                >
                  Two Player Game
                </button>
                <button
                  onClick={() => startGameWithMode("ai")}
                  className="mode-button ai-button"
                >
                  Play with AI
                </button>
                <button
                  onClick={() => setStartGame(false)}
                  style={{
                    color: "greenyellow",
                    border: "none",
                    background: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                >
                  <i class="fa-solid fa-xmark"></i> Close Game
                </button>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="game-header">
                <button onClick={backToMenu} className="back-button">
                  Back to Menu
                </button>
              </div>

              <p style={{ fontFamily: "Inter, sans-serif", color: "white" }}>
                {getDisplayText()}
              </p>
              <Theboard
                updateBoard={updateBoard}
                value={value}
                winningIndexes={winningIndexes}
                disabled={aiThinking || (gameMode === "ai" && player === "AI")}
              />
              <button
                onClick={undoMove}
                disabled={history.length === 0 || aiThinking}
                className="undo-button"
              >
                Undo Move ({history.length} moves)
              </button>
              <button onClick={restartGame} className="restart-button">
                Restart Game
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TicTacToeGame;
