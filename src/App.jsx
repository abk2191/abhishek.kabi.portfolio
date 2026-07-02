import { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Banner from "./Banner";
import Intro from "./Intro";
import Profile from "./Profile";
import Contact from "./Contact";
import Game from "./Game";
import Andromeda from "./Andromeda";
import ProximaCalculator from "./ProximaCalculator";
import ScratchPad from "./ScratchPad";
import SourceCode from "./SourceCode";
import TicTacToe from "./tic-tac-toe-ai";

function App() {
  //****************************************************************************************/
  //******************************** SIDEBAR LOGIC *****************************************/
  //****************************************************************************************/

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shouldRenderSidebar, setShouldRenderSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [projectsClicked, setProjectsClicked] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const [currentButtonID, setCurrentButtonId] = useState("");
  const [tryButtonClicked, setTryButtonClicked] = useState("");
  const isDevelopment = import.meta.env.DEV;
  const basename = isDevelopment ? "/" : "/abhishek.kabi.26/";

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Define closeSidebar first
  const closeSidebar = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsSidebarOpen(false);

    if (sidebarRef.current) {
      sidebarRef.current.classList.remove("sidebar-open");
      sidebarRef.current.classList.add("sidebar-close");
    }

    // Unlock body scroll
    document.body.style.overflow = "";

    animationTimeoutRef.current = setTimeout(() => {
      setShouldRenderSidebar(false);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  // Then define toggleSidebar that uses closeSidebar
  const toggleSidebar = useCallback(() => {
    if (showDownloadPage) return;
    if (isAnimating) return;

    if (!isSidebarOpen) {
      setIsAnimating(true);
      setShouldRenderSidebar(true);
      setIsSidebarOpen(true);

      // Lock body scroll when sidebar opens
      document.body.style.overflow = "hidden";

      // Reset animation state after opening
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } else {
      closeSidebar();
    }
  }, [isSidebarOpen, isAnimating, closeSidebar, showDownloadPage]);

  // Add open class after sidebar mounts
  useEffect(() => {
    if (shouldRenderSidebar && sidebarRef.current) {
      // Small delay to ensure DOM is ready
      animationTimeoutRef.current = setTimeout(() => {
        if (sidebarRef.current) {
          sidebarRef.current.classList.add("sidebar-open");
          sidebarRef.current.classList.remove("sidebar-close");
        }
      }, 10);
    }
  }, [shouldRenderSidebar]);

  // Close sidebar when clicking outside OR pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isHamburgerClick = hamburgerRef.current?.contains(event.target);
      const isThemeToggleClick = event.target.closest(".theme-toggle");
      const isMusicPlayerClick = event.target.closest(".play-button");

      if (
        sidebarRef.current &&
        isSidebarOpen &&
        !sidebarRef.current.contains(event.target) &&
        !isHamburgerClick &&
        !isThemeToggleClick &&
        !isMusicPlayerClick
      ) {
        closeSidebar();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSidebarOpen, closeSidebar]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isSidebarOpen]);

  //****************************************************************************************/
  //******************************** END OF SIDEBAR LOGIC **********************************/
  //****************************************************************************************/

  return (
    <Router>
      <div>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          isAnimating={isAnimating}
          toggleSidebar={toggleSidebar}
          hamburgerRef={hamburgerRef}
        />

        {shouldRenderSidebar && (
          <Sidebar
            sidebarRef={sidebarRef}
            closeSidebar={closeSidebar}
            shouldRender={shouldRender}
            setShouldRender={setShouldRender}
            projectsClicked={projectsClicked}
            setProjectsClicked={setProjectsClicked}
          />
        )}

        <Routes>
          <Route
            path="/abhishek.kabi.26"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/abhishek.kabi.26/"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Intro
                  toggleSidebar={toggleSidebar}
                  shouldRender={shouldRender}
                  setShouldRender={setShouldRender}
                  setProjectsClicked={setProjectsClicked}
                />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tic-tac-toe-ai" element={<TicTacToe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/game" element={<Game />} />
          <Route
            path="/space"
            element={
              <Andromeda
                setShowDownloadPage={setShowDownloadPage}
                showDownloadPage={showDownloadPage}
                setCurrentButtonId={setCurrentButtonId}
                currentButtonID={currentButtonID}
                setTryButtonClicked={setTryButtonClicked}
                tryButtonClicked={tryButtonClicked}
              />
            }
          />
          <Route
            path="/proxima-calculator"
            element={
              <ProximaCalculator
                setShowDownloadPage={setShowDownloadPage}
                showDownloadPage={showDownloadPage}
                setCurrentButtonId={setCurrentButtonId}
                currentButtonID={currentButtonID}
                setTryButtonClicked={setTryButtonClicked}
                tryButtonClicked={tryButtonClicked}
              />
            }
          />
          <Route path="/scratchpad" element={<ScratchPad />} />
          <Route path="/sourcecode" element={<SourceCode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
