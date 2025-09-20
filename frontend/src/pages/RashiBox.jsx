import React, { useState, useEffect } from "react";

const allSigns = [
  {
    img: "/images/rashis/one.jpg",
    name: "Mesha (Aries)",
    desc: "Energetic, bold, and natural leaders. Ruled by Mars.",
  },
  {
    img: "/images/rashis/second.jpg",
    name: "Vrishabha (Taurus)",
    desc: "Reliable, practical, and strong-willed. Ruled by Venus.",
  },
  {
    img: "/images/rashis/three.jpg",
    name: "Mithuna (Gemini)",
    desc: "Adaptable, curious, and good communicators. Ruled by Mercury.",
  },
  {
    img: "/images/rashis/four.jpg",
    name: "Karka (Cancer)",
    desc: "Emotional, nurturing, and protective. Ruled by Moon.",
  },
  {
    img: "/images/rashis/five.jpg",
    name: "Simha (Leo)",
    desc: "Confident, charismatic, and strong leaders. Ruled by Sun.",
  },
  {
    img: "/images/rashis/six.jpg",
    name: "Kanya (Virgo)",
    desc: "Detail-oriented, analytical, and perfectionists. Ruled by Mercury.",
  },
  {
    img: "/images/rashis/seven.jpg",
    name: "Tula (Libra)",
    desc: "Balanced, charming, and diplomatic. Ruled by Venus.",
  },
  {
    img: "/images/rashis/eight.jpg",
    name: "Vrischika (Scorpio)",
    desc: "Passionate, intense, and determined. Ruled by Mars/Ketu.",
  },
  {
    img: "/images/rashis/nine.jpg",
    name: "Dhanu (Sagittarius)",
    desc: "Adventurous, optimistic, and philosophical. Ruled by Jupiter.",
  },
  {
    img: "/images/rashis/ten.jpg",
    name: "Makara (Capricorn)",
    desc: "Disciplined, hardworking, and ambitious. Ruled by Saturn.",
  },
  {
    img: "/images/rashis/eleven.jpg",
    name: "Kumbha (Aquarius)",
    desc: "Innovative, independent, and humanitarian. Ruled by Saturn.",
  },
  {
    img: "/images/rashis/twelve.jpg",
    name: "Meena (Pisces)",
    desc: "Compassionate, intuitive, and artistic. Ruled by Jupiter.",
  },
];

const CarouselRow = ({ items, cardsPerView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const extendedItems = [...items, ...items];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex >= items.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(0);

        const reenableTimer = setTimeout(() => {
          setIsTransitionEnabled(true);
        }, 50);

        return () => clearTimeout(reenableTimer);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, items.length]);

  const cardWidthPercentage = 100 / cardsPerView;

  return (
    <div className="carousel-container">
      <div
        className="carousel-slider"
        style={{
          transform: `translateX(-${currentIndex * (150 / items.length)}%)`,
          transition: isTransitionEnabled ? "transform 1s linear" : "none",
        }}
      >
        {extendedItems.map((skill, idx) => (
          <div
            key={idx}
            className="skill-item"
            style={{ flex: `0 0 ${cardWidthPercentage}%` }}
          >
            <div className="skill-card">
              <div className="skill-icon-wrapper">
                <img
                  className="skill-icon"
                  src={skill.img}
                  alt={`${skill.name} icon`}
                  loading="lazy"
                />
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RashiBox = () => {
  const firstRowSigns = allSigns.slice(0, 6);
  const secondRowSigns = allSigns.slice(6, 12);
  const CARDS_PER_ROW = 4;

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center mb-0"
          style={{ textAlign: "center" }}
        >
          <h1 className="section-title">Astrological Signs</h1>
          <p className="section-subtitle">
            The zodiac signs in Vedic astrology with their qualities
          </p>
        </div>

        <CarouselRow items={firstRowSigns} cardsPerView={CARDS_PER_ROW} />
        <CarouselRow items={secondRowSigns} cardsPerView={CARDS_PER_ROW} />
      </div>
      <style>{`
        .skills-section { padding: 3rem 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
        .section-title { font-family: Georgia, serif; font-size: 2.5rem; }
        .section-subtitle { font-family: Georgia, serif; font-size: 1.25rem; margin-bottom: 2rem; }
        .carousel-container { width: 100%; overflow: hidden; margin-bottom: 1.5rem; }
        .carousel-slider { display: flex; }
        .skill-item { box-sizing: border-box; padding: 0 10px; }
        .skill-card {
          background-color: inherit; border: 1px solid #ddd; border-radius: 12px;
          padding: 1.5rem; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          height: 100%; display: flex; flex-direction: column; align-items: center;
        }
        .skill-icon-wrapper { margin-bottom: 0.75rem; }
        .skill-icon { width: 60px; height: 60px; object-fit: contain; border-radius: 50%; }
        .skill-name { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0; }
        .skill-description { font-size: 0.9rem; color: #555; line-height: 1.4; }
      `}</style>
    </section>
  );
};

export default RashiBox;
