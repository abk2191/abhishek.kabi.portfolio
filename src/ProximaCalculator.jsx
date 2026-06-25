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
  const [menuItemID, setMenuItemID] = useState("");

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

  const handleMenuClcked = (id) => {
    setMenuItemID((prev) => (prev === id ? "" : id));
  };

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

          <div>
            <div className="product-details-section">
              <div className="menu-holder">
                <h3 onClick={() => handleMenuClcked("proddesc")}>
                  ○ Product Description
                </h3>
                <div onClick={() => handleMenuClcked("proddesc")}>
                  <span
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    className="plus-minus"
                  >
                    {menuItemID === "proddesc" ? "-" : "+"}
                  </span>
                </div>
              </div>
              {menuItemID === "proddesc" && (
                <p className="the-description">
                  Theory is a comprehensive mobile productivity application
                  developed by iINTUIT Labs that serves as a central hub for
                  personal knowledge management, integrating multiple content
                  types into a single, cohesive platform. The app features a
                  clean, intuitive interface with full dark/light theme support
                  and Google Sign-In authentication for data synchronization.
                  <br />
                  <br />
                  <span className="prod-desc-head">Notes</span>
                  <br /> Notes is the primary content creation tool that allows
                  users to capture and organize their thoughts in a flexible,
                  customizable format with a two-column grid layout. Notes can
                  be pinned, searched, archived, or moved to the bin, with the
                  editor modal providing a full-screen writing experience with
                  adjustable font sizes and automatic saving.
                  <br />
                  <br />
                  <span className="prod-desc-head">Drawing</span>
                  <br /> Drawing is a creative canvas tool built on the
                  high-performance Skia graphics library that allows users to
                  sketch and create visual content with smooth rendering and
                  responsive touch interactions. Users can choose from twelve
                  distinct colors and adjust stroke widths, with each drawing
                  saved with a timestamp and stroke count for easy reference.
                  <br />
                  <br />
                  <span className="prod-desc-head">Lists</span>
                  <br /> Lists is a comprehensive task management system that
                  enables users to create and track checklists with a title and
                  dynamic collection of tasks that can be added, completed, or
                  removed in real-time. Tasks are displayed with interactive
                  checkboxes and progress summaries, with lists being
                  color-coded, pinned, and automatically saved when the editor
                  is closed.
                  <br />
                  <br />
                  <span className="prod-desc-head">Calendar</span>
                  <br /> Calendar is a full-featured event management and
                  scheduling system that displays a monthly grid view where each
                  day is represented as a cell with visual indicators showing
                  which dates have events scheduled. Users can navigate between
                  months, toggle to a year view, set multi-day events, log daily
                  moods, and schedule reminders using the integrated
                  notification system.
                  <br />
                  <br />
                  <span className="prod-desc-head">Mindmap</span>
                  <br /> Mindmap is a visual thinking and brainstorming tool
                  that allows users to create hierarchical diagrams for
                  organizing ideas using a tree-based architecture with
                  unlimited nesting depth. Each node features editable text and
                  customizable colors from a palette of sixteen options, with
                  zoom controls and full CRUD operations including creation,
                  editing, deletion, and archiving.
                </p>
              )}

              <div className="menu-holder">
                <h3 onClick={() => handleMenuClcked("techbreak")}>
                  ○ Technical Breakdown
                </h3>
                <div onClick={() => handleMenuClcked("techbreak")}>
                  <span
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    className="plus-minus"
                  >
                    {menuItemID === "techbreak" ? "-" : "+"}
                  </span>
                </div>
              </div>
              {menuItemID === "techbreak" && <p>Technical</p>}
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
