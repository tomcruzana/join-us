CREATE TABLE users
  (
     email      VARCHAR(255) PRIMARY KEY,
     created_at TIMESTAMP DEFAULT NOW()
  );  
  
INSERT INTO users
            (email)
VALUES      ("timmy_03@ymail.com"),
            ("jimmy_boy05@gmail.com"); 