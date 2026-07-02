import { useState } from "react";
import TicTacToeGame from "./TicTacToeGame";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeString = `
  const findBestMove = (board) => {
  // 1. Check for winning move
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
  // 2. Block opponent's winning move
  // 3. Take center, corners, then edges
};
  `;

const codeString2 = `
const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];
  `;

const codeString3 = `
const [value, setValue] = useState(Array(9).fill(null));
const [history, setHistory] = useState([]);
const [gameMode, setGameMode] = useState(null); // "ai" or "twoPlayer"
  `;

function TicTacToe() {
  const [startGame, setStartGame] = useState(false);
  return (
    <>
      <div>
        {!startGame && (
          <div className="game-tech-desc">
            <h1>Tic-Tac-Toe AI - Technical Breakdown</h1>
            <p>
              The game is a React-based implementation featuring both two-player
              and AI modes with a sophisticated minimax-inspired AI strategy.
              State management uses multiple hooks including useState for board
              positions, player turns, win detection, and game history tracking.
              The AI employs a three-tier decision system: first attempting to
              win, then blocking opponent wins, and finally selecting optimal
              positions (center, corners, then edges). <br /> <br />
              Victory detection uses a predefined winning combinations array
              that checks for three-in-a-row patterns and triggers celebratory
              effects with confetti, emojis, and audio feedback. The undo system
              maintains a complete move history, allowing players to revert to
              any previous game state. All game logic is isolated in a wrapper
              component with scoped CSS, ensuring seamless integration into the
              larger portfolio application.
            </p>

            <h3 style={{ textAlign: "left" }}>AI Decision Logic</h3>

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

            <h3 style={{ textAlign: "left" }}>Win Detection</h3>

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

            <h3 style={{ textAlign: "left" }}>Game State Management</h3>

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

        {startGame && <TicTacToeGame setStartGame={setStartGame} />}
      </div>
    </>
  );
}

export default TicTacToe;
