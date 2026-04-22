-- Seed data for Foodify (Delhi-based restaurants and delivery partners)

-- Insert sample users (passwords should be hashed in production)
INSERT INTO users (id, name, email, password, phone) VALUES
('user_1', 'Rajesh Kumar', 'rajesh@example.com', '$2b$10$dummyhash1', '+91 98765 00001'),
('user_2', 'Priya Sharma', 'priya@example.com', '$2b$10$dummyhash2', '+91 98765 00002'),
('user_3', 'Amit Singh', 'amit@example.com', '$2b$10$dummyhash3', '+91 98765 00003');

-- Insert Delhi restaurants
INSERT INTO restaurants (id, name, owner_name, email, password, phone, address, image_url, cuisine, rating, delivery_time, price_range, latitude, longitude, is_veg, fssai_number) VALUES
('r1', 'Haldiram''s Rajinder Nagar', 'Ramesh Agarwal', 'haldirams@example.com', '$2b$10$dummyhash', '+91 98765 11111', 'Rajinder Nagar, New Delhi', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', '["North Indian", "Street Food", "Sweets"]', 4.5, '30-40 mins', '₹200', 28.6431, 77.1840, TRUE, 'FSSAI12345001'),

('r2', 'Karim''s', 'Mohammad Karim', 'karims@example.com', '$2b$10$dummyhash', '+91 98765 11112', 'Jama Masjid, Old Delhi', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', '["Mughlai", "Non-Veg", "Kebabs"]', 4.7, '40-50 mins', '₹400', 28.6507, 77.2334, FALSE, 'FSSAI12345002'),

('r3', 'Saravana Bhavan', 'Venkat Raman', 'saravana@example.com', '$2b$10$dummyhash', '+91 98765 11113', 'Connaught Place, New Delhi', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', '["South Indian", "Vegetarian"]', 4.4, '25-35 mins', '₹250', 28.6315, 77.2167, TRUE, 'FSSAI12345003'),

('r4', 'Barbeque Nation', 'Sunil Kumar', 'bbqnation@example.com', '$2b$10$dummyhash', '+91 98765 11114', 'Janakpuri, New Delhi', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', '["Barbeque", "North Indian", "Continental"]', 4.3, '35-45 mins', '₹800', 28.6219, 77.0851, FALSE, 'FSSAI12345004'),

('r5', 'Diggin Cafe', 'Ankit Mehra', 'diggin@example.com', '$2b$10$dummyhash', '+91 98765 11115', 'Chanakyapuri, New Delhi', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', '["Cafe", "Italian", "Continental"]', 4.6, '30-40 mins', '₹600', 28.5969, 77.1839, FALSE, 'FSSAI12345005'),

('r6', 'Kuremal Mohan Lal Kulfi Wale', 'Kuremal Singh', 'kuremal@example.com', '$2b$10$dummyhash', '+91 98765 11116', 'Chawri Bazar, Old Delhi', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', '["Desserts", "Street Food"]', 4.8, '20-30 mins', '₹150', 28.6500, 77.2280, TRUE, 'FSSAI12345006');

-- Insert menu items for Haldiram's (r1)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m1', 'r1', 'Chole Bhature', 'Traditional North Indian dish with fluffy bhature and spicy chole', 180, 'Main Course', TRUE),
('m2', 'r1', 'Raj Kachori', 'Crispy kachori filled with yogurt, chutneys and sev', 120, 'Starters', TRUE),
('m3', 'r1', 'Paneer Tikka', 'Grilled cottage cheese with aromatic spices', 280, 'Starters', TRUE),
('m4', 'r1', 'Gulab Jamun', 'Classic Indian dessert soaked in sugar syrup', 80, 'Desserts', TRUE);

-- Insert menu items for Karim's (r2)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m5', 'r2', 'Mutton Korma', 'Tender mutton in rich creamy gravy', 450, 'Main Course', FALSE),
('m6', 'r2', 'Seekh Kebab', 'Minced meat kebabs grilled to perfection', 380, 'Starters', FALSE),
('m7', 'r2', 'Chicken Jahangiri', 'Signature chicken preparation with royal spices', 420, 'Main Course', FALSE),
('m8', 'r2', 'Butter Naan', 'Soft butter naan from tandoor', 50, 'Breads', TRUE);

-- Insert menu items for Saravana Bhavan (r3)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m9', 'r3', 'Masala Dosa', 'Crispy dosa with spiced potato filling', 150, 'Main Course', TRUE),
('m10', 'r3', 'Idli Sambar', 'Steamed rice cakes with lentil soup', 120, 'Main Course', TRUE),
('m11', 'r3', 'Vada Sambar', 'Crispy lentil fritters with sambar', 130, 'Starters', TRUE),
('m12', 'r3', 'Filter Coffee', 'Authentic South Indian filter coffee', 80, 'Beverages', TRUE);

-- Insert menu items for Barbeque Nation (r4)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m13', 'r4', 'BBQ Veg Platter', 'Assorted grilled vegetables with sauces', 650, 'Main Course', TRUE),
('m14', 'r4', 'BBQ Non-Veg Platter', 'Assorted grilled meats and seafood', 850, 'Main Course', FALSE),
('m15', 'r4', 'Paneer Tikka', 'Grilled cottage cheese marinated in spices', 320, 'Starters', TRUE),
('m16', 'r4', 'Chocolate Brownie', 'Warm chocolate brownie with ice cream', 180, 'Desserts', TRUE);

-- Insert menu items for Diggin Cafe (r5)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m17', 'r5', 'Margherita Pizza', 'Classic pizza with mozzarella and basil', 450, 'Main Course', TRUE),
('m18', 'r5', 'Chicken Burger', 'Juicy chicken patty with fresh veggies', 380, 'Main Course', FALSE),
('m19', 'r5', 'Caesar Salad', 'Crispy lettuce with caesar dressing', 320, 'Starters', TRUE),
('m20', 'r5', 'Iced Latte', 'Cold coffee with milk', 220, 'Beverages', TRUE);

-- Insert menu items for Kuremal Kulfi (r6)
INSERT INTO menu_items (id, restaurant_id, name, description, price, category, is_veg) VALUES
('m21', 'r6', 'Stuffed Mango Kulfi', 'Real mango stuffed with kulfi', 180, 'Desserts', TRUE),
('m22', 'r6', 'Paan Kulfi', 'Kulfi with betel leaf flavor', 150, 'Desserts', TRUE),
('m23', 'r6', 'Malai Kulfi', 'Traditional creamy kulfi', 120, 'Desserts', TRUE),
('m24', 'r6', 'Falooda', 'Milk dessert with noodles and ice cream', 140, 'Desserts', TRUE);

-- Insert delivery partners
INSERT INTO delivery_partners (id, name, email, password, phone, photo_url, vehicle_type, vehicle_number, license_number, latitude, longitude, rating, deliveries_completed) VALUES
('p1', 'Rajesh Kumar', 'rajesh.partner@example.com', '$2b$10$dummyhash', '+91 98765 43210', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', 'bike', 'DL 5C AB 1234', 'DL1234567890', 28.6400, 77.2000, 4.7, 1250),

('p2', 'Amit Sharma', 'amit.partner@example.com', '$2b$10$dummyhash', '+91 98765 43211', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', 'scooter', 'DL 8S CD 5678', 'DL2345678901', 28.6300, 77.2200, 4.5, 980),

('p3', 'Vikram Singh', 'vikram.partner@example.com', '$2b$10$dummyhash', '+91 98765 43212', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', 'bike', 'DL 3C EF 9012', 'DL3456789012', 28.6500, 77.2300, 4.8, 1450),

('p4', 'Suresh Yadav', 'suresh.partner@example.com', '$2b$10$dummyhash', '+91 98765 43213', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200', 'bicycle', 'N/A', 'DL4567890123', 28.6200, 77.2100, 4.6, 750),

('p5', 'Manoj Verma', 'manoj.partner@example.com', '$2b$10$dummyhash', '+91 98765 43214', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', 'scooter', 'DL 1S GH 3456', 'DL5678901234', 28.6100, 77.1900, 4.4, 820),

('p6', 'Deepak Chauhan', 'deepak.partner@example.com', '$2b$10$dummyhash', '+91 98765 43215', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200', 'bike', 'DL 6C IJ 7890', 'DL6789012345', 28.6600, 77.2400, 4.9, 1680);
