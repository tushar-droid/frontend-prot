import React, { useEffect, useRef, useState } from "react";
import "./overlay.css";

const frames = [
  "../src/assets/loadingIcons/loadingImage1.png",
  "../src/assets/loadingIcons/loadingImage2.png",
  "../src/assets/loadingIcons/loadingImage3.png",
  "../src/assets/loadingIcons/loadingImage4.png",
  "../src/assets/loadingIcons/loadingImage5.png",
  "../src/assets/loadingIcons/loadingImage6.png",
  "../src/assets/loadingIcons/loadingImage7.png",
  "../src/assets/loadingIcons/loadingImage8.png",
  "../src/assets/loadingIcons/loadingImage9.png",
  "../src/assets/loadingIcons/loadingImage10.png",
  "../src/assets/loadingIcons/loadingImage11.png",
  "../src/assets/loadingIcons/loadingImage12.png",
  "../src/assets/loadingIcons/loadingImage13.png",
  "../src/assets/loadingIcons/loadingImage14.png",
  "../src/assets/loadingIcons/loadingImage15.png",
  "../src/assets/loadingIcons/loadingImage16.png",
  "../src/assets/loadingIcons/loadingImage17.png",
  "../src/assets/loadingIcons/loadingImage18.png",
  "../src/assets/loadingIcons/loadingImage19.png",
  "../src/assets/loadingIcons/loadingImage20.png",
  "../src/assets/loadingIcons/loadingImage21.png",
  "../src/assets/loadingIcons/loadingImage22.png",
  "../src/assets/loadingIcons/loadingImage23.png",
  "../src/assets/loadingIcons/loadingImage24.png",
  "../src/assets/loadingIcons/loadingImage25.png",
];

const tips = [
  "Use AI to automate repetitive tasks.",
  "Leverage AI for creative brainstorming sessions.",
  "Let AI help summarize long documents quickly.",
  "Use AI to generate content ideas effortlessly.",
  "Employ AI for data analysis and insights.",
];

export default function Overlay({ showOverlay, closeOverlay }) {
  // State to manage the current frame index for the loading animation
  const [frameIndex, setFrameIndex] = useState(0);
  // State to manage the current tip index for cycling tips
  const [tipIndex, setTipIndex] = useState(0);

  // useRef to get direct access to the DOM elements for animation
  const imgRef = useRef(null);
  const tipRef = useRef(null);

  // useEffect hook to handle side effects: setting up and clearing intervals
  useEffect(() => {
    // Interval for cycling through image frames
    const frameInterval = setInterval(() => {
      const img = imgRef.current;
      // If image ref is not available, exit
      if (!img) return;

      // Step 1: Animate out the current image
      img.style.opacity = 0;
      img.style.transform = "scale(0) rotate(-5deg)";

      // Step 2: Wait for the "animate out" transition, then switch image source
      setTimeout(() => {
        // Calculate the next frame index using functional update
        setFrameIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % frames.length;
          // Directly update image source for immediate visual change within the animation
          img.src = frames[newIndex];
          return newIndex; // Return the new index to update state
        });

        // Force reflow to ensure CSS transitions re-apply correctly
        void img.offsetWidth;

        // Animate in the new image
        img.style.transform = "scale(1) rotate(0deg)";
        img.style.opacity = 1;
      }, 500); // This timeout should match the transition duration for smooth animation
    }, 1800); // Interval for overall frame animation cycle

    // Interval for cycling through tips
    const tipInterval = setInterval(() => {
      const tipEl = tipRef.current;
      // If tip ref is not available, exit
      if (!tipEl) return;

      // Animate out the current tip text
      tipEl.style.opacity = 0;
      setTimeout(() => {
        // Update the tip index using functional update
        setTipIndex((prevTipIndex) => {
          const newTip = (prevTipIndex + 1) % tips.length;
          return newTip; // Return the new index to update state
        });
        // The tip text will automatically update via JSX rendering because tipIndex state changed
        tipEl.style.opacity = 1; // Animate in the new tip text
      }, 500); // This timeout should match the transition duration for smooth animation
    }, 4000); // Interval for overall tip cycle

    // Cleanup function: Clear intervals when the component unmounts or effect re-runs
    return () => {
      clearInterval(frameInterval);
      clearInterval(tipInterval);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount.
  // Functional state updates handle the latest state values within the intervals,
  // preventing stale closures without needing to re-run the effect.

  return (
    <>
      {/* Conditionally render the overlay based on showOverlay prop */}
      {showOverlay ? (
        <div className="overlay">
          {/* Container for centering content */}
          <div className="overlay-center">
            {/* Close button for the overlay */}
            <button onClick={closeOverlay} className="closeButton">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 18L18 6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Container for the loader animation and tip text */}
            <div className="loaderContainer">
              {/* Image element for the loading animation, src is controlled by state */}
              <img
                ref={imgRef}
                src={frames[frameIndex]}
                alt="Loading..."
                className="overlay-image"
              />
              {/* Tip text element, content is controlled by state */}
              <div ref={tipRef} className="tipText">
                Tip: {tips[tipIndex]} {/* Now dynamically uses tipIndex */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

// export default function Overlay({ showOverlay, closeOverlay }) {
//   const [frameIndex, setFrameIndex] = useState(0);
//   const [tipIndex, setTipIndex] = useState(0);

//   const imgRef = useRef(null);
//   const tipRef = useRef(null);

//   useEffect(() => {
//     const frameInterval = setInterval(() => {
//       const img = imgRef.current;
//       if (!img) return;

//       // Step 1: animate out
//       img.style.opacity = 0;
//       img.style.transform = "scale(0) rotate(-5deg)";

//       // Step 2: wait for animation, then switch
//       setTimeout(() => {
//         const newIndex = (frameIndex + 1) % frames.length;
//         img.src = frames[newIndex];
//         setFrameIndex(newIndex);

//         // Force reflow
//         void img.offsetWidth;

//         // Animate in
//         img.style.transform = "scale(1) rotate(0deg)";
//         img.style.opacity = 1;
//       }, 500);
//     }, 1800);

//     const tipInterval = setInterval(() => {
//       const tipEl = tipRef.current;
//       if (!tipEl) return;

//       tipEl.style.opacity = 0;
//       setTimeout(() => {
//         const newTip = (tipIndex + 1) % tips.length;
//         setTipIndex(newTip);
//         tipEl.textContent = tips[newTip];
//         tipEl.style.opacity = 1;
//       }, 500);
//     }, 4000);

//     return () => {
//       clearInterval(frameInterval);
//       clearInterval(tipInterval);
//     };
//   }, [frameIndex, tipIndex]);

//   return (
//     <>
//       {showOverlay ? (
//         <div className="overlay">
//           <div className="overlay-center">
//             <button onClick={closeOverlay} className="closeButton">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M6 6L18 18"
//                   stroke="#fff"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M6 18L18 6"
//                   stroke="#fff"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </button>

//             <div className="loaderContainer">
//               <img
//                 ref={imgRef}
//                 src={frames[0]}
//                 alt="Loading..."
//                 className="overlay-image"
//               />
//               <div ref={tipRef} className="tipText">
//                 Tip: {tips[0]}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }
