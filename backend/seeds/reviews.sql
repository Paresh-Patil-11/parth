INSERT INTO reviews (name, photo_url, text, rating) VALUES
('Priya Sharma', '/images/priya.jpg', 'The astrology consultation was life-changing! The predictions were incredibly accurate and the guidance helped me make important career decisions.', 5),
('Rajesh Kumar', '/images/rajesh.jpg', 'Very insightful reading. The astrologer explained everything in detail and provided practical remedies that actually worked.', 5),
('Anita Patel', '/images/anita.jpg', 'Professional and knowledgeable service. The birth chart analysis was comprehensive and helped me understand myself better.', 4)
ON CONFLICT DO NOTHING;