import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from '@mui/material';
import RashiCard from '../components/Cards/RashiCard';

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

const CarouselRow = ({ items, cardsPerView, onCardClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
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

  const getCardsPerView = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return cardsPerView;
  };

  const actualCardsPerView = getCardsPerView();
  const cardWidthPercentage = 100 / actualCardsPerView;

  return (
    <div className="carousel-container">
      <div
        className="carousel-slider"
        style={{
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
          transition: isTransitionEnabled ? "transform 1s linear" : "none",
        }}
      >
        {extendedItems.map((sign, idx) => (
          <div
            key={idx}
            className="skill-item"
            style={{ 
              flex: `0 0 ${cardWidthPercentage}%`,
              cursor: 'pointer'
            }}
            onClick={() => onCardClick(sign)}
          >
            <div className="skill-card">
              <div className="skill-icon-wrapper">
                <img
                  className="skill-icon"
                  src={sign.img}
                  alt={`${sign.name} icon`}
                  loading="lazy"
                />
              </div>
              <h3 className="skill-name">{sign.name}</h3>
              <p className="skill-description">{sign.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RashiBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedRashi, setSelectedRashi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const firstRowSigns = allSigns.slice(0, 6);
  const secondRowSigns = allSigns.slice(6, 12);
  const CARDS_PER_ROW = 4;

  const handleCardClick = (rashi) => {
    setSelectedRashi(rashi);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRashi(null);
  };

  return (
    <>
      <section id="skills" className="skills-section">
        <div className="container">
          <div
            className="d-flex flex-column justify-content-center align-items-center mb-0"
            style={{ textAlign: "center" }}
          >
            <h1 className="section-title">Astrological Signs</h1>
            <p className="section-subtitle">
              Click on any zodiac sign to discover detailed insights about personality, career, health, and more
            </p>
          </div>

          <CarouselRow 
            items={firstRowSigns} 
            cardsPerView={CARDS_PER_ROW}
            onCardClick={handleCardClick}
          />
          <CarouselRow 
            items={secondRowSigns} 
            cardsPerView={CARDS_PER_ROW}
            onCardClick={handleCardClick}
          />
        </div>
        
        <style>{`
          .skills-section { 
            padding: ${isMobile ? '2rem 0' : '3rem 0'}; 
            background: linear-gradient(135deg, rgba(245,250,225,0.3) 0%, rgba(229,190,181,0.1) 100%);
          }
          .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 ${isMobile ? '10px' : '15px'}; 
          }
          .section-title { 
            font-family: Georgia, serif; 
            font-size: ${isMobile ? '2rem' : '2.5rem'}; 
            color: #896C6C;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .section-subtitle { 
            font-family: Georgia, serif; 
            font-size: ${isMobile ? '1rem' : '1.25rem'}; 
            margin-bottom: ${isMobile ? '1.5rem' : '2rem'};
            color: #5A5A5A;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .carousel-container { 
            width: 100%; 
            overflow: hidden; 
            margin-bottom: ${isMobile ? '1rem' : '1.5rem'}; 
          }
          .carousel-slider { 
            display: flex; 
          }
          .skill-item { 
            box-sizing: border-box; 
            padding: 0 ${isMobile ? '5px' : '10px'}; 
          }
          .skill-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(229,190,181,0.1) 100%);
            border: 2px solid rgba(137,108,108,0.2); 
            border-radius: 16px;
            padding: ${isMobile ? '1rem' : '1.5rem'}; 
            text-align: center; 
            box-shadow: 0 8px 32px rgba(137,108,108,0.12);
            height: 100%; 
            display: flex; 
            flex-direction: column; 
            align-items: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .skill-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(137,108,108,0.1) 0%, rgba(229,190,181,0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }
          .skill-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 16px 48px rgba(137,108,108,0.25);
            border-color: #896C6C;
          }
          .skill-card:hover::before {
            opacity: 1;
          }
          .skill-card:hover .skill-name {
            color: #896C6C;
          }
          .skill-icon-wrapper { 
            margin-bottom: ${isMobile ? '0.5rem' : '0.75rem'}; 
            position: relative;
            z-index: 1;
          }
          .skill-icon { 
            width: ${isMobile ? '50px' : '60px'}; 
            height: ${isMobile ? '50px' : '60px'}; 
            object-fit: contain; 
            border-radius: 50%; 
            border: 3px solid #896C6C;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(137,108,108,0.2);
          }
          .skill-card:hover .skill-icon {
            border-color: #6B5555;
            box-shadow: 0 8px 24px rgba(137,108,108,0.3);
          }
          .skill-name { 
            font-size: ${isMobile ? '1rem' : '1.1rem'}; 
            font-weight: 600; 
            margin: ${isMobile ? '0.25rem 0' : '0.5rem 0'};
            color: #2C2C2C;
            transition: color 0.3s ease;
            position: relative;
            z-index: 1;
          }
          .skill-description { 
            font-size: ${isMobile ? '0.8rem' : '0.9rem'}; 
            color: #5A5A5A; 
            line-height: 1.4; 
            margin: 0;
            position: relative;
            z-index: 1;
          }
          
          @media (max-width: 600px) {
            .skills-section { padding: 1.5rem 0; }
            .container { padding: 0 5px; }
            .skill-card { padding: 1rem; }
            .section-title { font-size: 1.75rem; }
            .section-subtitle { font-size: 0.9rem; }
          }
        `}</style>
      </section>
      
      <RashiCard
        rashi={selectedRashi}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default RashiBox;