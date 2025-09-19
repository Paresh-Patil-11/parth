INSERT INTO rashis (name, element, ruling_planet, date_range, image_url, description) VALUES
('Aries (Mesh)', 'Fire', 'Mars', 'Mar 21 - Apr 19', '/images/aries.jpg', 'The first sign of the zodiac, known for leadership and courage.'),
('Taurus (Vrishabh)', 'Earth', 'Venus', 'Apr 20 - May 20', '/images/taurus.jpg', 'Known for stability, patience, and love for luxury.'),
('Gemini (Mithun)', 'Air', 'Mercury', 'May 21 - Jun 20', '/images/gemini.jpg', 'The communicator of the zodiac, versatile and intellectual.'),
('Cancer (Kark)', 'Water', 'Moon', 'Jun 21 - Jul 22', '/images/cancer.jpg', 'Nurturing and protective, deeply connected to home and family.'),
('Leo (Simha)', 'Fire', 'Sun', 'Jul 23 - Aug 22', '/images/leo.jpg', 'Natural leaders with a flair for drama and creativity.'),
('Virgo (Kanya)', 'Earth', 'Mercury', 'Aug 23 - Sep 22', '/images/virgo.jpg', 'Analytical and practical, with attention to detail.'),
('Libra (Tula)', 'Air', 'Venus', 'Sep 23 - Oct 22', '/images/libra.jpg', 'Seekers of balance, harmony, and justice.'),
('Scorpio (Vrishchik)', 'Water', 'Mars/Pluto', 'Oct 23 - Nov 21', '/images/scorpio.jpg', 'Intense and passionate, with deep emotional depth.'),
('Sagittarius (Dhanu)', 'Fire', 'Jupiter', 'Nov 22 - Dec 21', '/images/sagittarius.jpg', 'Adventurous philosophers seeking truth and wisdom.'),
('Capricorn (Makar)', 'Earth', 'Saturn', 'Dec 22 - Jan 19', '/images/capricorn.jpg', 'Ambitious and disciplined, climbing towards success.'),
('Aquarius (Kumbh)', 'Air', 'Saturn/Uranus', 'Jan 20 - Feb 18', '/images/aquarius.jpg', 'Progressive thinkers and humanitarian visionaries.'),
('Pisces (Meen)', 'Water', 'Jupiter/Neptune', 'Feb 19 - Mar 20', '/images/pisces.jpg', 'Compassionate dreamers with deep intuition.')
ON CONFLICT DO NOTHING;