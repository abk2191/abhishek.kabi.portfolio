import React from "react";

function MoreProjects() {
  const handleTryButton = (project) => {
    const links = {
      quotes: "https://abk2191.github.io/quote-react-pwa/",
      pomodoro: "https://abk2191.github.io/react-pomodoro/",
      wordle: "https://abk2191.github.io/wordle/game.html",
      memory: "https://abk2191.github.io/memory-match/",
      weather: "https://abk2191.github.io/Weather-Report/",
      iintuit: "https://iintuitlabs.vercel.app",
    };

    if (links[project]) {
      window.open(links[project], "_blank", "noopener,noreferrer");
    } else {
      console.error("Project not found:", project);
    }
  };

  return (
    <>
      <div className="more-projects-container">
        <h1 style={{ marginTop: "30px" }}>More Projects</h1>
        <div className="project-holders">
          <h2>1. Quotes (React)</h2>
          <p>
            "A simple yet elegant React-based quote generator that fetches
            inspirational quotes from a serverless API, displaying them with a
            clean, minimalist interface. Built with React hooks for state
            management and error handling, it provides users with instant
            motivation at the click of a button."
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("quotes")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
        <div className="project-holders">
          <h2>2. Pomodoro (React)</h2>
          <p>
            "This React-powered Pomodoro app helps you stay productive with
            customizable work/break timers, visual progress tracking, and sound
            alerts, all wrapped in a clean, minimalist interface."
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("pomodoro")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
        <div className="project-holders">
          <h2>3. Wordle Game (Javascript)</h2>
          <p>
            "This Wordle clone is built with vanilla JavaScript using an
            event-driven architecture that captures both keyboard and on-screen
            button inputs, processes 5-letter word guesses against a randomly
            selected target word, and provides real-time visual feedback through
            CSS animations (flip, shake, pop) with color-coded tile states
            (green for correct position, yellow for wrong position) and audio
            cues for user interactions."
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("wordle")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
        <div className="project-holders">
          <h2>4. Memory Match Game (React)</h2>
          <p>
            "This React-powered memory game challenges players to memorize a
            shuffled set of randomly generated numbers (3-7 depending on
            difficulty) displayed for a limited time (0.8-2.5 seconds), then
            recall them in ascending order by clicking on the correct grid
            positions."
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("memory")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
        <div className="project-holders">
          <h2>5. Weather Report (React)</h2>
          <p>
            "This vanilla JavaScript weather application fetches real-time
            weather data and a 5-day forecast from the OpenWeatherMap API, using
            asynchronous fetch requests with promise chaining to handle the
            sequential API calls for current conditions and extended forecasts."
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("weather")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
        <div className="project-holders">
          <h2>6. iINTUIT Labs.</h2>
          <p>
            I’ve always had an ambition to build something of my own, which is
            why I started working on an idea called iIntuit Labs. It’s a concept
            company where I experiment with building practical software products
            from scratch, including my two MVPs, Theory and Proxima. My
            long-term dream is to turn iIntuit Labs into a real product company,
            but right now I’m focused on learning, building, understanding
            users, and gaining the professional experience that will help me
            eventually make that vision a reality.
          </p>
          <div className="try-btn-div">
            <button
              className="quote-try-button"
              onClick={() => handleTryButton("iintuit")}
            >
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text"> Try</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreProjects;
