import React, { useEffect, useRef, useState } from "react";
import "./overlay.css";
import OpenAI from "openai";
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

export default function Overlay({ showOverlay, closeOverlay, selectedItems }) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  // State to manage the current frame index for the loading animation
  const [frameIndex, setFrameIndex] = useState(0);
  // State to manage the current tip index for cycling tips
  const [tipIndex, setTipIndex] = useState(0);
  const [overlayAnimation, setOverlayAnimation] = useState("zoomOut");
  const [bgAnimation, setBgAnimation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // useRef to get direct access to the DOM elements for animation
  const imgRef = useRef(null);
  const tipRef = useRef(null);
  const overlayCenter = useRef(null);
  const temp = useRef(null);

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

  useEffect(() => {
    if (showOverlay) {
      setIsVisible(true);
      setOverlayAnimation("zoomIn");
      setBgAnimation("fadeIn");
    } else {
      if (isVisible) {
        setOverlayAnimation("zoomOut");
        setBgAnimation("fadeOut");
      }
    }
  }, [showOverlay]);

  const handleAnimationEnd = (e) => {
    if (e.animationName === "zoomOut") {
      setIsVisible(false);
      setOverlayAnimation("");
      setBgAnimation("");
    }
  };

  useEffect(() => {
    // Define an async function inside useEffect
    const generateImage = async () => {
      if (showOverlay && selectedItems.length > 0) {
        // Added check for selectedItems
        setImageLoaded(false);
        setGeneratedImage(null);
        let prompt = `A highly detailed, photorealistic image featuring: `;
        const itemCount = selectedItems.length;
        const numberOfImages = 1;
        const imageSize = "1024x1024";

        if (itemCount === 1) {
          prompt += `a single **${selectedItems[0]}**. The item should be prominently displayed on a clean, minimalist background, with natural light highlighting its textures and form.`;
        } else if (itemCount === 2) {
          prompt += `a **${selectedItems[0]}** and a **${selectedItems[1]}** creatively interacting in a well-lit indoor setting. Focus on their relationship and composition within the frame.`;
        } else if (itemCount >= 3 && itemCount <= 5) {
          // Join the items with commas, and "and" for the last one
          const formattedItems = selectedItems
            .map((item, index) => {
              if (
                index === selectedItems.length - 1 &&
                selectedItems.length > 1
              ) {
                return `and a **${item}**`;
              }
              return `a **${item}**`;
            })
            .join(", ");

          prompt += `${formattedItems}. These objects are arranged thoughtfully, bathed in soft, diffused light, creating a serene and inviting atmosphere. The composition should feel balanced and aesthetically pleasing.`;
        } else {
          // Optional: Handle cases where itemCount is 0 or > 5
          prompt =
            "A beautiful abstract image with a harmonious blend of colors and soft lighting, inviting contemplation.";
        }

        console.log("Generated Prompt:", prompt);

        try {
          // Make the API call
          const imageGenerationResponse = await openai.images.generate({
            prompt: prompt,
            n: numberOfImages,
            size: imageSize,
          });

          console.log("Image Generation Data:", imageGenerationResponse.data);
          const imageURL = imageGenerationResponse.data[0].url;
          console.log(imageURL);
          await preloadImage(imageURL);
          temp.current = imageURL;
          setGeneratedImage(true);
          setImageLoaded(true);
        } catch (error) {
          console.error("Error generating image:", error);
          // Handle the error, e.g., show an error message to the user
        }
      }
    };

    // Call the async function when showOverlay changes
    generateImage();
  }, [showOverlay]);
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  };

  useEffect(() => {
    if (!isVisible) {
      setGeneratedImage(null);
    }
  }, [isVisible]);

  return (
    <>
      {/* Conditionally render the overlay based on showOverlay prop */}
      {isVisible ? (
        <div
          className={`overlay ${bgAnimation}`}
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Container for centering content */}
          <div
            className={`overlay-center ${overlayAnimation}`}
            ref={overlayCenter}
          >
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

            {generatedImage && imageLoaded ? (
              <div className="generated-image-container">
                <img
                  src={temp ? temp.current : null}
                  className="generated-image"
                />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
