import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "./firebase";
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";

function Profile() {
  const [activeButton, setActiveButton] = useState("tech");
  const [techSkillClicked, setTechSkillClicked] = useState(true);
  const [myPhotosClicked, setMyPhotosClicked] = useState(false);

  // Separate like states for each post
  const [likeCount1, setLikeCount1] = useState(
    localStorage.getItem("portfolio-liked-1") === "true",
  );
  const [likeCount2, setLikeCount2] = useState(
    localStorage.getItem("portfolio-liked-2") === "true",
  );
  const [likeCount3, setLikeCount3] = useState(
    localStorage.getItem("portfolio-liked-3") === "true",
  );

  const [totalLikes1, setTotalLikes1] = useState(0);
  const [totalLikes2, setTotalLikes2] = useState(0);
  const [totalLikes3, setTotalLikes3] = useState(0);

  useEffect(() => {
    loadLikes();
  }, []);

  const loadLikes = async () => {
    try {
      // Load likes for post 1
      const docRef1 = doc(db, "portfolio", "post1");
      const snap1 = await getDoc(docRef1);
      if (snap1.exists()) {
        setTotalLikes1(snap1.data().likes || 0);
      } else {
        // Initialize the document if it doesn't exist
        await setDoc(docRef1, { likes: 0 });
        setTotalLikes1(0);
      }

      // Load likes for post 2
      const docRef2 = doc(db, "portfolio", "post2");
      const snap2 = await getDoc(docRef2);
      if (snap2.exists()) {
        setTotalLikes2(snap2.data().likes || 0);
      } else {
        await setDoc(docRef2, { likes: 0 });
        setTotalLikes2(0);
      }

      // Load likes for post 3
      const docRef3 = doc(db, "portfolio", "post3");
      const snap3 = await getDoc(docRef3);
      if (snap3.exists()) {
        setTotalLikes3(snap3.data().likes || 0);
      } else {
        await setDoc(docRef3, { likes: 0 });
        setTotalLikes3(0);
      }
    } catch (error) {
      console.error("Error loading likes:", error);
    }
  };

  const getBackGroundColor = (id) => {
    setActiveButton(id);
  };

  // Separate handler functions for each post
  const handleLikeBtn1 = async () => {
    try {
      const docRef = doc(db, "portfolio", "post1");

      if (likeCount1) {
        setLikeCount1(false);
        localStorage.removeItem("portfolio-liked-1");
        await updateDoc(docRef, { likes: increment(-1) });
        setTotalLikes1((prev) => prev - 1);
      } else {
        setLikeCount1(true);
        localStorage.setItem("portfolio-liked-1", "true");
        await updateDoc(docRef, { likes: increment(1) });
        setTotalLikes1((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating likes for post 1:", error);
    }
  };

  const handleLikeBtn2 = async () => {
    try {
      const docRef = doc(db, "portfolio", "post2");

      if (likeCount2) {
        setLikeCount2(false);
        localStorage.removeItem("portfolio-liked-2");
        await updateDoc(docRef, { likes: increment(-1) });
        setTotalLikes2((prev) => prev - 1);
      } else {
        setLikeCount2(true);
        localStorage.setItem("portfolio-liked-2", "true");
        await updateDoc(docRef, { likes: increment(1) });
        setTotalLikes2((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating likes for post 2:", error);
    }
  };

  const handleLikeBtn3 = async () => {
    try {
      const docRef = doc(db, "portfolio", "post3");

      if (likeCount3) {
        setLikeCount3(false);
        localStorage.removeItem("portfolio-liked-3");
        await updateDoc(docRef, { likes: increment(-1) });
        setTotalLikes3((prev) => prev - 1);
      } else {
        setLikeCount3(true);
        localStorage.setItem("portfolio-liked-3", "true");
        await updateDoc(docRef, { likes: increment(1) });
        setTotalLikes3((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating likes for post 3:", error);
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
            <i className="fa-solid fa-user-plus white"></i> Add friend
          </button>
          <button className="profile-action-button themed">
            <i className="fa-brands fa-facebook-messenger"></i> Message
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
                  <i className="fa-regular fa-map proficon"></i>
                </div>
                <div>
                  <i className="fa-solid fa-graduation-cap proficon"></i>
                </div>
                <div>
                  <i className="fa-solid fa-house proficon"></i>
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
                  <i className="fa-solid fa-business-time proficon"></i>
                </div>
              </div>
              <div className="details-holder-dtls">
                <p>Full Stack Engineer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="plastic-wrapper">
          {techSkillClicked && (
            <div>
              {/* Post 1 */}
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
                            <span style={{ fontWeight: "bold" }}>
                              Abhishek kabi
                            </span>{" "}
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
                            marginLeft: "-79px",
                          }}
                        >
                          8 Jun 2026
                        </span>{" "}
                        <i
                          className="fa-solid fa-earth-americas"
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
                    <button className="react-button" onClick={handleLikeBtn1}>
                      <i
                        className="fa-regular fa-thumbs-up"
                        style={{ color: likeCount1 ? "blue" : "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-comment"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-share-from-square"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                  </div>
                  <div className="like-count-div">
                    <div style={{ marginRight: "10px" }} className="xxx">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div>
                      <p>{totalLikes1}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
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
                            <span style={{ fontWeight: "bold" }}>
                              Abhishek kabi
                            </span>{" "}
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
                            marginLeft: "-79px",
                          }}
                        >
                          15 May 2026
                        </span>{" "}
                        <i
                          className="fa-solid fa-earth-americas"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="post-text">
                  <p>BTM Bangalore, FAB Hotel.</p>
                </div>
                <div className="post-wrapper">
                  <div className="post-upload"></div>
                </div>
                <div className="placeholder"></div>
                <div className="reaction-buttons-div">
                  <div className="reaction-button">
                    <button className="react-button" onClick={handleLikeBtn2}>
                      <i
                        className="fa-regular fa-thumbs-up"
                        style={{ color: likeCount2 ? "blue" : "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-comment"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-share-from-square"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                  </div>
                  <div className="like-count-div">
                    <div style={{ marginRight: "10px" }} className="xxx">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div>
                      <p>{totalLikes2}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 3 */}
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
                            <span style={{ fontWeight: "bold" }}>
                              Abhishek kabi
                            </span>{" "}
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
                            marginLeft: "-79px",
                          }}
                        >
                          6 May 2026
                        </span>{" "}
                        <i
                          className="fa-solid fa-earth-americas"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="post-text">
                  <p>🤳</p>
                </div>
                <div className="post-wrapper">
                  <div className="post-upload-two"></div>
                </div>
                <div className="placeholder"></div>
                <div className="reaction-buttons-div">
                  <div className="reaction-button">
                    <button className="react-button" onClick={handleLikeBtn3}>
                      <i
                        className="fa-regular fa-thumbs-up"
                        style={{ color: likeCount3 ? "blue" : "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-comment"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                    <button className="react-button">
                      <i
                        className="fa-regular fa-share-from-square"
                        style={{ color: "gray" }}
                      ></i>
                    </button>
                  </div>
                  <div className="like-count-div">
                    <div style={{ marginRight: "10px" }} className="xxx">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                    <div>
                      <p>{totalLikes3}</p>
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
            </div>
          )}

          {myPhotosClicked && (
            <div className="about">
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
