import "./project-styles.css";
import { useState, useEffect } from "react";
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
            <img
              src="./proxima-nobg.png"
              style={{ height: "75px", width: "75px" }}
            />

            <h2>Proxima Calculator</h2>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <p>
                Meet the Proxima Calculator, a sleek and intuitive tool designed
                to make your daily calculations effortless. Its modern dark mode
                interface provides a high-contrast, eye-straining-free
                experience that is perfect for any lighting. You never have to
                worry about losing your place, as the built-in history feature
                allows you to review and track your previous results instantly.{" "}
                <br /> <br />
                With a clean layout and responsive design, it handles everything
                from simple sums to complex percentages with ease. We invite you
                to experience a more organized way to manage your numbers today.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-proxima-one"></div>
            <div className="andromeda-screenshot-proxima-two"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <p>
                This sleek, dark-themed calculator offers a modern and intuitive
                interface for handling everything from quick sums to nested
                expressions with parentheses. With a dedicated history view, you
                can easily track and reference your past calculations, such as
                the result of $364 + 985$, ensuring you never lose your place.
                It provides a seamless blend of efficiency and style, making
                complex arithmetic feel effortless and organized. <br /> <br />{" "}
                The app's clean typography and high-contrast lime accents ensure
                that your results remain perfectly legible at a glance. It
                strikes a sophisticated balance between professional utility and
                minimalist design.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-proxima-three"></div>
            <div className="andromeda-screenshot-proxima-four"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <p>
                This versatile tool goes beyond simple arithmetic by offering
                specialized calculation modes, including a dedicated Age
                Calculator and a Percentage Calculator. With the Age Calculator,
                you can instantly break down time into years, months, and days,
                or even view your life milestones in total hours, minutes, and
                seconds. <br /> <br /> Switching between these modes is
                effortless thanks to a streamlined dropdown menu that keeps your
                workspace organized and clutter-free. The interface maintains a
                consistent, high-contrast aesthetic across all features,
                ensuring that complex temporal data is as easy to read as a
                standard sum.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-proxima-five"></div>
            <div className="andromeda-screenshot-proxima-six"></div>
          </div>

          <div className="page-card-div">
            <div className="page-card">
              <p>
                The Percentage Calculator simplifies complex financial and
                mathematical tasks by offering specialized tabs for direct
                calculations, common phrases, and percentage differences. With
                the Common Phrases feature, you can skip the mental formulas and
                simply plug numbers into natural sentences like "12 is what % of
                34" to get instant, precise results. <br /> <br />
                The interface provides a clear breakdown of the underlying
                equation, such as $12 / 34 \times 100$, so you always understand
                the logic behind the final figure. This module turns a
                multi-step math problem into a simple, one-click experience that
                fits perfectly within your digital toolkit.
              </p>
            </div>
          </div>

          <div className="andromeda-screenshot-wrapper">
            <div className="andromeda-screenshot-proxima-seven"></div>
            <div className="andromeda-screenshot-proxima-eight"></div>
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
