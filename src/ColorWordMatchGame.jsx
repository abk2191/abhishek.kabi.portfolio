// ColorWordMatchGame.jsx
import { useState, useEffect, useRef } from "react";

function ColorWordMatchGame({ setStartGame }) {
  const colors = [
    { name: "RED", hex: "#FF0000" },
    { name: "BLUE", hex: "#0000FF" },
    { name: "GREEN", hex: "#00FF00" },
    { name: "YELLOW", hex: "#FFFF00" },
    { name: "ORANGE", hex: "#FFA500" },
    { name: "PURPLE", hex: "#800080" },
    { name: "PINK", hex: "#FFC0CB" },
    { name: "BROWN", hex: "#A52A2A" },
    { name: "BLACK", hex: "#000000" },
    { name: "GRAY", hex: "#808080" },
    { name: "CYAN", hex: "#00FFFF" },
    { name: "MAGENTA", hex: "#FF00FF" },
    { name: "LIME", hex: "#32CD32" },
    { name: "NAVY", hex: "#000080" },
  ];

  const [word, setWord] = useState("");
  const [hex, setHex] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const [showGameDisplay, setShowGameDisplay] = useState(true);
  const [showScores, setShowScores] = useState(false);
  const [displayScores, setDisplayScores] = useState(false);
  const [scoreStorage, setScoreStorage] = useState(() => {
    const saved = localStorage.getItem("colorword_scores");
    return saved ? JSON.parse(saved) : [];
  });

  const intervalRef = useRef(null);
  const gameTimerRef = useRef(null);
  const scoreRef = useRef(0);
  const endedRef = useRef(false);

  useEffect(() => {
    localStorage.setItem("colorword_scores", JSON.stringify(scoreStorage));
  }, [scoreStorage]);

  const handleDisplayScores = () => {
    setDisplayScores(false);
    setShowScores((prev) => !prev);
  };

  function getWord() {
    if (!gameActive) return;

    const shouldMatch = Math.random() < 0.4;
    const i = Math.floor(Math.random() * colors.length);
    const word = colors[i].name;
    setWord(word);
    let hex;

    if (shouldMatch) {
      hex = colors[i].hex;
    } else {
      let j;
      do {
        j = Math.floor(Math.random() * colors.length);
      } while (j === i);
      hex = colors[j].hex;
    }

    setHex(hex);
    setAnswered(false);
  }

  const resetInterval = () => {
    if (!gameActive) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!answered && gameActive) {
        setScore((prev) => Math.max(0, prev - 1));
        setFeedback("👎");
        setShowFeedback(true);
        setAnswered(true);

        setTimeout(() => {
          if (!gameActive) return;
          setShowFeedback(false);
          setTimeout(() => {
            if (!gameActive) return;
            setFeedback(null);
            getWord();
            if (!gameActive) return;
            resetInterval();
          }, 100);
        }, 1000);
      }
    }, 5000);
  };

  function handleAnswer(answer) {
    if (!gameActive) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const match = colors.some((c) => c.name === word && c.hex === hex);

    const isCorrect =
      (answer === "yes" && match) || (answer === "no" && !match);

    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 1;
        scoreRef.current = newScore;
        return newScore;
      });
      setFeedback("👍");
    } else {
      setScore((prev) => {
        const newScore = Math.max(0, prev - 1);
        scoreRef.current = newScore;
        return newScore;
      });
      setFeedback("👎");
    }

    setShowFeedback(true);
    setAnswered(true);

    setTimeout(() => {
      if (!gameActive) return;
      setShowFeedback(false);
      setTimeout(() => {
        if (!gameActive) return;
        setFeedback(null);
        getWord();
        if (!gameActive) return;
        resetInterval();
      }, 100);
    }, 1000);
  }

  const startGameTimer = () => {
    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime < 1) {
          setShowGameDisplay(false);
          setTimeout(() => {
            endGame();
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (endedRef.current) return;
    endedRef.current = true;

    setScoreStorage((prev) => [...prev, scoreRef.current]);
    setGameActive(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
  };

  const restartGame = () => {
    endedRef.current = false;
    setScore(0);
    setTimeLeft(60);
    setGameActive(true);
    setFeedback(null);
    setShowFeedback(false);
    setAnswered(false);
    setShowGameDisplay(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }

    getWord();
    resetInterval();
    startGameTimer();
  };

  useEffect(() => {
    getWord();
    resetInterval();
    startGameTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, []);

  const showScore = () => {
    setTimeout(() => {
      setShowScores((prev) => !prev);
      setDisplayScores(true);
    }, 150);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Back Button - Matching Yes/No button style */}

        <div className="game-area">
          <div className="game-area-parts-word">
            {showGameDisplay && (
              <div className="game-display" style={{ textAlign: "center" }}>
                <div className="timer-div">
                  <p
                    style={{
                      fontSize: "20px",
                      margin: "10px 0",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      color: timeLeft <= 10 ? "#ff4444" : "#4a90e2",
                    }}
                  >
                    ⏱️ Time: {timeLeft}s
                  </p>
                </div>

                <h1
                  style={{
                    color: hex,
                    fontSize: "64px",
                    margin: "30px 0",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: "2px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {word}
                </h1>

                <div className="feedback-div">
                  <p
                    style={{
                      fontSize: "72px",
                      margin: "20px 0",
                      minHeight: "100px",
                    }}
                    className={showFeedback ? "feedback-animation" : ""}
                  >
                    {feedback}
                  </p>
                </div>

                <div className="score-div">
                  <p
                    style={{
                      fontSize: "24px",
                      margin: "10px 0",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "bold",
                      color: "#4a90e2",
                    }}
                  >
                    Score: {score}
                  </p>
                </div>
              </div>
            )}

            {!gameActive && (
              <div className="game-over" style={{ textAlign: "center" }}>
                <button
                  className="pushable"
                  onClick={showScore}
                  style={{ marginBottom: "20px" }}
                >
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front"> Scores </span>
                </button>

                {displayScores && (
                  <div
                    className="backdrop"
                    onClick={handleDisplayScores}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    {showScores && (
                      <div
                        className="scores-div"
                        style={{
                          backgroundColor: "white",
                          padding: "30px",
                          borderRadius: "15px",
                          maxWidth: "400px",
                          width: "90%",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        }}
                      >
                        {scoreStorage.length > 0 &&
                          (() => {
                            const highestScore = Math.max(...scoreStorage);

                            return (
                              <div className="score-history">
                                <h3
                                  style={{
                                    color: "#4a90e2",
                                    textAlign: "center",
                                    marginBottom: "20px",
                                  }}
                                >
                                  SCORES:
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                  {scoreStorage.map((storedScore, index) => (
                                    <div className="list-div" key={index}>
                                      <li
                                        style={{
                                          color:
                                            storedScore === highestScore
                                              ? "#4a90e2"
                                              : "#666",
                                          padding: "8px",
                                          borderBottom: "1px solid #eee",
                                          fontWeight:
                                            storedScore === highestScore
                                              ? "bold"
                                              : "normal",
                                          textAlign: "center",
                                        }}
                                      >
                                        Game {index + 1}: {storedScore}{" "}
                                        {storedScore === highestScore && "🏆"}
                                      </li>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            );
                          })()}
                      </div>
                    )}
                  </div>
                )}

                <h2
                  style={{
                    color: "#333",
                    marginBottom: "15px",
                    fontSize: "32px",
                  }}
                >
                  Game Over!
                </h2>
                <p
                  style={{
                    fontSize: "28px",
                    marginBottom: "30px",
                    fontWeight: "bold",
                    color: "#4a90e2",
                  }}
                >
                  Final Score: {scoreRef.current}
                </p>

                <div
                  className="game-btns"
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="pushable"
                    onClick={restartGame}
                    style={{ marginTop: "10px" }}
                  >
                    <span className="shadow"></span>
                    <span
                      className="edge"
                      style={{
                        background:
                          "linear-gradient(to right, hsl(120, 39%, 39%) 0%, hsl(120, 39%, 49%) 8%, hsl(120, 39%, 39%) 92%, hsl(120, 39%, 29%) 100%)",
                      }}
                    ></span>
                    <span
                      className="front"
                      style={{ background: "hsl(120, 53%, 58%)" }}
                    >
                      Play Again
                    </span>
                  </button>
                  <button
                    className="pushable"
                    onClick={() => setStartGame(false)}
                    style={{ marginTop: "10px" }}
                  >
                    <span className="shadow"></span>
                    <span
                      className="edge"
                      style={{
                        background:
                          "linear-gradient(to right, hsl(0, 39%, 39%) 0%, hsl(0, 39%, 49%) 8%, hsl(0, 39%, 39%) 92%, hsl(0, 39%, 29%) 100%)",
                      }}
                    ></span>
                    <span
                      className="front"
                      style={{ background: "hsl(0, 53%, 58%)" }}
                    >
                      End Game
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {gameActive && (
            <div
              className="game-area-parts-button"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <div
                className="yes-and-no-btn-div"
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <button
                  className="pushable"
                  onClick={() => handleAnswer("yes")}
                >
                  <span className="shadow"></span>
                  <span
                    className="edge"
                    style={{
                      background:
                        "linear-gradient(to right, hsl(120, 39%, 39%) 0%, hsl(120, 39%, 49%) 8%, hsl(120, 39%, 39%) 92%, hsl(120, 39%, 29%) 100%)",
                    }}
                  ></span>
                  <span
                    className="front"
                    style={{ background: "hsl(120, 53%, 58%)" }}
                  >
                    {" "}
                    YES{" "}
                  </span>
                </button>
                <button className="pushable" onClick={() => handleAnswer("no")}>
                  <span className="shadow"></span>
                  <span
                    className="edge"
                    style={{
                      background:
                        "linear-gradient(to right, hsl(0, 39%, 39%) 0%, hsl(0, 39%, 49%) 8%, hsl(0, 39%, 39%) 92%, hsl(0, 39%, 29%) 100%)",
                    }}
                  ></span>
                  <span
                    className="front"
                    style={{ background: "hsl(0, 53%, 58%)" }}
                  >
                    {" "}
                    NO{" "}
                  </span>
                </button>
              </div>
              <button
                className="color-game-back-button"
                onClick={() => setStartGame(false)}
                style={{ marginTop: "30px" }}
              >
                <i class="fa-solid fa-xmark"></i> End Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorWordMatchGame;
