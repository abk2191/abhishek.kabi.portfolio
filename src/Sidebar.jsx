import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  sidebarRef,
  closeSidebar,
  shouldRender,
  setShouldRender,
  setProjectsClicked,
  projectsClicked,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log("Navigating to:", path); // Debug log
    navigate(path);
    // Add a small delay before closing to ensure navigation happens
    setTimeout(() => {
      closeSidebar();
    }, 100);
  };

  const [gameMenuClicked, setGameMenuClicked] = useState(false);
  // const [projectsClicked, setProjectsClicked] = useState(false);

  const [shouldRenderGM, setShouldRenderGM] = useState(false);
  const handleProjectMenuClick = () => {
    if (!projectsClicked) {
      setShouldRender(true);
      setProjectsClicked(true);
    } else {
      setProjectsClicked(false);

      setTimeout(() => {
        setShouldRender(false);
      }, 270); // animation duration
    }
  };

  const handleGameMenuClicked = () => {
    if (!gameMenuClicked) {
      setShouldRenderGM(true);
      setGameMenuClicked(true);
    } else {
      setGameMenuClicked(false);

      setTimeout(() => {
        setShouldRenderGM(false);
      }, 500);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="sidebar"
      id="sidebar"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="sidebar-items-container">
        <div className="sidebar-items-wrapper">
          <div
            className="flex-box-one"
            onClick={() => handleNavigation("/")}
            style={{ cursor: "pointer" }}
          >
            <i class="fa-solid fa-house"></i>
            <p>Home</p>
          </div>
          <div
            className="flex-box-one"
            onClick={() => handleNavigation("/profile")}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-circle-user"></i>
            <p>Profile ✨</p>
          </div>

          <div className="flex-box-one">
            <i
              className="fa-solid fa-diagram-project"
              onClick={() => handleProjectMenuClick()}
              style={{ cursor: "pointer" }}
            ></i>
            <p
              onClick={() => handleProjectMenuClick()}
              style={{ cursor: "pointer" }}
            >
              Projects
            </p>
            <i
              className={`fa-solid fa-angle-down chevron-icon ${projectsClicked ? "rotated" : ""}`}
              style={{ marginTop: "5px", cursor: "pointer" }}
              onClick={() => handleProjectMenuClick()}
            ></i>
          </div>

          {shouldRender && (
            <div className="place-holder">
              <div className="project-section">
                <div
                  className={`app--header animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <i class="fa-brands fa-google-play gplay"></i>
                  </div>
                  <p>Apps</p>
                </div>
                <div
                  className={`menu-item-div animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  onClick={() => handleNavigation("/space")}
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                >
                  <div className="image-cont">
                    <img
                      src="/theory.png"
                      style={{ height: "52px", width: "52px" }}
                    />
                  </div>
                  <p>Theory (React Native)</p>
                </div>
                <div
                  className={`menu-item-div animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  onClick={() => handleNavigation("/proxima-calculator")}
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                >
                  <div className="image-cont-2">
                    <img
                      src="/proxima-nobg.png"
                      style={{ height: "62px", width: "62px" }}
                    />{" "}
                  </div>
                  <p>Proxima Calculator (React Native)</p>
                </div>

                {/* <div className="menu-item-div">
                  <div className="image-cont-4">
                    <img
                      src="/more.png"
                      style={{
                        height: "32px",
                        width: "32px",
                      }}
                    />
                  </div>
                  <p>More</p>
                </div> */}
                <div
                  className={`aaaaaa animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                >
                  <i
                    class="fa-solid fa-gamepad gplay"
                    onClick={() => {
                      handleGameMenuClicked();
                    }}
                  ></i>
                  <p
                    onClick={() => {
                      handleGameMenuClicked();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Games
                  </p>
                </div>
                <div
                  className={`menu-item-div animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  onClick={() => handleNavigation("/tic-tac-toe-ai")}
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                >
                  <div className="image-cont">
                    <img
                      src="/tic-tac-toe.png"
                      style={{ height: "36px", width: "36px" }}
                    />
                  </div>
                  <p>Tic-Tac-Toe AI (PWA)</p>
                </div>

                <div
                  className={`menu-item-div animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  // onClick={() => handleNavigation("/space")}
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                >
                  <div className="image-cont">
                    <img
                      src="/wordle.png"
                      style={{ height: "28px", width: "28px" }}
                    />
                  </div>
                  <p>Wordle (PWA)</p>
                </div>

                <div
                  className={`menu-item-div animate__animated ${
                    projectsClicked
                      ? "animate__slideInDown"
                      : "animate__slideOutUp"
                  }`}
                  // onClick={() => handleNavigation("/space")}
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                >
                  <div className="image-cont">
                    <img
                      src="/color-match.png"
                      style={{ height: "29px", width: "29px" }}
                    />
                  </div>
                  <p>Color-Word Match (PWA)</p>
                </div>

                {/* {shouldRenderGM && (
                  <div>
                    <div
                      className={`game-menu animate__animated ${
                        gameMenuClicked
                          ? "animate__zoomIn"
                          : "animate__slideOutUp"
                      }`}
                    >
                      <p>1. AI-TicTacToe</p>
                      <p>2. Wordle</p>
                      <p>3. Color-Word-Match</p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          )}

          <div
            className="flex-box-one"
            onClick={() => handleNavigation("/contact")}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-address-card"></i>
            <p>Contact</p>
          </div>
        </div>

        {/* <div className="game-div-wrapper">
          <div className="game-div">
            <i class="fa-solid fa-gamepad"></i>
            <div
              className="Play-Color-Match"
              onClick={() => handleNavigation("/game")}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Play Color Match
            </div>
          </div>
          
        </div> */}
        <div className="place-hldr"></div>
        {/* <div className="source-code-div-wrapper">
          <div
            className="source-code-div"
            onClick={() => handleNavigation("/sourcecode")}
            style={{ color: "navy", fontWeight: "bold" }}
          >
            <i class="fa-solid fa-code"></i>
            View Source Code
            <div className="js-react">
              <i class="fa-brands fa-js"></i>
              <i class="fa-brands fa-react"></i>
            </div>
          </div>
        </div> */}
        <div className="place-hldr"></div>
        <div className="source-code-div-wrapper-2">
          <div
            className="source-code-div"
            onClick={() => handleNavigation("/sourcecode")}
            style={{ color: "navy", fontWeight: "bold" }}
          >
            <i class="fa-solid fa-file-pdf"></i>
            Download Resume
          </div>
        </div>
        <div className="source-code-div-wrapper-2">
          <div
            className="source-code-div"
            onClick={() => handleNavigation("/sourcecode")}
            style={{ color: "navy", fontWeight: "bold" }}
          >
            <i class="fa-brands fa-github"></i>
            Github
          </div>
        </div>

        {/* <div className="resume-button-container">
          <div>
            <i
              className="fa-solid fa-file-pdf"
              style={{ fontSize: "40px" }}
            ></i>
          </div>
          <div>
            <button className="download-resume-button">
              Click here to View/Download my resume
            </button>
          </div>
        </div>

        <div className="github-link-button">
          <div>
            <i className="fa-brands fa-github" style={{ fontSize: "40px" }}></i>
          </div>
          <div>
            <button className="github-link">Check out my Github</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
