-- Seed CEO user with id 1
-- Replace 'ceopassword' with a secure password
INSERT INTO users (id, username, password, email, role) 
VALUES (1, 'tarsis', '$2a$10$4s1XyX7z4t5U8v9W0x1Y2e3Z4a5b6c7d8e9f0g1h2i3j4k5l6m7n', 'tarsis@gcdl.com', 'ceo')
ON DUPLICATE KEY UPDATE 
  username = 'ceo', 
  password = '$2a$10$4s1XyX7z4t5U8v9W0x1Y2e3Z4a5b6c7d8e9f0g1h2i3j4k5l6m7n', 
  email = 'ceo@company.com', 
  role = 'ceo';