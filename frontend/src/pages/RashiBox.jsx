import React, { useEffect, useRef } from "react";

const skills = [
  {
    img: "./public/images/rashis/one.jpg",
    name: "Mesha (Aries)",
    desc: "Energetic, bold, and natural leaders. Ruled by Mars.",
    level: 90,
  },
  {
    img: "./public/images/rashis/second.jpg",
    name: "Vrishabha (Taurus)",
    desc: "Reliable, practical, and strong-willed. Ruled by Venus.",
    level: 85,
  },
  {
    img: "./public/images/rashis/three.jpg",
    name: "Mithuna (Gemini)",
    desc: "Adaptable, curious, and good communicators. Ruled by Mercury.",
    level: 88,
  },
  {
    img: "./public/images/rashis/four.jpg",
    name: "Karka (Cancer)",
    desc: "Emotional, nurturing, and protective. Ruled by Moon.",
    level: 82,
  },
  {
    img: "./public/images/rashis/five.jpg",
    name: "Simha (Leo)",
    desc: "Confident, charismatic, and strong leaders. Ruled by Sun.",
    level: 92,
  },
  {
    img: "./public/images/rashis/six.jpg",
    name: "Kanya (Virgo)",
    desc: "Detail-oriented, analytical, and perfectionists. Ruled by Mercury.",
    level: 87,
  },
  {
    img: "./public/images/rashis/seven.jpg",
    name: "Tula (Libra)",
    desc: "Balanced, charming, and diplomatic. Ruled by Venus.",
    level: 89,
  },
  {
    img: "./public/images/rashis/eight.jpg",
    name: "Vrischika (Scorpio)",
    desc: "Passionate, intense, and determined. Ruled by Mars/Ketu.",
    level: 93,
  },
  {
    img: "./public/images/rashis/nine.jpg",
    name: "Dhanu (Sagittarius)",
    desc: "Adventurous, optimistic, and philosophical. Ruled by Jupiter.",
    level: 91,
  },
  {
    img: "./public/images/rashis/ten.jpg",
    name: "Makara (Capricorn)",
    desc: "Disciplined, hardworking, and ambitious. Ruled by Saturn.",
    level: 90,
  },
  {
    img: "./public/images/rashis/eleven.jpg",
    name: "Kumbha (Aquarius)",
    desc: "Innovative, independent, and humanitarian. Ruled by Saturn.",
    level: 86,
  },
  {
    img: "./public/images/rashis/twelve.jpg",
    name: "Meena (Pisces)",
    desc: "Compassionate, intuitive, and artistic. Ruled by Jupiter.",
    level: 88,
  },
];

const RashiBox = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements =
      sectionRef.current?.querySelectorAll(".animate-on-scroll");
    animateElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="animate-on-scroll">
            <h1
              className="section-title"
              style={{
                fontFamily: "Georgia",
                fontSize: "2.5rem",
                textAlign: "center",
              }}
            >
              Astrological Signs
            </h1>
            <p
              className="section-subtitle"
              style={{
                fontFamily: "Georgia",
                fontSize: "1.25rem",
                textAlign: "center",
              }}
            >
              The zodiac signs in Vedic astrology with their qualities
            </p>
          </div>
        </div>

        {/* Rashi Grid */}
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <div key={idx} className="skill-item">
              <div
                className="skill-card animate-on-scroll"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="skill-icon-wrapper mb-3">
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

      {/* CSS Styling */}
      <style>{`
        .skills-section {
          background-color: inherit;
          padding: 3rem 1rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 per row */
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .skill-card {
          background-color: inherit;
          border: 1px solid var(--border-color, #ddd);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .skill-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .skill-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        .skill-description {
          font-size: 0.9rem;
          color: var(--text-secondary, #555);
          line-height: 1.4;
        }
      `}</style>
    </section>
  );
};

export default RashiBox;
