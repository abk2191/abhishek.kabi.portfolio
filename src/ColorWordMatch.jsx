// ColorWordMatch.jsx
import { useState } from "react";
import ColorWordMatchGame from "./ColorWordMatchGame";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString = `
const shouldMatch = Math.random() < 0.4;
const i = Math.floor(Math.random() * colors.length);
const word = colors[i].name;
let hex;

if (shouldMatch) {
  hex = colors[i].hex; // Word matches its color
} else {
  let j;
  do {
    j = Math.floor(Math.random() * colors.length);
  } while (j === i);
  hex = colors[j].hex; // Word mismatches its color
}
  `;

const codeString2 = `
// Handle user answer
function handleAnswer(answer) {
  const match = colors.some((c) => c.name === word && c.hex === hex);
  const isCorrect = (answer === "yes" && match) || (answer === "no" && !match);
  
  if (isCorrect) {
    setScore(prev => prev + 1);  // Correct: +1 point
  } else {
    setScore(prev => Math.max(0, prev - 1));  // Wrong: -1 point
  }
}
  `;

const codeString3 = `
// Timer and game logic
useEffect(() => {
  // 5-second timer for each question
  intervalRef.current = setInterval(() => {
    if (!answered && gameActive) {
      setScore(prev => Math.max(0, prev - 1));  // Timeout penalty
      setFeedback("👎");
      setAnswered(true);
      // Get new word after feedback
    }
  }, 5000);
}, []);
  `;

function ColorWordMatch() {
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      <div>
        {!startGame && (
          <div className="game-tech-desc">
            <h1>Color-Word Match - Technical Breakdown</h1>
            <p>
              The Color-Word Match game is a React-based cognitive challenge
              inspired by the Stroop effect, where players must determine if the
              displayed word matches its color. The game features a 60-second
              timer with dynamic difficulty, scoring system, and local storage
              for high scores.
              <br />
              <br />
              The game generates random color-word pairs where 40% of the time
              the word matches its color and 60% of the time it doesn't. Players
              must quickly respond "Yes" or "No" within a 5-second window.
              Correct answers earn +1 point, while wrong answers or timeout
              penalties deduct 1 point. The game tracks scores and displays the
              highest score achieved across all sessions.
              <br />
              <br />
              State management includes React hooks for score tracking, timer
              management, game state, and localStorage persistence. The UI
              features a clean, responsive design with animated feedback for
              correct/incorrect answers.
            </p>

            <h3 style={{ textAlign: "left" }}>Color Matching Logic</h3>

            <div className="game-code">
              <SyntaxHighlighter
                language="javascript"
                customStyle={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>

            <h3 style={{ textAlign: "left" }}>Scoring System</h3>

            <div className="game-code">
              <SyntaxHighlighter
                language="javascript"
                customStyle={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {codeString2}
              </SyntaxHighlighter>
            </div>

            <h3 style={{ textAlign: "left" }}>Timer & Game Management</h3>

            <div className="game-code">
              <SyntaxHighlighter
                language="javascript"
                customStyle={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {codeString3}
              </SyntaxHighlighter>
            </div>

            <div className="get-button">
              <button
                className="contactButton"
                onClick={() => setStartGame(true)}
              >
                Play Game
                <div className="iconButton">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {startGame && <ColorWordMatchGame setStartGame={setStartGame} />}
      </div>
    </>
  );
}

export default ColorWordMatch;
