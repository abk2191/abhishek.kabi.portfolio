import { useState, useEffect } from "react";

function Banner() {
  // const [slide, setSlide] = useState(1);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSlide((prev) => (prev % 3) + 1);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="banner-container">
      <img src="/Untitled.png" className="banner-image" alt="Banner" />
    </div>
  );
}

export default Banner;
