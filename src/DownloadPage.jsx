function DownloadPage({
  showDownloadPage,
  currentButtonID,
  setShowDownloadPage,
  setCurrentButtonId,
  tryButtonClicked,
}) {
  const handleClick = () => {
    console.log("Triggerred");
    setShowDownloadPage(false);
  };

  const handleDownload = (id) => {
    if (id === "theory") {
      window.open(
        "https://drive.google.com/file/d/1iuk52UNQjlOEjtZkeKZ4CCYQQzZF4tHh/view?usp=drivesdk",
        "_blank",
        "noopener,noreferrer",
      );
    } else if (id === "PC") {
      window.open(
        "https://drive.google.com/file/d/1CkVSYJJnoLKwtbb26kQS4e7S6s9rVcab/view?usp=drivesdk",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };
  return (
    <>
      <div className="download-page-wrapper">
        <h3 style={{ marginBottom: "40px", marginTop: "30px" }}>DOWNLOADS</h3>
        <div className="line-divider-downloads"></div>
        <div className="items">
          <div
            className={`item-holder ${currentButtonID === "theory" ? "download-item-active" : ""} ${tryButtonClicked === "theory" ? "shake" : ""}`}
            onClick={() => setCurrentButtonId("theory")}
          >
            <div className="down-page-item">
              <img
                src="/theory.png"
                style={{ height: "75px", width: "75px" }}
              />
              <p className="download-heading">
                {" "}
                Theory (APK) <br />
                <span className="appsize" style={{ fontWeight: "bold" }}>
                  127Mb
                </span>
              </p>
            </div>

            <button
              className="download-button"
              onClick={() => handleDownload("theory")}
            >
              <i
                className={`fa-regular fa-circle-down ${currentButtonID === "theory" ? "download-item-active-icon" : ""}`}
              ></i>
            </button>
          </div>
          <div className="line-divider-downloads"></div>

          <div
            className={`item-holder ${currentButtonID === "PC" ? "download-item-active" : ""} ${tryButtonClicked === "PC" ? "shake" : ""}`}
            onClick={() => setCurrentButtonId("PC")}
          >
            <div className="down-page-item">
              <img
                src="./proxima-nobg.png"
                style={{ height: "75px", width: "75px" }}
              />
              <p className="download-heading">
                Proxima Calculator (APK) <br />
                <span className="appsize" style={{ fontWeight: "bold" }}>
                  57Mb
                </span>
              </p>
            </div>
            <button
              className="download-button"
              onClick={() => handleDownload("PC")}
            >
              <i
                className={`fa-regular fa-circle-down ${currentButtonID === "PC" ? "download-item-active-icon" : ""}`}
              ></i>
            </button>
          </div>

          <div className="line-divider-downloads"></div>
          <div>
            <p className="notice" style={{ opacity: 0.5 }}>
              These apps will be available on{" "}
              <i class="fa-brands fa-google-play"></i> Google Play Store soon.
            </p>
          </div>
          <div className="back-button-div">
            <button onClick={() => handleClick()} className="backbutton">
              <i class="fa-solid fa-arrow-left-long"></i> GO BACK
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DownloadPage;
