import React from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({
  isSidebarOpen,
  isAnimating,
  toggleSidebar,
  hamburgerRef,
}) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Force a complete page reload to the correct home URL
    // This ensures the URL is exactly correct
    if (window.location.pathname !== "/abhishekkabi/") {
      window.location.href = "/abhishekkabi/";
    } else {
      // If already on home page, just navigate normally
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <button
          ref={hamburgerRef}
          className={`hamburger ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
          disabled={isAnimating}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ThemeToggle />
        <div className="logo">
          <div style={{ cursor: "pointer" }}>
            <p>ABHISHEK KABI</p>
          </div>
          <div>
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
