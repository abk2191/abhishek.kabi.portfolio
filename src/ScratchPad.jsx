import "./project-styles.css";

function ScratchPad({ currentTheme }) {
  const handleClick = () => {
    window.open(
      "https://drive.google.com/file/d/1jGuWcTquQJp1aQXFQMWWBMl9TnT8n1yW/view?usp=sharing",
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <>
      <div className="andromeda-wrapper">
        <div className="andromeda-banner">
          <img src="./sp-nobg.png" style={{ height: "75px", width: "75px" }} />
          <h2>ScratchPad Native</h2>
        </div>

        <div className="page-card-div">
          <div className="page-card">
            <p>
              ScratchPad is a streamlined digital canvas designed for the
              immediate capture of your daily thoughts and essential notes. With
              an intuitive interface that prioritizes speed, you can
              effortlessly dump ideas, refine them with easy editing, and
              retrieve any memory instantly through a powerful integrated
              search.
            </p>

            <p>
              Declutter your mind with ScratchPad, the minimalist workspace
              built for seamless thought management and organized daily
              reflection. It provides a distraction-free environment to post,
              edit, and delete notes, ensuring your most important ideas are
              always just a search away.
            </p>

            <p>
              ScratchPad offers a responsive environment where ideas can live.
            </p>
          </div>
        </div>

        <div className="andromeda-screenshot-wrapper">
          <div className="scratchpad-banner-one"></div>
          <div className="scratchpad-banner-two"></div>
        </div>

        <div className="get-button">
          <button className="contactButton" onClick={handleClick}>
            Try ScratchPad
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
    </>
  );
}

export default ScratchPad;
