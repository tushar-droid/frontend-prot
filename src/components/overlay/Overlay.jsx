import React, { useEffect, useRef, useState } from "react";

// const frames = [
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-SOLVYVeoYFcQ9plseLjBvBDdFCL4qu.png&w=1920&q=75",
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-adD99QtxVE5zK0oRmUbkC7gswNoLNX.png&w=1920&q=75",
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-1BHTtY4fyRPXbePgUm5lTCWVMxty00.png&w=3840&q=75",
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wtyoroPu9pUAx5xLx8Cnko454idKhb.png&w=3840&q=75",
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-UfQ45n5MHPKpqHL7MANj5XfaOsbVtX.png&w=3840&q=75",
//   "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-LxbDZUY1gzuzF4AEv0OHAqsSGpAng8.png&w=3840&q=75",
// ];

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
];

const tips = [
  "Use AI to automate repetitive tasks.",
  "Leverage AI for creative brainstorming sessions.",
  "Let AI help summarize long documents quickly.",
  "Use AI to generate content ideas effortlessly.",
  "Employ AI for data analysis and insights.",
];

export default function Overlay() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const imgRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      const img = imgRef.current;
      if (!img) return;

      // Step 1: animate out
      img.style.opacity = 0;
      img.style.transform = "scale(0) rotate(-5deg)";

      // Step 2: wait for animation, then switch
      setTimeout(() => {
        const newIndex = (frameIndex + 1) % frames.length;
        img.src = frames[newIndex];
        setFrameIndex(newIndex);

        // Force reflow
        void img.offsetWidth;

        // Animate in
        img.style.transform = "scale(1) rotate(0deg)";
        img.style.opacity = 1;
      }, 500);
    }, 1800);

    const tipInterval = setInterval(() => {
      const tipEl = tipRef.current;
      if (!tipEl) return;

      tipEl.style.opacity = 0;
      setTimeout(() => {
        const newTip = (tipIndex + 1) % tips.length;
        setTipIndex(newTip);
        tipEl.textContent = tips[newTip];
        tipEl.style.opacity = 1;
      }, 500);
    }, 4000);

    return () => {
      clearInterval(frameInterval);
      clearInterval(tipInterval);
    };
  }, [frameIndex, tipIndex]);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <button onClick={() => setVisible(false)} style={styles.closeButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

      <div style={styles.loaderContainer}>
        <img
          ref={imgRef}
          src={frames[0]}
          alt="Loading..."
          style={styles.image}
        />
        <div ref={tipRef} style={styles.tipText}>
          Tip: {tips[0]}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  loaderContainer: {
    width: 180,
    userSelect: "none",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "contain",
    // filter: "drop-shadow(0 0 12px #00bcd4)",
    transition:
      "opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    opacity: 1,
    transform: "scale(1) rotate(0deg)",
    overflow: visible,
  },
  tipText: {
    marginTop: 12,
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontWeight: 500,
    fontSize: 14,
    color: "#E0E6F1",
    letterSpacing: "0.05em",
    minHeight: 24,
    lineHeight: 1.3,
    fontStyle: "normal",
    userSelect: "none",
    transition: "opacity 0.5s ease-in-out",
  },
};
