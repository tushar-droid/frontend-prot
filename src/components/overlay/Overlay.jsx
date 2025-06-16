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

  const [frameIndex, setFrameIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [overlayAnimation, setOverlayAnimation] = useState("zoomOut");
  const [bgAnimation, setBgAnimation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imgRef = useRef(null);
  const tipRef = useRef(null);
  const overlayCenter = useRef(null);
  const temp = useRef(null);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      const img = imgRef.current;
      if (!img) return;

      img.style.opacity = 0;
      img.style.transform = "scale(0) rotate(-5deg)";

      setTimeout(() => {
        setFrameIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % frames.length;
          img.src = frames[newIndex];
          return newIndex;
        });

        void img.offsetWidth;

        img.style.transform = "scale(1) rotate(0deg)";
        img.style.opacity = 1;
      }, 500);
    }, 1800);

    const tipInterval = setInterval(() => {
      const tipEl = tipRef.current;
      if (!tipEl) return;

      tipEl.style.opacity = 0;
      setTimeout(() => {
        setTipIndex((prevTipIndex) => {
          const newTip = (prevTipIndex + 1) % tips.length;
          return newTip;
        });
        tipEl.style.opacity = 1;
      }, 500);
    }, 4000);

    return () => {
      clearInterval(frameInterval);
      clearInterval(tipInterval);
    };
  }, []);

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

  // Function to preload the image and wait for it to load
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        reject(new Error("Image load timeout"));
      }, 10000); // 10 second timeout

      img.onload = () => {
        clearTimeout(timeout);
        resolve(url);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Image failed to load"));
      };
      img.src = url;
    });
  };

  useEffect(() => {
    const generateImage = async () => {
      if (showOverlay && selectedItems.length > 0) {
        // Reset states when starting new generation
        setGeneratedImage(null);
        setImageLoaded(false);

        let prompt = `A highly detailed, photorealistic image featuring: `;
        const itemCount = selectedItems.length;
        const numberOfImages = 1;
        const imageSize = "1024x1024";

        if (itemCount === 1) {
          prompt += `a single **${selectedItems[0]}**. The item should be prominently displayed on a clean, minimalist background, with natural light highlighting its textures and form.`;
        } else if (itemCount === 2) {
          prompt += `a **${selectedItems[0]}** and a **${selectedItems[1]}** creatively interacting in a well-lit indoor setting. Focus on their relationship and composition within the frame.`;
        } else if (itemCount >= 3 && itemCount <= 5) {
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
          prompt =
            "A beautiful abstract image with a harmonious blend of colors and soft lighting, inviting contemplation.";
        }

        console.log("Generated Prompt:", prompt);

        try {
          const imageGenerationResponse = await openai.images.generate({
            prompt: prompt,
            n: numberOfImages,
            size: imageSize,
          });

          console.log("Image Generation Data:", imageGenerationResponse.data);
          const imageURL = imageGenerationResponse.data[0].url;

          try {
            // Wait for the image to actually load before showing it
            await preloadImage(imageURL);
            console.log("Image preloaded successfully");
            temp.current = imageURL;
            setGeneratedImage(true);
            setImageLoaded(true);
          } catch (preloadError) {
            console.error("Error preloading image:", preloadError);
            // If preload fails, still try to show the image - let the browser handle it
            temp.current = imageURL;
            setGeneratedImage(true);
            setImageLoaded(true);
          }
        } catch (error) {
          console.error("Error generating image:", error);
          // Could add error state handling here if needed
        }
      }
    };

    generateImage();
  }, [showOverlay, selectedItems]); // Added selectedItems to dependencies

  useEffect(() => {
    if (!isVisible) {
      setGeneratedImage(null);
      setImageLoaded(false);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible ? (
        <div
          className={`overlay ${bgAnimation}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div
            className={`overlay-center ${overlayAnimation}`}
            ref={overlayCenter}
          >
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
                  src={temp.current}
                  className="generated-image"
                  alt="Generated content"
                />
              </div>
            ) : (
              <div className="loaderContainer">
                <img
                  ref={imgRef}
                  src={frames[frameIndex]}
                  alt="Loading..."
                  className="overlay-image"
                />
                <div ref={tipRef} className="tipText">
                  Tip: {tips[tipIndex]}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
