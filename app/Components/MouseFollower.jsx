import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("black");
  const [zIndex, setZIndex] = useState(20001);
  const [blendMode, setBlendMode] = useState("normal");
  const [size, setSize] = useState(20); // Default size of the mouse follower

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseEnter = () => {
      setColor("white");
      setZIndex(1001);
      setBlendMode("difference");
      setSize(40); // Increase size when hovering over text
    };

    const handleMouseLeave = () => {
      setColor("white");
      setZIndex(1001);
      setBlendMode("normal");
      setSize(20); // Reset size when not hovering over text
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Add event listeners for all text elements
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, a"
    );
    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      // Clean up event listeners
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${size}px`, // Dynamically set the width based on size state
        height: `${size}px`, // Dynamically set the height based on size state
        borderRadius: "50%",
        backgroundColor: color,
        pointerEvents: "none",
        zIndex: zIndex,
        mixBlendMode: blendMode,
        isolation: "isolate",
        transition: "width 0.2s ease, height 0.2s ease", // Apply smooth transition for size changes
      }}
      animate={{
        x: position.x - size / 2, // Center the circle based on the size
        y: position.y - size / 2, // Center the circle based on the size
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 60,
        mass: 0.5,
      }}
    />
  );
};

export default MouseFollower;
