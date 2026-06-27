import "./project-styles.css";
import { useState, useEffect, useRef } from "react";
import DownloadPage from "./DownloadPage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

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
                  Proxima Calculator is a comprehensive and versatile calculator
                  application developed by iINTUIT Labs that combines
                  arithmetic, age, and percentage calculations into a single,
                  unified platform. The app features a clean, intuitive
                  interface with full dark/light theme support and persistent
                  storage of calculation history using AsyncStorage.
                  <br />
                  <br />
                  <span className="prod-desc-head">Arithmetic Calculator</span>
                  <br /> The arithmetic calculator provides a full-featured
                  standard calculator with support for basic operations
                  including addition, subtraction, multiplication, division, and
                  percentages. Users can input complex expressions with
                  parentheses support, view real-time results, and toggle
                  between calculator view and calculation history.
                  <br />
                  <br />
                  <span className="prod-desc-head">Age Calculator</span>
                  <br /> The age calculator allows users to calculate their
                  exact age by entering their date of birth and selecting a
                  target date with month, day, and year pickers. The result
                  displays the age in years, months, days, and also provides
                  detailed breakdowns in hours, minutes, and seconds for precise
                  tracking.
                  <br />
                  <br />
                  <span className="prod-desc-head">Percentage Calculator</span>
                  <br /> The percentage calculator features three specialized
                  tabs including standard percentage calculations, common
                  percentage phrases, and percentage difference calculations.
                  Each tab provides intuitive input fields, instant calculations
                  with step-by-step breakdowns, and clear functionality for easy
                  resetting of values.
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
              {menuItemID === "techbreak" && (
                <div className="code-div">
                  <p className="code-div-heading">Architecture Overview</p>
                  <p className="code-div-desc">
                    Proxima Calculator follows a component-based architecture
                    using React Native, with all state managed within the root
                    App component. The application is structured as a
                    single-page application (SPA) with three distinct calculator
                    modes that users can switch between using the mode menu.
                  </p>

                  <p className="code-div-heading">State Management Pattern</p>
                  <p className="code-div-desc">
                    The app employs a centralized state management approach
                    where all calculator states (arithmetic, age, percentage)
                    are maintained within the root component. This creates a
                    single source of truth and simplifies data persistence
                    across different calculator modes.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Core state structure
const [expression, setExpression] = useState("");
const [displayExpression, setDisplayExpression] = useState("");
const [result, setResult] = useState("");
const [lastOperationWasEquals, setLastOperationWasEquals] = useState(false);
const [showCalculator, setShowCalculator] = useState(true);
const [calculationHistory, setCalculationHistory] = useState([]);
const [isDarkTheme, setIsDarkTheme] = useState(true);

// Mode switching states
const [isArithmatic, setIsArithMatic] = useState(true);
const [isAgeCalc, setIsAgeCalc] = useState(false);
const [isPercentageCalc, setIsPercentageCalc] = useState(false);`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Data Persistence Strategy</p>
                  <p className="code-div-desc">
                    All data is persisted locally using
                    @react-native-async-storage/async-storage. The app stores
                    calculation history and theme preferences with dedicated
                    storage keys.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Saving calculation history
const saveHistory = async (history) => {
  try {
    await AsyncStorage.setItem("calculator_history", JSON.stringify(history));
  } catch (error) {
    console.error("Error saving history:", error);
  }
};

// Loading theme preference
const loadTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem("calculator_theme");
    if (savedTheme !== null) {
      setIsDarkTheme(JSON.parse(savedTheme));
    }
  } catch (error) {
    console.error("Error loading theme:", error);
  }
};`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">
                    Arithmetic Calculator Engine
                  </p>
                  <p className="code-div-desc">
                    The arithmetic calculator uses a custom expression
                    evaluation engine that supports basic operations,
                    parentheses, and percentage calculations. Expressions are
                    sanitized and evaluated using JavaScript's eval function
                    after proper formatting.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Expression evaluation
const evaluateExpression = useCallback(() => {
  try {
    if (expression.trim() === "") {
      setResult("");
      return;
    }
    const evalExpression = expression
      .replace(/\\s+/g, "")
      .replace(/x/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");
    const calculatedValue = eval(evalExpression);
    let resultString;
    if (Number.isInteger(calculatedValue)) {
      resultString = calculatedValue.toString();
    } else {
      const roundedValue = Math.round(calculatedValue * 100000) / 100000;
      resultString = parseFloat(roundedValue.toString()).toString();
    }
    const formattedResult = formatNumberWithCommas(resultString);
    setResult(formattedResult);
    addToCalculationHistory(displayExpression, formattedResult);
  } catch (error) {
    setResult("Error");
  }
}, [expression, displayExpression]);`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Formatting and Display</p>
                  <p className="code-div-desc">
                    The app includes sophisticated number formatting with comma
                    separation for thousands, making large numbers more
                    readable. The expression display also highlights operators
                    with distinct colors for better visual clarity.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Number formatting with commas
const formatNumberWithCommas = useCallback((numberString) => {
  if (!numberString) return "";
  const cleanNumberString = numberString.replace(/,/g, "");
  const [integerPart, decimalPart] = cleanNumberString.split(".");
  let processedIntegerPart = integerPart;
  const formattedDecimalPart = decimalPart ? \`.\${decimalPart}\` : "";
  let isNegative = false;
  if (processedIntegerPart.startsWith("-")) {
    isNegative = true;
    processedIntegerPart = processedIntegerPart.substring(1);
  }
  let formattedResult = processedIntegerPart.replace(
    /\\B(?=(\\d{3})+(?!\\d))/g,
    ","
  );
  if (isNegative) {
    formattedResult = \`-\${formattedResult}\`;
  }
  return formattedResult + formattedDecimalPart;
}, []);

// Operator highlighting in display
const renderOperationDisplay = useMemo(() => {
  if (!displayExpression) return null;
  return (
    <Text style={styles.expressionDisplay}>
      {displayExpression.split("").map((char, index) => {
        const trimmedChar = char.trim();
        const isOperator = OPERATORS.includes(trimmedChar);
        return (
          <Text
            key={\`\${char}-\${index}\`}
            style={isOperator && styles.operatorSpan}
          >
            {char}
          </Text>
        );
      })}
    </Text>
  );
}, [displayExpression, isDarkTheme]);`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Age Calculator</p>
                  <p className="code-div-desc">
                    The age calculator computes exact age between a birth date
                    and a target date. It handles month and day differences
                    correctly, accounting for varying month lengths and leap
                    years. Results are displayed in years, months, days, hours,
                    minutes, and seconds.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Age calculation logic
function calculateAge() {
  const birthDate = new Date(dob.year, getMonthNumber(dob.month), dob.day);
  const targetDate = new Date(
    selectedDate.year,
    getMonthNumber(selectedDate.month),
    selectedDate.day
  );

  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const timeDiff = targetDate - birthDate;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const seconds = Math.floor(timeDiff / 1000);
}`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Percentage Calculator</p>
                  <p className="code-div-desc">
                    The percentage calculator features three specialized tabs:
                    standard percentage calculations, common percentage phrases,
                    and percentage difference calculations. Each tab provides
                    intuitive input fields with instant calculation results and
                    step-by-step breakdowns.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Standard percentage calculation
const calculateStandardPercentage = () => {
  const percent = parseFloat(standardPercent);
  const of = parseFloat(standardOf);
  if (isNaN(percent) || isNaN(of)) {
    setStandardResult("Please enter valid numbers");
    return;
  }
  const calculated = (percent / 100) * of;
  setStandardResult(\`\${calculated}\`);
  setStandardSteps(\`\${percent}% × \${of} = \${calculated}\`);
};

// Percentage difference calculation
const calculateDifference = () => {
  const v1 = parseFloat(diffValue1);
  const v2 = parseFloat(diffValue2);
  if (isNaN(v1) || isNaN(v2)) {
    setDiffResult("Please enter valid numbers");
    return;
  }
  const average = (v1 + v2) / 2;
  const difference = ((Math.abs(v1 - v2) / average) * 100).toFixed(2);
  setDiffResult(\`\${difference}%\`);
  setDiffSteps(
    \`|\${v1} - \${v2}| / ((\${v1} + \${v2})/2) × 100 = \${difference}%\`
  );
};`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Mode Navigation</p>
                  <p className="code-div-desc">
                    The app features a mode menu that allows users to switch
                    between arithmetic, age, and percentage calculators. The
                    menu is implemented as a modal overlay with smooth
                    animations.
                  </p>

                  <SyntaxHighlighter
                    language="javascript"
                    customStyle={{
                      backgroundColor: "#f5f5f5",
                      padding: "20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {`// Mode menu toggle
const toggleModeMenu = () => {
  setModeactive(!modeactive);
};

// Mode switching
<TouchableOpacity
  style={styles.modeMenuItem}
  onPress={() => {
    setIsArithMatic(true);
    setModeactive(false);
    setIsAgeCalc(false);
    setIsPercentageCalc(false);
  }}
>
  <Text style={styles.modeMenuItemText}>
    <FontAwesome6 name="plus-minus" size={12} /> ARITHMATIC CALCULATOR
  </Text>
</TouchableOpacity>`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Data Flow Summary</p>
                  <p className="code-div-desc">
                    User Input → Expression State Update → Display Formatting →
                    Evaluation → Result Display → History Storage
                    <br />
                    Theme Toggle → Theme State Update → Style Recalculation → UI
                    Update → Theme Persistence
                    <br />
                    Mode Switch → Mode State Update → Component Re-render → UI
                    Transition
                  </p>
                  <p className="code-div-desc" style={{ marginTop: "10px" }}>
                    This architecture ensures smooth user interactions,
                    consistent data management, and reliable persistence across
                    all calculator modes and features.
                  </p>
                </div>
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
