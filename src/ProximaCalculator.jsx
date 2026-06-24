import "./project-styles.css";
import { useState, useEffect, useRef } from "react";
import DownloadPage from "./DownloadPage";

function ProximaCalculator({
  setShowDownloadPage,
  setCurrentButtonId,
  currentButtonID,
  showDownloadPage,
  setTryButtonClicked,
  tryButtonClicked,
}) {
  // const [downloadPage, setDownloadPage] = useState(false);
  // const [buttonID, setButtonId] = useState("");
  const [homeScreenVisible, setHomeScreenVisible] = useState(true);
  const [imageId, setImageId] = useState(1);
  const [buttonId, setButtonId] = useState("");
  const [current, setCurrent] = useState(0);
  const refs = useRef([]);

  const carouselImageUrls = [
    "/calculator-1.jpg",
    "/calculator-2.jpg",
    "/calc-hist-1.jpg",
    "/calc-hist-2.jpg",
    "/calc-modes.jpg",
    "/calc-age-calc.jpg",
    "/calc-perc-1.jpg",
    "/calc-perc-2.jpg",
    "/calculator-dark.jpg",
    "/Screenshot_20260420_111007_Chrome.jpg",
    "/calc-hist-1.jpg",
    "/calc-modes.jpg",
  ];

  const handleHomeClick = (id) => {
    id === "icon" ? setHomeScreenVisible(false) : setHomeScreenVisible(true);
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
            <img
              src="./proxima-nobg.png"
              style={{ height: "75px", width: "75px" }}
            />

            <h2>Proxima Calculator</h2>
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
                    <div className="homescreen-phone">
                      <img
                        src="/proxima-nobg-Copy.png"
                        style={{ height: "70px", width: "70px" }}
                        onClick={() => handleHomeClick("icon")}
                      />
                    </div>
                  ) : (
                    carouselImageUrls.map((url, index) => (
                      <div
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        className={`carousal-images-proxima${index === 0 ? "" : `-${index + 1}`}`}
                      />
                    ))
                  )}
                </div>{" "}
                <div className="phone-nav">
                  <div className="nav-icon-holder">
                    <i class="fa-solid fa-bars"></i>
                    <i
                      class="fa-regular fa-circle"
                      onClick={() => handleHomeClick("back")}
                    ></i>
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
            <button className="contactButton" onClick={() => handleClick("PC")}>
              Try Proxima Calculator
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
          // buttonID={buttonID}
          // setDownloadPage={setDownloadPage}
          // currentButtonID={buttonID}
          // setCurrentButtonId={setButtonId}
          // setShowDownloadPage={setDownloadPage}
          // setButtonId={setButtonId}
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

export default ProximaCalculator;
