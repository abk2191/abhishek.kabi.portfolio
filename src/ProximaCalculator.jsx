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
  const [homeScreenVisible, setHomeScreenVisible] = useState(true);
  const [imageId, setImageId] = useState(1);
  const [buttonId, setButtonId] = useState("");
  const [current, setCurrent] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const refs = useRef([]);
  const carouselRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

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
    // Reset imageId when going back to homescreen
    if (id === "back") {
      setImageId(1);
      setCurrent(0);
    }
  };

  const handleClick = (id) => {
    setShowDownloadPage(true);
    setCurrentButtonId(id);
    setTryButtonClicked(id);
  };

  const moveRight = () => {
    const next = Math.min(current + 1, carouselImageUrls.length - 1);
    setCurrent(next);
    setImageId(next + 1);

    refs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const moveLeft = () => {
    const prev = Math.max(current - 1, 0);
    setCurrent(prev);
    setImageId(prev + 1);

    refs.current[prev]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // Handle manual scroll
  const handleScroll = () => {
    if (!carouselRef.current || homeScreenVisible) return;

    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    // Each image takes about 180px width + 200px gap = 380px total
    const imageWidth = 180 + 200;
    const centerOffset = scrollLeft + containerWidth / 2;
    let newIndex = Math.round(centerOffset / imageWidth);

    // Clamp the index
    newIndex = Math.max(0, Math.min(carouselImageUrls.length - 1, newIndex));

    // Only update if different from current
    if (newIndex !== current) {
      setCurrent(newIndex);
      setImageId(newIndex + 1);
    }
  };

  // Handle scroll end to ensure we snap to the correct image
  const handleScrollEnd = () => {
    if (!carouselRef.current || homeScreenVisible) return;

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Wait for scroll to completely stop before snapping
    scrollTimeoutRef.current = setTimeout(() => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const imageWidth = 180 + 200;
      const centerOffset = scrollLeft + containerWidth / 2;
      let targetIndex = Math.round(centerOffset / imageWidth);

      targetIndex = Math.max(
        0,
        Math.min(carouselImageUrls.length - 1, targetIndex),
      );

      // Snap to the closest image
      refs.current[targetIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      setCurrent(targetIndex);
      setImageId(targetIndex + 1);
    }, 150);
  };

  // Add scroll event listeners
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("scrollend", handleScrollEnd);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("scrollend", handleScrollEnd);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [homeScreenVisible]);

  // Reset when homescreen becomes visible
  useEffect(() => {
    if (homeScreenVisible) {
      setImageId(1);
      setCurrent(0);
    }
  }, [homeScreenVisible]);

  return (
    <>
      {!showDownloadPage && (
        <div className="andromeda-wrapper">
          <div className="andromeda-banner">
            <img
              src="./proxima-nobg.png"
              style={{ height: "75px", width: "75px" }}
              alt="Proxima Calculator Logo"
            />

            <h2>Proxima Calculator</h2>
          </div>

          <div className="carousal-div">
            <div className="overlayy">
              {imageId > 1 && !homeScreenVisible ? (
                <button className="carousal-button" onClick={() => moveLeft()}>
                  <i className="fa-solid fa-angle-left"></i>
                </button>
              ) : (
                <div style={{ marginRight: "30px" }}></div>
              )}{" "}
              <div className="holder">
                <div className="cameradiv">
                  <div className="camera-mock">
                    <div className="lens"></div>
                  </div>
                </div>
                <div className="carousal-inner" ref={carouselRef}>
                  {homeScreenVisible ? (
                    <div className="homescreen-phone">
                      <img
                        src="/proxima-nobg-Copy.png"
                        style={{ height: "70px", width: "70px" }}
                        onClick={() => handleHomeClick("icon")}
                        alt="Home screen"
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
                    <i className="fa-solid fa-bars"></i>
                    <i
                      className="fa-regular fa-circle"
                      onClick={() => handleHomeClick("back")}
                    ></i>
                    <i
                      className="fa-solid fa-angle-left"
                      onClick={() => handleHomeClick("back")}
                    ></i>
                  </div>
                </div>
              </div>
              {imageId < 12 && !homeScreenVisible ? (
                <button className="carousal-button" onClick={() => moveRight()}>
                  <i className="fa-solid fa-chevron-right"></i>
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
