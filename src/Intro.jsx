import { useState, useEffect, useRef, useCallback } from "react";

function Intro({ toggleSidebar, setShouldRender, setProjectsClicked }) {
  const [currentID, setCurrentID] = useState("");
  const [repoCounter, setRepoCounter] = useState(0);
  const [mvpCounter, setMvpCounter] = useState(0);
  const [monthCounter, setMonthCounter] = useState(0);
  const sectionRef = useRef(null);

  // const getColor = () => {
  //   const isDarkTheme =
  //     document.documentElement.getAttribute("data-theme") === "dark";

  //   if (repoCounter === 50) return "#1e40af";
  //   if (repoCounter < 50) return "red";
  // };

  const handleSkillToggle = (id) => {
    setCurrentID((prev) => (prev === id ? "" : id));
  };

  const updateCounter = () => {
    setRepoCounter((prev) => prev + 1);
  };

  const updateMvpCounter = () => {
    setMvpCounter((prev) => prev + 1);
  };

  const updateMonthCounter = () => {
    setMonthCounter((prev) => prev + 1);
  };

  //useEffects to run the Counter functions every second
  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count < 50) {
        setRepoCounter((prev) => prev + 1);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count < 2) {
        setMvpCounter((prev) => prev + 1);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count < 140) {
        updateMonthCounter((prev) => prev + 1);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro-container">
      <div>
        <div className="show-counters-div">
          <div className="counter-holder">
            <span
              className={`counter-text ${repoCounter > 43 ? "inflated" : ""} ${
                repoCounter === 50
                  ? "counter-full"
                  : repoCounter < 50
                    ? "counter-warning"
                    : ""
              }`}
            >
              {repoCounter}
            </span>

            <p>
              <span className="counter-desc-text">
                Github <br /> Repos
              </span>
            </p>
          </div>

          <div className="counter-dvdr"></div>

          <div className="counter-holder">
            <span
              className={`counter-text ${mvpCounter > 1 ? "inflated" : ""} ${
                mvpCounter === 2
                  ? "counter-full"
                  : mvpCounter < 2
                    ? "counter-warning"
                    : ""
              }`}
            >
              {mvpCounter}
            </span>
            <p>
              <span className="counter-desc-text">
                MVP <br /> Products
              </span>
            </p>
          </div>

          <div className="counter-dvdr"></div>

          <div className="counter-holder">
            <span
              className={`counter-text ${monthCounter > 139 ? "inflated" : ""} ${
                monthCounter === 140
                  ? "counter-full"
                  : monthCounter < 140
                    ? "counter-warning"
                    : ""
              }`}
            >
              {monthCounter}
            </span>
            <p className="counter-desc-text">
              <span className="counter-desc-text">
                UI <br /> Components
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <p className="hii">Hi, I am Abhishek.</p> */}
      {/*------------------------------------------------------------------- */}
      <div className="placeholder-div">
        <p className="desc">
          Hi, I am Abhishek. I am a passionate{" "}
          <span className="bold">Full-Stack React (web / native)</span> product
          engineer.
        </p>
        {/*------------------------------------------------------------------- */}
        <div className="divider">
          <div className="the-dot"></div>
          <div className="the-line"></div>
          <div className="the-dot"></div>
        </div>
        {/*------------------------------------------------------------------- */}
      </div>
      <div className="placeholder-div">
        <p className="desc">
          <span className="mvp-text">Click</span> on the image below to see my{" "}
          <span className="mvp-text">MVP Projects.</span>
        </p>
        <p style={{ textAlign: "center" }}>👇</p>
        <img
          src="/mvp.png"
          alt="mvp"
          className="mvpimg"
          onClick={() => {
            toggleSidebar();

            setTimeout(() => {
              setShouldRender(true);
              setProjectsClicked(true);
            }, 800);
          }}
        />
      </div>
      {/*------------------------------------------------------------------- */}
      <div className="divider">
        <div className="the-dot"></div>
        <div className="the-line"></div>
        <div className="the-dot"></div>
      </div>
      {/*------------------------------------------------------------------- */}
      <div className="tech-skills-wrapper">
        <div className="tech-heading">
          <p>Skills and Experties</p>
        </div>
        {/* <div className="divdr"></div> */}
        <div className="tech-skills">
          <div className="tech-skills-div">
            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("jscore")}
                >
                  {currentID === "jscore" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="jscore" onClick={() => handleSkillToggle("jscore")}>
                <span className="headColor">JavaScript (Core)</span>
              </p>{" "}
            </div>
            {currentID === "jscore" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Fundamentals:</span>
                <br />
                Variables (let, const)
                <br />
                Functions
                <br />
                Arrow functions
                <br />
                Scope
                <br />
                Template literals
                <br />
                Destructuring
                <br />
                Default parameters
                <br />
                Optional chaining (?.)
                <br />
                Nullish coalescing (??)
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Objects:</span>
                <br />
                Object creation
                <br />
                Nested objects
                <br />
                Object spread operator
                <br />
                Updating immutable state
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Arrays:</span>
                <br />
                map()
                <br />
                filter()
                <br />
                find()
                <br />
                some()
                <br />
                forEach()
                <br />
                Array spreading
                <br />
                Immutable array updates
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Control Flow:</span>
                <br />
                if/else
                <br />
                Conditional rendering logic
                <br />
                Ternary operators
                <br />
                Logical operators
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  Asynchronous Programming:
                </span>
                <br />
                Promises
                <br />
                async/await
                <br />
                Handling API/database calls
                <br />
                Firebase async operations
                <br />
                Loading states
                <br />
                Error handling with try/catch
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Data Handling:</span>
                <br />
                JSON structures
                <br />
                Data transformation
                <br />
                State synchronization
                <br /> List manipulation
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("reactcore")}
                >
                  {currentID === "reactcore" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="reactcore" onClick={() => handleSkillToggle("reactcore")}>
                <span className="headColor">React (Core)</span>
              </p>
            </div>
            {currentID === "reactcore" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Components:</span>
                <br />
                Functional components
                <br />
                Component composition
                <br />
                Reusable UI structures
                <br />
                Component organization
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Props:</span>
                <br />
                Passing props
                <br />
                Prop drilling
                <br />
                Data flow between components
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>State Management:</span>
                <br />
                useState
                <br />
                State updates
                <br />
                Complex state objects
                <br />
                Array state management
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Hooks:</span>
                <br />
                useState
                <br />
                useEffect
                <br />
                Custom logic patterns
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Rendering:</span>
                <br />
                Conditional rendering
                <br />
                Dynamic lists
                <br />
                Key management
                <br />
                UI updates from state changes
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>React Architecture:</span>
                <br />
                Screen separation
                <br />
                Feature organization
                <br />
                Reusable components
                <br /> Project structuring
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("rncore")}
                >
                  {currentID === "rncore" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="rncore" onClick={() => handleSkillToggle("rncore")}>
                <span className="headColor">React Native (Core)</span>
              </p>
            </div>
            {currentID === "rncore" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>UI Components:</span>
                <br />
                View
                <br />
                Text
                <br />
                TextInput
                <br />
                ScrollView
                <br />
                FlatList
                <br />
                Touchable components
                <br />
                Modal
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Mobile UI Development:</span>
                <br />
                Responsive layouts
                <br />
                Mobile-first design
                <br />
                Form handling
                <br />
                User input management
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Styling:</span>
                <br />
                StyleSheet
                <br />
                Flexbox
                <br />
                Layout design
                <br />
                Dynamic styling
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Navigation Concepts:</span>
                <br />
                Screen transitions
                <br />
                Navigation flow
                <br />
                User experience planning
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  Mobile State Management:
                </span>
                <br />
                Screen-level state
                <br />
                Form state
                <br />
                Editor state
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Debugging:</span>
                <br />
                State bugs
                <br />
                UI rendering issues
                <br />
                Data synchronization issues
                <br />
                Property mismatch debugging
                <br />
                <br />
                <br />
                Notes storing font
                <br />
                Logic reading fontSize
                <br /> Migration and fallback handling
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading "
                  onClick={() => handleSkillToggle("expo")}
                >
                  {currentID === "expo" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="expo" onClick={() => handleSkillToggle("expo")}>
                <span className="headColor">Expo</span>
              </p>
            </div>
            {currentID === "expo" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Expo Ecosystem:</span>
                <br />
                Expo project setup
                <br />
                Expo app configuration
                <br />
                Asset management
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>App Configuration:</span>
                <br />
                app.json
                <br />
                Icons
                <br />
                Splash screens
                <br />
                Adaptive icons
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Build & Deployment:</span>
                <br />
                Android builds
                <br />
                APK generation
                <br />
                Deployment preparation
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Expo Debugging:</span>
                <br />
                Adaptive icon troubleshooting
                <br />
                Asset configuration debugging
                <br /> Build issue investigation
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("firebase")}
                >
                  {currentID === "firebase" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="firebase" onClick={() => handleSkillToggle("firebase")}>
                <span className="headColor">Firebase</span>
              </p>
            </div>
            {currentID === "firebase" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Authentication:</span>
                <br />
                Firebase Auth
                <br />
                User registration
                <br />
                Login flow
                <br />
                Authentication
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Firestore Database:</span>
                <br />
                Reading documents
                <br />
                Writing documents
                <br />
                Updating documents
                <br />
                Deleting documents
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  Cloud Data Synchronization:
                </span>
                <br />
                User-specific data
                <br />
                Notes synchronization
                <br />
                Lists synchronization
                <br />
                Real-time-ish app data flow
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Data Modeling:</span>
                <br />
                User collections
                <br />
                Note structures
                <br />
                List structures
                <br /> Firestore documents
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("backend")}
                >
                  {currentID === "backend" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="backend" onClick={() => handleSkillToggle("backend")}>
                <span className="headColor">Backend Concepts</span>
              </p>
            </div>
            {currentID === "backend" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Backend Logic:</span>
                <br />
                CRUD operations
                <br />
                User-based data access
                <br />
                Data persistence
                <br />
                State synchronization
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Database Concepts:</span>
                <br />
                Collections
                <br />
                Documents
                <br />
                Querying data
                <br />
                Data relationships
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  Authentication Concepts:
                </span>
                <br />
                Session management
                <br />
                User identity
                <br /> Protected user data
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("git")}
                >
                  {currentID === "git" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="git" onClick={() => handleSkillToggle("git")}>
                <span className="headColor">Git & GitHub</span>
              </p>
            </div>
            {currentID === "git" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Version Control:</span>
                <br />
                Commits
                <br />
                Repository management
                <br />
                Branch awareness
                <br />
                Change tracking
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>GitHub:</span>
                <br />
                Project hosting
                <br />
                Repository maintenance
                <br />
                Issue investigation
                <br />
                Deployment workflows
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  Open Source Familiarity:
                </span>
                <br />
                Reading issues
                <br /> Comparing repository behavior
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("deploy")}
                >
                  {currentID === "deploy" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="deploy" onClick={() => handleSkillToggle("deploy")}>
                <span className="headColor">Deployment & Hosting</span>
              </p>
            </div>
            {currentID === "deploy" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Railway:</span>
                <br />
                Deployment concepts
                <br />
                Application hosting
                <br />
                Backend service deployment
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  General Deployment Knowledge:
                </span>
                <br />
                Production builds
                <br />
                Environment management
                <br />
                Hosting workflows
                <br /> Release preparation
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("scheduling")}
                >
                  {currentID === "scheduling" ? "-" : "+"}
                </span>{" "}
              </p>
              <p
                id="scheduling"
                onClick={() => handleSkillToggle("scheduling")}
              >
                <span className="headColor">Scheduling & Automation</span>
              </p>
            </div>
            {currentID === "scheduling" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Cron Jobs:</span>
                <br />
                Understanding scheduled tasks
                <br />
                Background execution concepts
                <br />
                Automation workflows
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>
                  General Automation Concepts:
                </span>
                <br />
                Timed operations
                <br />
                Periodic updates
                <br /> Backend task scheduling
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("application")}
                >
                  {currentID === "application" ? "-" : "+"}
                </span>{" "}
              </p>
              <p
                id="application"
                onClick={() => handleSkillToggle("application")}
              >
                <span className="headColor">Application Architecture</span>
              </p>
            </div>
            {currentID === "application" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>
                  Large Project Organization:
                </span>
                <br />
                Notes
                <br />
                Lists
                <br />
                Calendar
                <br />
                Mindmap
                <br />
                Archive
                <br />
                Bin/Trash
                <br />
                Authentication
                <br />
                Cloud Sync
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Architectural Skills:</span>
                <br />
                Feature separation
                <br />
                Shared data models
                <br />
                Screen organization
                <br />
                State flow planning
                <br /> Cross-feature integration
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("uiux")}
                >
                  {currentID === "uiux" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="uiux" onClick={() => handleSkillToggle("uiux")}>
                <span className="headColor">UI/UX Development</span>
              </p>
            </div>
            {currentID === "uiux" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>
                  Productivity App Design:
                </span>
                <br />
                Note-taking interfaces
                <br />
                List management
                <br />
                Calendar interfaces
                <br />
                Mindmap interfaces
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>UX Thinking:</span>
                <br />
                User workflows
                <br />
                Editor experiences
                <br />
                Data organization
                <br />
                Feature discoverability
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Animation Planning:</span>
                <br />
                <em>You've specifically discussed:</em>
                <br />
                Google Keep-style interactions
                <br />
                Note expansion animations
                <br />
                Scale transitions
                <br />
                Fade animations
                <br />
                Shared-elements
                <br /> Smooth editor transitions
              </p>
            )}

            <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("debugging")}
                >
                  {currentID === "debugging" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="debugging" onClick={() => handleSkillToggle("debugging")}>
                <span className="headColor">Debugging & Problem Solving</span>
              </p>
            </div>
            {currentID === "debugging" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#1877f2" }}>Debugging Areas:</span>
                <br />
                State bugs
                <br />
                Rendering bugs
                <br />
                Data-model mismatches
                <br />
                Firebase synchronization
                <br />
                Expo configuration issues
                <br />
                UI behavior issues
                <br />
                <br />
                <span style={{ color: "#1877f2" }}>Debugging Approach:</span>
                <br />
                Trace data flow
                <br />
                Inspect object structures
                <br />
                Verify property names
                <br /> Test assumptions systematically
              </p>
            )}

            {/* <div className="flex-row">
              <p>
                <span
                  className="circle accordion-heading"
                  onClick={() => handleSkillToggle("summary")}
                >
                  {currentID === "summary" ? "-" : "+"}
                </span>{" "}
              </p>
              <p id="summary" onClick={() => handleSkillToggle("summary")}>
                <span>Current Skill Stack Summary</span>
              </p>
            </div> */}
            {/* {currentID === "summary" && (
              <p
                className="font-handler"
                style={{
                  marginBottom: "15px",
                  marginLeft: "12px",
                  textAlign: "left",
                }}
              >
                Frontend: JavaScript • React • React Native <br />• Expo
                <br />
                <br />
                Backend: Firebase • Authentication <br />• Firestore
                <br />
                <br />
                Development Tools: Git • GitHub
                <br />
                <br />
                Deployment: Railway <br />• Mobile app deployment
                <br />
                <br />
                Strengths:
                <br />
                 Building real projects
                <br />
                 Debugging
                <br />
                 UI/UX thinking
                <br />
                 Feature integration
                <br />
                 Persistence on complex problems
                <br />
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
