import "./project-styles.css";
import { useState, useEffect, useRef } from "react";
import DownloadPage from "./DownloadPage";

function Andromeda({
  currentTheme,
  setShowDownloadPage,
  setCurrentButtonId,
  currentButtonID,
  showDownloadPage,
  setTryButtonClicked,
  tryButtonClicked,
}) {
  const carouselImageUrls = [
    "/white-banner.jpg",
    "/banner-dark.jpg",
    "/andromeda-notes-one.jpg",
    "/andromeda-notes-two.jpg",
    "/andromeda-todo.jpg",
    "/andromeda-todo-two.jpg",
    "/draw-1.jpg",
    "/draw-2.jpg",
    "/andromeda-calendar-month.jpg",
    "/andromeda-calendar-year.jpg",
    "/andromeda-screenshot-mindmap.jpg",
    "/andromeda-screenshot-mindmap-two.jpg",
  ];

  const [imageId, setImageId] = useState(1);
  const [buttonId, setButtonId] = useState("");
  const [current, setCurrent] = useState(0);
  const [homeScreenVisible, setHomeScreenVisible] = useState(true);
  const refs = useRef([]);

  const handleHomeClick = (id) => {
    id === "icon" ? setHomeScreenVisible(false) : setHomeScreenVisible(true);
  };

  const handleButtonClick = (id) => {
    id === "left"
      ? setImageId((prev) => (prev > 1 ? prev - 1 : prev))
      : setImageId((prev) => (prev < 12 ? prev + 1 : prev));

    id === "left" ? setButtonId("left") : setButtonId("right");
  };

  const handleClick = (id) => {
    setShowDownloadPage(true);
    setCurrentButtonId(id);
    setTryButtonClicked(id);
  };

  const moveRight = () => {
    setImageId((prev) => prev + 1);
    const next = Math.min(current + 1, carouselImageUrls.length - 1);

    setCurrent(next);

    refs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const moveLeft = () => {
    setImageId((prev) => prev - 1);
    const prev = Math.max(current - 1, 0);

    setCurrent(prev);

    refs.current[prev]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };
  return (
    <>
      {!showDownloadPage && (
        <div className="andromeda-wrapper">
          <div className="andromeda-banner">
            <img src="/theory.png" style={{ height: "75px", width: "75px" }} />
            <h2>Theory</h2>
          </div>
          <div className="carousal-div">
            <div className="overlayy">
              {imageId > 1 && !homeScreenVisible ? (
                <button className="carousal-button" onClick={() => moveLeft()}>
                  <i class="fa-solid fa-angle-left"></i>
                </button>
              ) : (
                <div style={{ marginRight: "30px" }}></div>
              )}{" "}
              <div className="holder">
                <div className="carousal-inner">
                  {homeScreenVisible ? (
                    <div
                      className="homescreen-phone"
                      onClick={() => handleHomeClick("icon")}
                    ></div>
                  ) : (
                    carouselImageUrls.map((url, index) => (
                      <div
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        className={`carousal-images${index === 0 ? "" : `-${index + 1}`}`}
                      />
                    ))
                  )}
                </div>{" "}
                <div className="phone-nav">
                  <div className="nav-icon-holder">
                    <i class="fa-solid fa-bars"></i>
                    <i class="fa-regular fa-circle"></i>
                    <i
                      class="fa-solid fa-angle-left"
                      onClick={() => handleHomeClick("back")}
                    ></i>
                  </div>
                </div>
              </div>
              {imageId < 12 && !homeScreenVisible ? (
                <button className="carousal-button" onClick={() => moveRight()}>
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              ) : (
                <div style={{ marginRight: "28px" }}></div>
              )}
            </div>
          </div>

          <div className="get-button">
            <button
              className="contactButton"
              onClick={() => handleClick("theory")}
            >
              Try Theory.
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
      {showDownloadPage && (
        <DownloadPage
          showDownloadPage={showDownloadPage}
          setShowDownloadPage={setShowDownloadPage}
          currentButtonID={currentButtonID}
          setCurrentButtonId={setCurrentButtonId}
          tryButtonClicked={tryButtonClicked}
        />
      )}
    </>
  );
}

export default Andromeda;
