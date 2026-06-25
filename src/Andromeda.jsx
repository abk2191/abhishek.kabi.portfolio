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
  const carouselRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const [menuItemID, setMenuItemID] = useState("");

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
              src="/theory.png"
              style={{ height: "75px", width: "75px" }}
              alt="Theory Logo"
            />
            <h2>Theory</h2>
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
                    <div
                      className="homescreen-phone"
                      onClick={() => handleHomeClick("icon")}
                    >
                      <img
                        src="/theory-Copy.png"
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
                        className={`carousal-images${index === 0 ? "" : `-${index + 1}`}`}
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
                  Product Description
                </h3>
                <div onClick={() => handleMenuClcked("proddesc")}>
                  <span
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                  >
                    {menuItemID === "proddesc" ? "-" : "+"}
                  </span>
                </div>
              </div>
              {menuItemID === "proddesc" && (
                <p className="the-description">
                  Theory serves as a central hub for personal knowledge
                  management, integrating multiple content types. Users can
                  create and manage Notes with customizable colors, pinning, and
                  font size adjustments. The Lists feature allows for the
                  creation of checklists with task completion tracking. <br />{" "}
                  <br />A Mindmap module enables users to visually brainstorm
                  and organize ideas in a hierarchical structure. The Drawing
                  tool provides a canvas for freehand sketches with color and
                  stroke width options. A full-featured Calendar allows for
                  scheduling events, adding reminders, and setting daily moods.
                  All content types can be Archived or moved to a Bin for
                  recovery or permanent deletion. <br /> <br /> A Sidebar
                  navigation menu provides quick access to all these core
                  features of the application. The app includes both Light and
                  Dark Theme support, which is applied across all interfaces.
                  User data synchronization and authentication are managed via
                  Google Sign-In. Persistent storage is handled using
                  AsyncStorage for local data persistence. The Calendar
                  integrates with the device's notification system to send
                  reminders for scheduled events. <br />
                  <br />
                  Each content type has a dedicated editor modal for creating
                  and modifying content. Search functionality is available for
                  both Notes and Lists to quickly find content. The application
                  is built with a focus on customization, allowing users to
                  change colors for notes, lists, and calendar events.
                </p>
              )}

              <div className="menu-holder">
                <h3 onClick={() => handleMenuClcked("techbreak")}>
                  Technical Breakdown
                </h3>
                <div onClick={() => handleMenuClcked("techbreak")}>
                  <span
                    style={{
                      fontSize: "30px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                  >
                    {menuItemID === "techbreak" ? "-" : "+"}
                  </span>
                </div>
              </div>
              {menuItemID === "techbreak" && <p>Technical</p>}
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
