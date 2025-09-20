import React, { useState, useEffect, useRef } from "react";

const Blog = () => {
  const feedbacks = [
    { name: "Samar", feedback: "The only report I found...", image: "/images/user1.jpg", date: "16 October 2024", rating: 5 },
    { name: "Riya", feedback: "Amazing experience!", image: "/images/user2.jpg", date: "10 October 2024", rating: 4 },
    { name: "Arjun", feedback: "Very professional service...", image: "/images/user3.jpg", date: "05 October 2024", rating: 5 },
    { name: "Meera", feedback: "Great guidance...", image: "/images/user4.jpg", date: "02 October 2024", rating: 4 },
    { name: "Rohit", feedback: "Truly helpful...", image: "/images/user5.jpg", date: "01 October 2024", rating: 5 },
  ];

  const cardsPerView = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  
  // Create the extended list for a seamless loop
  const extendedFeedbacks = [...feedbacks, ...feedbacks];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Effect to handle the "infinite" loop reset
  useEffect(() => {
    if (currentIndex >= feedbacks.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);
        
        // A nested timeout to re-enable transitions after the jump
        const reenableTimer = setTimeout(() => {
          setIsTransitionEnabled(true);
        }, 50);

        return () => clearTimeout(reenableTimer);
      }, 1000); // Must match the CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [currentIndex, feedbacks.length]);

  // The width of a single card as a percentage of the total slider width
  const cardWidthPercentage = 100 / extendedFeedbacks.length;

  return (
    <div style={{ width: "90%", margin: "auto", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          transition: isTransitionEnabled ? "transform 1s linear" : "none",
          // *** THE FIX IS HERE ***
          // The transform amount is based on the width of a single card
          transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
          width: `${(extendedFeedbacks.length / cardsPerView) * 100}%`,
        }}
      >
        {extendedFeedbacks.map((item, index) => (
          <div
            key={index}
            style={{
              // Each card takes up its calculated percentage of the total slider width
              flex: `0 0 ${cardWidthPercentage}%`,
              boxSizing: "border-box",
              padding: "15px",
            }}
          >
            <div
              style={{
                width: "100%",
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                background: "white",
                height: "100%"
              }}
            >
              <h2 style={{ fontFamily: "cursive", fontSize: "20px" }}>{item.name}</h2>
              <p style={{ fontSize: "15px", color: "#555" }}>{item.feedback}</p>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "10px" }}
              />
              <h4 style={{ color: "crimson", marginTop: "10px" }}>{item.name}</h4>
              <p style={{ fontSize: "14px", color: "gray" }}>{item.date}</p>
              <p style={{ color: "#FFD700", fontSize: "18px" }}>
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;