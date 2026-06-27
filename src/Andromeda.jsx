import "./project-styles.css";
import { useState, useEffect, useRef } from "react";
import DownloadPage from "./DownloadPage";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const codeString = `
  // Typical state structure in the root component
  const [notes, setNotes] = useState([]);
  const [lists, setLists] = useState([]);
  const [mindmaps, setMindmaps] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [events, setEvents] = useState([]);
  const [moods, setMoods] = useState([]);
  `;

  const codeString2 = `
  // Example from Calendar.js - saving events
const saveEvents = async (eventsData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(eventsData));
  } catch (error) {
    console.error('Error saving events:', error);
  }
};

// Loading data on app startup
useEffect(() => {
  loadEvents();
  loadMoods();
  loadDateColors();
}, []);
  `;

  const codeString3 = `
  // From Login.js - Google Sign-In
const handleGoogleSignIn = async () => {
  setLoading(true);
  const result = await signInWithGoogle();
  setLoading(false);
  
  if (result.success) {
    onLoginSuccess(result.user);
  } else {
    Alert.alert("Login Failed", result.error || "Something went wrong");
  }
};
  `;

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
                  Theory is a comprehensive mobile productivity application
                  developed by iINTUIT Labs that serves as a central hub for
                  personal knowledge management, integrating multiple content
                  types into a single, cohesive platform. The app features a
                  clean, intuitive interface with full dark/light theme support
                  and Google Sign-In authentication for data synchronization.
                  <br />
                  <br />
                  <span className="prod-desc-head">Notes</span>
                  <br /> Notes is the primary content creation tool that allows
                  users to capture and organize their thoughts in a flexible,
                  customizable format with a two-column grid layout. Notes can
                  be pinned, searched, archived, or moved to the bin, with the
                  editor modal providing a full-screen writing experience with
                  adjustable font sizes and automatic saving.
                  <br />
                  <br />
                  <span className="prod-desc-head">Drawing</span>
                  <br /> Drawing is a creative canvas tool built on the
                  high-performance Skia graphics library that allows users to
                  sketch and create visual content with smooth rendering and
                  responsive touch interactions. Users can choose from twelve
                  distinct colors and adjust stroke widths, with each drawing
                  saved with a timestamp and stroke count for easy reference.
                  <br />
                  <br />
                  <span className="prod-desc-head">Lists</span>
                  <br /> Lists is a comprehensive task management system that
                  enables users to create and track checklists with a title and
                  dynamic collection of tasks that can be added, completed, or
                  removed in real-time. Tasks are displayed with interactive
                  checkboxes and progress summaries, with lists being
                  color-coded, pinned, and automatically saved when the editor
                  is closed.
                  <br />
                  <br />
                  <span className="prod-desc-head">Calendar</span>
                  <br /> Calendar is a full-featured event management and
                  scheduling system that displays a monthly grid view where each
                  day is represented as a cell with visual indicators showing
                  which dates have events scheduled. Users can navigate between
                  months, toggle to a year view, set multi-day events, log daily
                  moods, and schedule reminders using the integrated
                  notification system.
                  <br />
                  <br />
                  <span className="prod-desc-head">Mindmap</span>
                  <br /> Mindmap is a visual thinking and brainstorming tool
                  that allows users to create hierarchical diagrams for
                  organizing ideas using a tree-based architecture with
                  unlimited nesting depth. Each node features editable text and
                  customizable colors from a palette of sixteen options, with
                  zoom controls and full CRUD operations including creation,
                  editing, deletion, and archiving.
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
                    The Theory app follows a component-based architecture using
                    React Native, with a unidirectional data flow pattern where
                    state is managed at the parent component level and passed
                    down to child components via props. The application is
                    structured as a single-page application (SPA) with a
                    navigation system powered by a sidebar that switches between
                    different content views.
                  </p>

                  <p className="code-div-heading">State Management Pattern</p>
                  <p className="code-div-desc">
                    The app employs a lifted state approach where all data
                    (notes, lists, mindmaps, drawings, calendar events) is
                    maintained in the root App.js component (implied) and passed
                    down to child components. This creates a single source of
                    truth and simplifies data persistence.
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
                    {codeString}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Data Persistence Strategy</p>
                  <p className="code-div-desc">
                    All data is persisted locally using
                    @react-native-async-storage/async-storage. Each content type
                    has dedicated storage keys, and data is serialized to JSON
                    before storage.
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
                    {codeString2}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Firebase Authentication</p>
                  <p className="code-div-desc">
                    User authentication is handled through Firebase
                    Authentication with Google Sign-In integration. The
                    signInWithGoogle() function from the firebase service
                    manages the OAuth flow.
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
                    {codeString3}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">
                    Component Communication Pattern
                  </p>
                  <p className="code-div-desc">
                    The app extensively uses prop drilling to pass both data and
                    functions down the component tree. Each screen component
                    receives data arrays, setter functions for state updates,
                    and CRUD operation functions (create, update, delete,
                    archive, restore).
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
                    {`// Notes.js receives numerous props for data manipulation
export default function Notes({
  notes,
  setNotes,
  notesSearchTerm,
  setNotesSearchTerm,
  notesShowSearch,
  setNotesShowSearch,
  isDarkTheme = false,
  createNote,
  updateNote,
  deleteNote,
  changeNoteColor,
  toggleNotePin,
  archiveNote,
  updateFontSize,
  onOpenNoteEditor,
}) {
  // Component logic...
}`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Modal-Based Editing</p>
                  <p className="code-div-desc">
                    Each content type uses a full-screen modal for editing. The
                    modal slides up from the bottom with smooth animations using
                    React Native's Animated API.
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
                    {`// From NoteEditorModal.js - Animation setup
const slideAnim = useRef(new Animated.Value(screenHeight)).current;
const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  if (visible && note) {
    // Start slide up animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }
}, [visible, note]);`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Content Management Systems</p>
                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Notes System
                  </p>
                  <p className="code-div-desc">
                    The Notes system features a two-column grid layout with
                    pinned/unpinned sections. Each note card displays a
                    truncated preview and includes color customization. Notes
                    and Lists use a predefined color array with both background
                    and text color pairs.
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
                    {`// Notes.js - Rendering notes in a flex grid
const renderFlexSection = (postsArray, sectionTitle, showTitle = true) => {
  return (
    <View>
      {showTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
      <View style={styles.flexContainer}>
        {postsArray.map((note) => (
          <View key={note.id} style={styles.flexItem}>
            {renderCard(note)}
          </View>
        ))}
      </View>
    </View>
  );
};

// Color system
const COLOR_ARRAY = [
  { bg: "#e5e3e3", text: "#202124" },
  { bg: "#1A237E", text: "#E8EAF6" },
  { bg: "#1B5E20", text: "#E8F5E9" },
  // ... more color combinations
];`}
                  </SyntaxHighlighter>

                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Lists System
                  </p>
                  <p className="code-div-desc">
                    Lists implement a task management system with checkbox
                    toggling. Each list tracks task completion status and
                    displays progress.
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
                    {`// ListEditorModal.js - Task rendering with checkbox
const renderTaskItem = ({ item }) => (
  <View style={styles.taskItem}>
    <TouchableOpacity onPress={() => handleToggleTaskCompletion(item.id)}>
      <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
        {item.completed && <Feather name="check" size={12} color="#fff" />}
      </View>
    </TouchableOpacity>
    <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
      {item.text}
    </Text>
    <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
      <Feather name="trash-2" size={16} color="#999" />
    </TouchableOpacity>
  </View>
);`}
                  </SyntaxHighlighter>

                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Mindmap System
                  </p>
                  <p className="code-div-desc">
                    The Mindmap uses a tree structure where each node has: id
                    (unique identifier), text (node content), parentId
                    (reference to parent node, null for root), children (array
                    of child node IDs), and color/textColor for visual styling.
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
                    {`// Mindmap.js - Rendering a node with its children recursively
const renderNode = (node, level = 0) => {
  const children = node.children
    .map((id) => activeMindmap?.nodes.find((n) => n.id === id))
    .filter(Boolean);
  
  return (
    <View style={[styles.nodeContainer, { marginLeft: level === 0 ? 0 : 20 }]}>
      <View style={[styles.node, { backgroundColor: node.color }]}>
        <TextInput
          style={[styles.nodeText, { color: node.textColor }]}
          value={node.text}
          onChangeText={(text) => updateMindmapNode(node.id, { text })}
          multiline
        />
      </View>
      {/* Controls for adding children, changing color, deleting */}
      {children.length > 0 && (
        <View style={styles.children}>
          {children.map((child) => renderNode(child, level + 1))}
        </View>
      )}
    </View>
  );
};`}
                  </SyntaxHighlighter>

                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Drawing System
                  </p>
                  <p className="code-div-desc">
                    The Drawing tool uses Skia (@shopify/react-native-skia) for
                    high-performance canvas rendering and PanResponder for
                    gesture handling.
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
                    {`// Drawing.js - PanResponder setup for stroke capture
const panResponder = useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const newPath = {
        id: Date.now().toString(),
        points: [{ x: locationX, y: locationY }],
        color: selectedColorRef.current,
        width: strokeWidthRef.current,
      };
      currentPathRef.current = newPath;
      setCurrentPath(newPath);
    },
    
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      currentPathRef.current = {
        ...currentPathRef.current,
        points: [...currentPathRef.current.points, { x: locationX, y: locationY }],
      };
      setCurrentPath({ ...currentPathRef.current });
    },
    
    onPanResponderRelease: () => {
      if (currentPathRef.current?.points.length > 1) {
        setPaths((prev) => [...prev, currentPathRef.current]);
      }
      setCurrentPath(null);
    },
  })
).current;

// Canvas rendering with Skia
const renderPath = (pathData) => {
  const p = Skia.Path.Make();
  const first = pathData.points[0];
  p.moveTo(first.x, first.y);
  pathData.points.slice(1).forEach((point) => {
    p.lineTo(point.x, point.y);
  });
  
  return (
    <Path
      key={pathData.id}
      path={p}
      color={pathData.color}
      style="stroke"
      strokeWidth={pathData.width}
    />
  );
};`}
                  </SyntaxHighlighter>

                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Calendar System
                  </p>
                  <p className="code-div-desc">
                    The Calendar implements a monthly grid view with event
                    tracking, mood logging, and color coding. Events are stored
                    with a date key system (YYYY-M-D) for efficient lookups.
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
                    {`// Calendar.js - Event object structure
{
  id: timestamp,
  name: "Event Name",
  description: "Event Description",
  time: "14:30",
  location: "Venue",
  startDate: 15,
  endDate: 17,
  totalDays: 3,
  eventDates: [15, 16, 17],
  dateKeys: ["2026-6-15", "2026-6-16", "2026-6-17"],
  month: 5, // June (0-indexed)
  year: 2026
}

// Date key system
const hasEventsForDate = (date) => {
  const dateKey = \`\${currentYear}-\${currentMonth + 1}-\${date}\`;
  return events.some((item) => 
    item.dateKeys && item.dateKeys.includes(dateKey)
  );
};

// Year view - generates a 12-month grid
const getAllMonthsForYear = (year) => {
  const monthsData = [];
  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    // Build weeks array for this month...
    monthsData.push({ monthNumber: month, monthName: ..., weeks, totalDays });
  }
  return monthsData;
};`}
                  </SyntaxHighlighter>

                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Archive and Deleted Systems
                  </p>
                  <p className="code-div-desc">
                    Both Archive and Deleted components share similar logic for
                    managing content lifecycle with restore and permanent delete
                    options.
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
                    {`// Archive.js - Rendering archived notes with restore/delete options
const renderNoteCard = (note) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: note.color }]}>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: note.textcolor }]}>
          {note.title || "Untitled"}
        </Text>
        <Text style={[styles.cardText, { color: note.textcolor }]}>
          {truncatedText}
        </Text>
        <Text style={[styles.cardDate, { color: note.textcolor }]}>
          Archived on: {note.date}
        </Text>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => handleRestoreNote(note)}>
            <Feather name="refresh-cw" size={18} color={note.textcolor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePermanentDeleteNote(note)}>
            <Feather name="trash-2" size={18} color={note.textcolor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Theme System</p>
                  <p className="code-div-desc">
                    The app implements a dynamic theme system that affects all
                    components. Theme state is managed at the root level and
                    passed down through props.
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
                    {`// Settings.js - Theme toggle
const [isDarkTheme, setIsDarkTheme] = useState(false);

// Each component checks isDarkTheme for styling
const getBackgroundColor = () => {
  return isDarkTheme ? "#1a1a1a" : "#f5f5f5";
};

const getTextColor = () => {
  return isDarkTheme ? "#FFFFFF" : "#000033";
};`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Navigation Architecture</p>
                  <p
                    className="code-div-heading"
                    style={{ fontSize: "16px", marginTop: "10px" }}
                  >
                    Sidebar Navigation
                  </p>
                  <p className="code-div-desc">
                    The Sidebar component uses Animated API for smooth
                    slide-in/slide-out transitions. The navigation state is
                    managed at the parent level. The sidebar is divided into
                    main content items and system items with visual separation.
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
                    {`// Sidebar.js - Animation logic
const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
const overlayOpacity = useRef(new Animated.Value(0)).current;

useEffect(() => {
  if (isVisible) {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }
}, [isVisible]);

// Menu structure
const menuItems = [
  { name: "Notes", icon: "note-sticky", label: "Notes" },
  { name: "Drawing", icon: "palette", label: "Drawing" },
  { name: "Lists", icon: "list-check", label: "Lists" },
  { name: "Calendar", icon: "calendar-days", label: "Calendar" },
  { name: "Mindmap", icon: "brain", label: "Mind Map" },
];

const systemitems = [
  { name: "Archive", icon: "box-archive", label: "Archive" },
  { name: "Deleted", icon: "trash-can", label: "Bin" },
  { name: "Settings", icon: "gear", label: "Settings" },
];`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Notification System</p>
                  <p className="code-div-desc">
                    The Calendar component integrates with Expo Notifications
                    for reminder functionality.
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
                    {`// NotificationModal.js - Scheduling notifications
const scheduleReminder = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;
  
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: \`Reminder for \${day} \${date}\`,
      body: note,
      data: { date: selectedDate, month: currentMonth, year: currentYear },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDateTime,
      channelId: "calendar_reminders",
    },
  });
};`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Search Functionality</p>
                  <p className="code-div-desc">
                    Both Notes and Lists implement real-time search with
                    case-insensitive matching.
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
                    {`// Notes.js - Filtering notes by search term
const filteredNotes = notesSearchTerm.trim() === ""
  ? notes
  : notes.filter(
      (note) =>
        note.sentence.toLowerCase().includes(notesSearchTerm.toLowerCase()) ||
        note.title.toLowerCase().includes(notesSearchTerm.toLowerCase())
    );`}
                  </SyntaxHighlighter>

                  <p className="code-div-heading">Data Flow Summary</p>
                  <p className="code-div-desc">
                    User Action → Component triggers an event (e.g., adding a
                    note)
                    <br />
                    State Update → Parent state is updated via setter functions
                    <br />
                    Re-render → React re-renders affected components
                    <br />
                    Persistence → Data is saved to AsyncStorage
                    <br />
                    User Feedback → UI updates reflect the new state
                  </p>
                  <p className="code-div-desc" style={{ marginTop: "10px" }}>
                    This architecture ensures data consistency, smooth user
                    interactions, and reliable persistence across all
                    application features.
                  </p>
                </div>
              )}
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
