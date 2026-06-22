import "./project-styles.css";
import { useState, useEffect } from "react";
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
  // const [showDownloadPage, setShowDownloadPage] = useState(false);
  // const [currentButtonID, setCurrentButtonId] = useState("");
  const [imageId, setImageId] = useState(1);
  const [buttonId, setButtonId] = useState("");

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
  return (
    <>
      {!showDownloadPage && (
        <div className="andromeda-wrapper">
          <div className="andromeda-banner">
            <img src="/theory.png" style={{ height: "75px", width: "75px" }} />
            <h2>Theory</h2>
          </div>
          <div className="carousal-div">
            {imageId > 1 ? (
              <button
                className="carousal-button"
                onClick={() => handleButtonClick("left")}
              >
                <i class="fa-solid fa-angle-left"></i>
              </button>
            ) : (
              <div style={{ marginRight: "30px" }}></div>
            )}

            <div className="carousal-inner">
              {imageId === 1 && <div className="carousal-images" />}
              {imageId === 2 && <div className="carousal-images-2" />}
              {imageId === 3 && <div className="carousal-images-3" />}
              {imageId === 4 && <div className="carousal-images-4" />}
              {imageId === 5 && <div className="carousal-images-5" />}
              {imageId === 6 && <div className="carousal-images-6" />}
              {imageId === 7 && <div className="carousal-images-7" />}
              {imageId === 8 && <div className="carousal-images-8" />}
              {imageId === 9 && <div className="carousal-images-9" />}
              {imageId === 10 && <div className="carousal-images-10" />}
              {imageId === 11 && <div className="carousal-images-11" />}
              {imageId === 12 && <div className="carousal-images-12" />}
            </div>

            {imageId < 12 ? (
              <button
                className="carousal-button"
                onClick={() => handleButtonClick("right")}
              >
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            ) : (
              <div style={{ marginRight: "28px" }}></div>
            )}
          </div>

          {/* <div className="andromeda-screenshot-wrapper">
            <div className="theory-banner-white"></div>
            <div className="theory-banner-dark"></div>
          </div> */}

          {/* <div className="page-card-div">
            <div className="page-card">
              <p>
                Theory. is a thoughtful productivity space designed to help you
                find clarity and act with intention. <br /> <br />
                We’ve removed the typical digital noise and distractions,
                offering you a quiet environment to plan and stay focused—free
                from cognitive overload.
              </p>
              <br />
              <p>
                With a modern, intuitive interface, Theory. is built to be fast
                and deeply respectful of your time. It is our goal to support
                those who value structure and reliability above all else. <br />{" "}
                <br />
                Theory. simply provides the steady tools you need to stay
                centered and accomplish what matters most to you.
              </p>
            </div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <h2>NOTES</h2>
              <p>
                To help you stay centered as you capture your thoughts, Theory.
                offers a beautifully simple space to organize your notes. <br />
                <br />
                You can easily prioritize your ideas by pinning or unpinning
                them, ensuring your most important tasks always remain on track.{" "}
                <br />
                <br /> To make the experience truly yours, you can also
                customize your workspace with a variety of beautiful colors for
                a more personal, intentional feel.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-notes"></div>
            <div className="andromeda-screenshot-notes-open"></div>
          </div>

          

          <div className="page-card-div">
            <div className="page-card">
              <h2>DRAWING</h2>
              <p>
                Theory. Todo module, a streamlined task manager designed to
                bring immediate clarity to your busy day. It features a bold,
                intuitive interface that lets you organize your life into
                distinct, color-coded categories with just a few taps. <br />{" "}
                <br /> You can easily pin your most critical lists to the top of
                your dashboard. Adding, completing, and managing individual
                tasks is incredibly fluid, complete with visual strike-throughs
                to give you that satisfying sense of progress.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="theory-drawing-one"></div>
            <div className="theory-drawing-two"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <h2>LISTS</h2>
              <p>
                Theory. Todo module, a streamlined task manager designed to
                bring immediate clarity to your busy day. It features a bold,
                intuitive interface that lets you organize your life into
                distinct, color-coded categories with just a few taps. <br />{" "}
                <br /> You can easily pin your most critical lists to the top of
                your dashboard. Adding, completing, and managing individual
                tasks is incredibly fluid, complete with visual strike-throughs
                to give you that satisfying sense of progress.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-todo"></div>
            <div className="andromeda-screenshot-todo-open"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <h2>CALENDAR</h2>
              <p>
                Stay organized and inspired with this clean, intuitive calendar
                designed to keep your schedule and thoughts in perfect harmony.
                Whether you prefer a bird's-eye view of your entire year or a
                focused monthly layout, switching between perspectives is
                seamless and simple. <br /> <br /> You can also easily add or
                view specific events with just a quick tap on any date and also
                get notifications. We've focused on creating a clutter-free
                experience that helps you manage your time while leaving room
                for personal growth.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-calendar"></div>
            <div className="andromeda-screenshot-calendar-two"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <h2>MINDMAP</h2>
              <p>
                Visualize your ideas with our intuitive Mindmap tool, designed
                to help you structure complex thoughts with ease. You can start
                by establishing a central "Base topic" and branching out into
                multiple main categories to define your core concepts. The
                interface allows you to add granular sub-topics seamlessly,
                capturing your brainstorm in a logical hierarchy. <br /> <br />{" "}
                Managing your workspace is simple with dedicated zoom and
                refresh controls that keep your map clear and accessible.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-mindmap"></div>
            <div className="andromeda-screenshot-mindmap-two"></div>
          </div> */}

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
