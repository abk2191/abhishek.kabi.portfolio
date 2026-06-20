import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

function Profile() {
  const [activeButton, setActiveButton] = useState("tech");
  const [techSkillClicked, setTechSkillClicked] = useState(true);
  const [myPhotosClicked, setMyPhotosClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    localStorage.getItem("portfolio-liked") === "true",
  );
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    loadLikes();
  }, []);

  const loadLikes = async () => {
    const docRef = doc(db, "portfolio", "profile");

    const snap = await getDoc(docRef);

    if (snap.exists()) {
      setTotalLikes(snap.data().likes);
    }
  };

  const getBackGroundColor = (id) => {
    setActiveButton(id); // Set the clicked button as active
  };

  const handleLikeBtn = async () => {
    const docRef = doc(db, "portfolio", "profile");

    if (likeCount) {
      setLikeCount(false);

      localStorage.removeItem("portfolio-liked");

      await updateDoc(docRef, {
        likes: increment(-1),
      });

      setTotalLikes((prev) => prev - 1);
    } else {
      setLikeCount(true);

      localStorage.setItem("portfolio-liked", "true");

      await updateDoc(docRef, {
        likes: increment(1),
      });

      setTotalLikes((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="cover-photo"></div>
      <div className="profile-body">
        <div className="profile-header-container">
          <div className="profile-picture"></div>
          <div className="profile-name">
            <p>Abhishek Kabi</p>
          </div>
        </div>

        <div className="profile-button">
          <button className="profile-action-button blue">
            <i class="fa-solid fa-user-plus white"></i> Add friend
          </button>
          <button className="profile-action-button themed">
            <i class="fa-brands fa-facebook-messenger "></i> Message
          </button>
        </div>

        <div className="info-buttons">
          <button
            className="info-btns"
            id="tech"
            style={{
              backgroundColor: activeButton === "tech" ? "#DEEFFC" : "",
            }}
            onClick={() => {
              getBackGroundColor("tech");
              setTechSkillClicked(true);
              setMyPhotosClicked(false);
            }}
          >
            All Posts
          </button>
          <button
            className="info-btns"
            id="photo"
            style={{
              backgroundColor: activeButton === "photo" ? "#DEEFFC" : "",
            }}
            onClick={() => {
              getBackGroundColor("photo");
              setTechSkillClicked(false);
              setMyPhotosClicked(true);
            }}
          >
            About
          </button>
        </div>
        <div className="profile-info-wrapper">
          <div className="personal-dtls-new">
            <h2>Personal details</h2>
            <div className="kontainer">
              <div className="details-holder-icons">
                <div>
                  <i class="fa-regular fa-map proficon"></i>
                </div>

                <div>
                  <i class="fa-solid fa-graduation-cap proficon"></i>
                </div>

                <div>
                  <i class="fa-solid fa-house proficon"></i>
                </div>
              </div>
              <div className="details-holder-dtls">
                <p>Bangalore, Karnataka, India.</p>
                <p>VIT Vellore - B.Tech - IT.</p>
                <p>Siliguri, West Bengal.</p>
              </div>
            </div>
          </div>

          <div className="personal-dtls">
            <h2>Work</h2>
            <div className="kontainer">
              <div className="details-holder-icons">
                <div>
                  <i class="fa-solid fa-business-time proficon"></i>
                </div>
              </div>
              <div className="details-holder-dtls">
                <p>Full Stack Product Engineer (Web and Native)</p>
              </div>
            </div>
            {/* <div className="tech-skills">
              <div className="tech-skills-div">
                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("jscore")}
                    >
                      {currentID === "jscore" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="jscore" onClick={() => handleSkillToggle("jscore")}>
                    <span>JavaScript (Core)</span>
                  </p>{" "}
                </div>
                {currentID === "jscore" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Fundamentals:</span>
                    <br />
                    ● Variables (let, const)
                    <br />
                    ● Functions
                    <br />
                    ● Arrow functions
                    <br />
                    ● Scope
                    <br />
                    ● Template literals
                    <br />
                    ● Destructuring
                    <br />
                    ● Default parameters
                    <br />
                    ● Optional chaining (?.)
                    <br />
                    ● Nullish coalescing (??)
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Objects:</span>
                    <br />
                    ● Object creation and manipulation
                    <br />
                    ● Nested objects
                    <br />
                    ● Object spread operator
                    <br />
                    ● Updating immutable state
                    <br />
                    ● Property access and modification
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Arrays:</span>
                    <br />
                    ● map()
                    <br />
                    ● filter()
                    <br />
                    ● find()
                    <br />
                    ● some()
                    <br />
                    ● forEach()
                    <br />
                    ● Array spreading
                    <br />
                    ● Immutable array updates
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Control Flow:</span>
                    <br />
                    ● if/else
                    <br />
                    ● Conditional rendering logic
                    <br />
                    ● Ternary operators
                    <br />
                    ● Logical operators
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Asynchronous Programming:
                    </span>
                    <br />
                    ● Promises
                    <br />
                    ● async/await
                    <br />
                    ● Handling API/database calls
                    <br />
                    ● Firebase async operations
                    <br />
                    ● Loading states
                    <br />
                    ● Error handling with try/catch
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Data Handling:</span>
                    <br />
                    ● JSON structures
                    <br />
                    ● Data transformation
                    <br />
                    ● State synchronization
                    <br />● List manipulation
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("reactcore")}
                    >
                      {currentID === "reactcore" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p
                    id="reactcore"
                    onClick={() => handleSkillToggle("reactcore")}
                  >
                    <span>React Core</span>
                  </p>
                </div>
                {currentID === "reactcore" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Components:</span>
                    <br />
                    ● Functional components
                    <br />
                    ● Component composition
                    <br />
                    ● Reusable UI structures
                    <br />
                    ● Component organization
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Props:</span>
                    <br />
                    ● Passing props
                    <br />
                    ● Prop drilling
                    <br />
                    ● Data flow between components
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>State Management:</span>
                    <br />
                    ● useState
                    <br />
                    ● State updates
                    <br />
                    ● Complex state objects
                    <br />
                    ● Array state management
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Hooks:</span>
                    <br />
                    ● useState
                    <br />
                    ● useEffect
                    <br />
                    ● Custom logic patterns
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Rendering:</span>
                    <br />
                    ● Conditional rendering
                    <br />
                    ● Dynamic lists
                    <br />
                    ● Key management
                    <br />
                    ● UI updates from state changes
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      React Architecture:
                    </span>
                    <br />
                    ● Screen separation
                    <br />
                    ● Feature organization
                    <br />
                    ● Reusable components
                    <br />● Project structuring
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("rncore")}
                    >
                      {currentID === "rncore" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="rncore" onClick={() => handleSkillToggle("rncore")}>
                    <span>React Native Core</span>
                  </p>
                </div>
                {currentID === "rncore" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>UI Components:</span>
                    <br />
                    ● View
                    <br />
                    ● Text
                    <br />
                    ● TextInput
                    <br />
                    ● ScrollView
                    <br />
                    ● FlatList
                    <br />
                    ● Touchable components
                    <br />
                    ● Modal
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Mobile UI Development:
                    </span>
                    <br />
                    ● Responsive layouts
                    <br />
                    ● Mobile-first design
                    <br />
                    ● Form handling
                    <br />
                    ● User input management
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Styling:</span>
                    <br />
                    ● StyleSheet
                    <br />
                    ● Flexbox
                    <br />
                    ● Layout design
                    <br />
                    ● Dynamic styling
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Navigation Concepts:
                    </span>
                    <br />
                    ● Screen transitions
                    <br />
                    ● Navigation flow
                    <br />
                    ● User experience planning
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Mobile State Management:
                    </span>
                    <br />
                    ● Screen-level state
                    <br />
                    ● Form state
                    <br />
                    ● Editor state
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Debugging:</span>
                    <br />
                    ● State bugs
                    <br />
                    ● UI rendering issues
                    <br />
                    ● Data synchronization issues
                    <br />
                    ● Property mismatch debugging
                    <br />
                    <br />
                    <em>
                      Example: Tracked and fixed the Notes editor font bug
                      caused by:
                    </em>
                    <br />
                    ● Notes storing font
                    <br />
                    ● Logic reading fontSize
                    <br />● Migration and fallback handling
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("expo")}
                    >
                      {currentID === "expo" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="expo" onClick={() => handleSkillToggle("expo")}>
                    <span>Expo</span>
                  </p>
                </div>
                {currentID === "expo" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Expo Ecosystem:</span>
                    <br />
                    ● Expo project setup
                    <br />
                    ● Expo app configuration
                    <br />
                    ● Asset management
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>App Configuration:</span>
                    <br />
                    ● app.json
                    <br />
                    ● Icons
                    <br />
                    ● Splash screens
                    <br />
                    ● Adaptive icons
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Build & Deployment:
                    </span>
                    <br />
                    ● Android builds
                    <br />
                    ● APK generation
                    <br />
                    ● Deployment preparation
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Expo Debugging:</span>
                    <br />
                    ● Adaptive icon troubleshooting
                    <br />
                    ● Asset configuration debugging
                    <br />● Build issue investigation
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("firebase")}
                    >
                      {currentID === "firebase" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p
                    id="firebase"
                    onClick={() => handleSkillToggle("firebase")}
                  >
                    <span>Firebase</span>
                  </p>
                </div>
                {currentID === "firebase" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Authentication:</span>
                    <br />
                    ● Firebase Auth
                    <br />
                    ● User registration
                    <br />
                    ● Login flow
                    <br />
                    ● Authentication state handling
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Firestore Database:
                    </span>
                    <br />
                    ● Reading documents
                    <br />
                    ● Writing documents
                    <br />
                    ● Updating documents
                    <br />
                    ● Deleting documents
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Cloud Data Synchronization:
                    </span>
                    <br />
                    ● User-specific data
                    <br />
                    ● Notes synchronization
                    <br />
                    ● Lists synchronization
                    <br />
                    ● Real-time-ish app data flow
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Data Modeling:</span>
                    <br />
                    ● User collections
                    <br />
                    ● Note structures
                    <br />
                    ● List structures
                    <br />● Firestore document organization
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("backend")}
                    >
                      {currentID === "backend" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="backend" onClick={() => handleSkillToggle("backend")}>
                    <span>Backend Concepts</span>
                  </p>
                </div>
                {currentID === "backend" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <em>
                      Although Firebase handles much of the backend
                      infrastructure, I've already worked with:
                    </em>
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Backend Logic:</span>
                    <br />
                    ● CRUD operations
                    <br />
                    ● User-based data access
                    <br />
                    ● Data persistence
                    <br />
                    ● State synchronization
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Database Concepts:</span>
                    <br />
                    ● Collections
                    <br />
                    ● Documents
                    <br />
                    ● Querying data
                    <br />
                    ● Data relationships
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Authentication Concepts:
                    </span>
                    <br />
                    ● Session management
                    <br />
                    ● User identity
                    <br />● Protected user data
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("git")}
                    >
                      {currentID === "git" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="git" onClick={() => handleSkillToggle("git")}>
                    <span>Git & GitHub</span>
                  </p>
                </div>
                {currentID === "git" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Version Control:</span>
                    <br />
                    ● Commits
                    <br />
                    ● Repository management
                    <br />
                    ● Branch awareness
                    <br />
                    ● Change tracking
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>GitHub:</span>
                    <br />
                    ● Project hosting
                    <br />
                    ● Repository maintenance
                    <br />
                    ● Issue investigation
                    <br />
                    ● Deployment workflows
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Open Source Familiarity:
                    </span>
                    <br />
                    ● Reading issues
                    <br />
                    ● Debugging community-reported problems
                    <br />● Comparing repository behavior
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("deploy")}
                    >
                      {currentID === "deploy" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="deploy" onClick={() => handleSkillToggle("deploy")}>
                    <span>Deployment & Hosting</span>
                  </p>
                </div>
                {currentID === "deploy" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Railway:</span>
                    <br />
                    ● Deployment concepts
                    <br />
                    ● Application hosting
                    <br />
                    ● Backend service deployment awareness
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      General Deployment Knowledge:
                    </span>
                    <br />
                    ● Production builds
                    <br />
                    ● Environment management
                    <br />
                    ● Hosting workflows
                    <br />● Release preparation
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("scheduling")}
                    >
                      {currentID === "scheduling" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p
                    id="scheduling"
                    onClick={() => handleSkillToggle("scheduling")}
                  >
                    <span>Scheduling & Automation</span>
                  </p>
                </div>
                {currentID === "scheduling" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>Cron Jobs:</span>
                    <br />
                    ● Understanding scheduled tasks
                    <br />
                    ● Background execution concepts
                    <br />
                    ● Automation workflows
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      General Automation Concepts:
                    </span>
                    <br />
                    ● Timed operations
                    <br />
                    ● Periodic updates
                    <br />● Backend task scheduling
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("application")}
                    >
                      {currentID === "application" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p
                    id="application"
                    onClick={() => handleSkillToggle("application")}
                  >
                    <span>Application Architecture</span>
                  </p>
                </div>
                {currentID === "application" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>
                      Large Project Organization:
                    </span>
                    <br />
                    <em>
                      Your Space App includes multiple interconnected systems:
                    </em>
                    <br />
                    ● Notes
                    <br />
                    ● Lists
                    <br />
                    ● Calendar
                    <br />
                    ● Mindmap
                    <br />
                    ● Archive
                    <br />
                    ● Bin/Trash
                    <br />
                    ● Authentication
                    <br />
                    ● Cloud Sync
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Architectural Skills:
                    </span>
                    <br />
                    ● Feature separation
                    <br />
                    ● Shared data models
                    <br />
                    ● Screen organization
                    <br />
                    ● State flow planning
                    <br />● Cross-feature integration
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("uiux")}
                    >
                      {currentID === "uiux" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="uiux" onClick={() => handleSkillToggle("uiux")}>
                    <span>UI/UX Development</span>
                  </p>
                </div>
                {currentID === "uiux" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <span style={{ color: "#1877f2" }}>
                      Productivity App Design:
                    </span>
                    <br />
                    ● Note-taking interfaces
                    <br />
                    ● List management interfaces
                    <br />
                    ● Calendar interfaces
                    <br />
                    ● Mindmap interfaces
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>UX Thinking:</span>
                    <br />
                    ● User workflows
                    <br />
                    ● Editor experiences
                    <br />
                    ● Data organization
                    <br />
                    ● Feature discoverability
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Animation Planning:
                    </span>
                    <br />
                    <em>You've specifically discussed:</em>
                    <br />
                    ● Google Keep-style interactions
                    <br />
                    ● Note expansion animations
                    <br />
                    ● Scale transitions
                    <br />
                    ● Fade animations
                    <br />
                    ● Shared-element style experiences
                    <br />● Smooth editor transitions
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("debugging")}
                    >
                      {currentID === "debugging" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p
                    id="debugging"
                    onClick={() => handleSkillToggle("debugging")}
                  >
                    <span>Debugging & Problem Solving</span>
                  </p>
                </div>
                {currentID === "debugging" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <em>One of your strongest demonstrated skills.</em>
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Debugging Areas:</span>
                    <br />
                    ● State bugs
                    <br />
                    ● Rendering bugs
                    <br />
                    ● Data-model mismatches
                    <br />
                    ● Firebase synchronization issues
                    <br />
                    ● Expo configuration issues
                    <br />
                    ● UI behavior issues
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>
                      Debugging Approach:
                    </span>
                    <br />
                    ● Trace data flow
                    <br />
                    ● Inspect object structures
                    <br />
                    ● Verify property names
                    <br />
                    ● Compare expected vs actual state
                    <br />● Test assumptions systematically
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("growth")}
                    >
                      {currentID === "growth" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="growth" onClick={() => handleSkillToggle("growth")}>
                    <span>Current Growth Areas</span>
                  </p>
                </div>
                {currentID === "growth" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    <em>These are areas I'm interested in moving toward:</em>
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Near-Term:</span>
                    <br />
                    ● Advanced React Native
                    <br />
                    ● TypeScript
                    <br />
                    ● Better application architecture
                    <br />
                    ● Performance optimization
                    <br />
                    ● Technical interview preparation
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Mid-Term:</span>
                    <br />
                    ● Android Development
                    <br />
                    ● Kotlin
                    <br />
                    ● Native Android APIs
                    <br />
                    <br />
                    <span style={{ color: "#1877f2" }}>Long-Term:</span>
                    <br />
                    ● AOSP
                    <br />
                    ● Linux kernels
                    <br />
                    ● Embedded systems
                    <br />
                    ● Raspberry Pi
                    <br />
                    ● Hardware programming
                    <br />
                    ● Electronics
                    <br />● Device/phone development
                  </p>
                )}

                <div className="flex-row">
                  <p>
                    <span
                      className="circle"
                      onClick={() => handleSkillToggle("summary")}
                    >
                      {currentID === "summary" ? "-" : "+"}
                    </span>{" "}
                  </p>
                  <p id="summary" onClick={() => handleSkillToggle("summary")}>
                    <span>Current Skill Stack Summary</span>
                  </p>
                </div>
                {currentID === "summary" && (
                  <p style={{ marginBottom: "15px", marginLeft: "12px" }}>
                    Frontend: JavaScript • React • React Native • Expo
                    <br />
                    <br />
                    Backend: Firebase • Authentication • Firestore
                    <br />
                    <br />
                    Development Tools: Git • GitHub
                    <br />
                    <br />
                    Deployment: Railway • Mobile app deployment
                    <br />
                    <br />
                    Architecture: Multi-feature application design • Cloud
                    synchronization • State management
                    <br />
                    <br />
                    Strengths:
                    <br />
                    ● Building real projects
                    <br />
                    ● Debugging
                    <br />
                    ● UI/UX thinking
                    <br />
                    ● Feature integration
                    <br />
                    ● Persistence on complex problems
                    <br />
                  </p>
                )}
              </div>
            </div> */}
          </div>
        </div>
        <div className="plastic-wrapper">
          {techSkillClicked && (
            <div className="facebook-post">
              <div className="post-header">
                <div className="post-info">
                  <div className="profile-picture-small-wrapper">
                    <div className="profile-picture-small"></div>
                  </div>
                  <div className="post-dtls">
                    <div>
                      <div>
                        <p>
                          Abhishek kabi{" "}
                          <span style={{ color: "gray", fontSize: "12px" }}>
                            Updated his profile picture
                          </span>
                        </p>
                      </div>
                    </div>

                    <p>
                      <span
                        style={{
                          color: "gray",
                          fontSize: "12px",
                          marginLeft: "-124px",
                        }}
                      >
                        8 Jun 2026
                      </span>{" "}
                      <i
                        class="fa-solid fa-earth-americas"
                        style={{ fontSize: "12px" }}
                      ></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="post-text">
                <p>Just another day building software...📱💻</p>
              </div>

              <div className="post-wrapper">
                <div className="profile-picture-small-post"></div>
              </div>

              <div className="placeholder"></div>
              <div className="reaction-buttons-div">
                <div className="reaction-button">
                  <button
                    className="react-button"
                    onClick={() => handleLikeBtn()}
                  >
                    <i
                      class="fa-regular fa-thumbs-up"
                      style={{ color: likeCount ? "blue" : "gray" }}
                    ></i>
                  </button>
                  <button className="react-button">
                    <i
                      class="fa-regular fa-comment"
                      style={{ color: "gray" }}
                    ></i>
                  </button>
                  <button className="react-button">
                    <i
                      class="fa-regular fa-share-from-square"
                      style={{ color: "gray" }}
                    ></i>
                  </button>
                </div>
                <div className="like-count-div">
                  <div style={{ marginRight: "10px" }} className="xxx">
                    <i class="fa-regular fa-thumbs-up"></i>
                  </div>
                  <div>
                    <p>{totalLikes}</p>
                  </div>
                </div>
              </div>
              <div className="post-divider">
                <div className="noposttext">
                  <p
                    style={{
                      color: "gray",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    End of posts
                  </p>
                </div>
              </div>
            </div>
          )}
          {myPhotosClicked && (
            <div className="about">
              {/* <div className="about-text">
                <h2>About</h2>
              </div> */}
              <div className="photo-wrapper">
                <div className="profile-picture-about"></div>
              </div>
              <p className="my-about">
                Hi, I'm Abhishek, a self-taught software developer with a
                passion for building things and understanding how they work. My
                journey into technology started with curiosity—taking apart
                gadgets, exploring computers, and constantly asking questions.{" "}
                Over the years, that curiosity evolved into a love for software
                development, especially with React, React Native, and Firebase.{" "}
                <br /> <br />I enjoy creating products that solve real problems,
                from productivity apps to interactive web experiences. One of my
                biggest projects is Space App, a productivity platform that
                combines notes, lists, calendars, and mind maps into a single
                experience. I believe that building projects is one of the best
                ways to learn, which is why I focus on creating complete,
                working applications rather than just tutorials. Debugging and
                problem-solving are some of my favorite parts of development
                because they challenge me to think deeply and creatively. <br />{" "}
                <br /> Beyond software, I'm interested in Android development,
                system-level programming, and learning how technology works
                beneath the surface. Right now, my goal is to continue growing
                as a developer while turning my skills into meaningful
                professional opportunities. I'm always excited to learn,
                improve, and build something better than I built yesterday.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
