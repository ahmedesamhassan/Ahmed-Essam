CREATE TABLE Doctor (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    phone VARCHAR(20)
);

CREATE TABLE Nursing (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100)
);

CREATE TABLE Patient (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    gender VARCHAR(10),
    date_of_birth DATE
);

CREATE TABLE Supervisor (
    id INT PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    department VARCHAR(100)
);

CREATE TABLE Medicine (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    price DECIMAL(10, 2)
);
***********************************************************************
-- Doctor
INSERT INTO Doctor VALUES (1, 'Ahmed Ali', 45, '0111111111');
INSERT INTO Doctor VALUES (2, 'Sara Youssef', 38, '0122222222');
INSERT INTO Doctor VALUES (3, 'Mohamed Hassan', 50, '0133333333');
INSERT INTO Doctor VALUES (4, 'Mona Adel', 42, '0144444444');
INSERT INTO Doctor VALUES (5, 'Ibrahim Said', 39, '0155555555');
INSERT INTO Doctor VALUES (6, 'Dina Omar', 35, '0166666666');
INSERT INTO Doctor VALUES (7, 'Ali Mahmoud', 47, '0177777777');
INSERT INTO Doctor VALUES (8, 'Laila Nasser', 41, '0188888888');
INSERT INTO Doctor VALUES (9, 'Youssef Farid', 33, '0199999999');
INSERT INTO Doctor VALUES (10, 'Nadia Helmy', 36, '0101010101');

-- Nursing
INSERT INTO Nursing VALUES (1, 'Alice', 'Cardiology');
INSERT INTO Nursing VALUES (2, 'Bella', 'Orthopedics');
INSERT INTO Nursing VALUES (3, 'Carla', 'Pediatrics');
INSERT INTO Nursing VALUES (4, 'Diana', 'Oncology');
INSERT INTO Nursing VALUES (5, 'Eva', 'Neurology');
INSERT INTO Nursing VALUES (6, 'Fiona', 'Gynecology');
INSERT INTO Nursing VALUES (7, 'Grace', 'Emergency');
INSERT INTO Nursing VALUES (8, 'Hannah', 'ICU');
INSERT INTO Nursing VALUES (9, 'Ivy', 'General');
INSERT INTO Nursing VALUES (10, 'Jane', 'Dermatology');

-- Patient
INSERT INTO Patient VALUES (1, 'Ali Kamal', 'Male', '1985-05-01');
INSERT INTO Patient VALUES (2, 'Mona Sayed', 'Female', '1990-07-10');
INSERT INTO Patient VALUES (3, 'Omar Ahmed', 'Male', '1975-09-15');
INSERT INTO Patient VALUES (4, 'Sara Ibrahim', 'Female', '2000-03-20');
INSERT INTO Patient VALUES (5, 'Fathy Adel', 'Male', '1988-12-12');
INSERT INTO Patient VALUES (6, 'Laila Sameh', 'Female', '1995-01-25');
INSERT INTO Patient VALUES (7, 'Samir Hassan', 'Male', '1979-11-30');
INSERT INTO Patient VALUES (8, 'Eman Nabil', 'Female', '1983-06-18');
INSERT INTO Patient VALUES (9, 'Mostafa Hany', 'Male', '1992-04-05');
INSERT INTO Patient VALUES (10, 'Dina Farid', 'Female', '1987-08-08');

-- Supervisor
INSERT INTO Supervisor VALUES (1, 'Mahmoud', 'Said', 'Pediatrics');
INSERT INTO Supervisor VALUES (2, 'Laila', 'Hassan', 'ICU');
INSERT INTO Supervisor VALUES (3, 'Fady', 'Omar', 'Cardiology');
INSERT INTO Supervisor VALUES (4, 'Rania', 'Kamal', 'Neurology');
INSERT INTO Supervisor VALUES (5, 'Sami', 'Youssef', 'Emergency');
INSERT INTO Supervisor VALUES (6, 'Noura', 'Saleh', 'Radiology');
INSERT INTO Supervisor VALUES (7, 'Omar', 'Fathy', 'Orthopedics');
INSERT INTO Supervisor VALUES (8, 'Yasmin', 'Adel', 'Oncology');
INSERT INTO Supervisor VALUES (9, 'Tamer', 'Nabil', 'Dermatology');
INSERT INTO Supervisor VALUES (10, 'Hana', 'Ibrahim', 'Surgery');

-- Medicine
INSERT INTO Medicine VALUES (1, 'Paracetamol', 'Tablet', 15.00);
INSERT INTO Medicine VALUES (2, 'Ibuprofen', 'Capsule', 25.00);
INSERT INTO Medicine VALUES (3, 'Amoxicillin', 'Syrup', 40.00);
INSERT INTO Medicine VALUES (4, 'Omeprazole', 'Tablet', 35.00);
INSERT INTO Medicine VALUES (5, 'Cough Syrup', 'Syrup', 20.00);
INSERT INTO Medicine VALUES (6, 'Vitamin C', 'Tablet', 18.00);
INSERT INTO Medicine VALUES (7, 'Insulin', 'Injection', 100.00);
INSERT INTO Medicine VALUES (8, 'Antibiotic Cream', 'Cream', 30.00);
INSERT INTO Medicine VALUES (9, 'Antihistamine', 'Tablet', 22.00);
INSERT INTO Medicine VALUES (10, 'Eye Drops', 'Drops', 28.00);
************************************************************************************
SELECT * FROM nursing
WHERE department = 'Emergency';

SELECT name FROM patient
WHERE gender = 'Male';

SELECT name, price FROM medicine
WHERE price > 30;

SELECT name, age FROM doctor
WHERE age BETWEEN 35 AND 45;

SELECT firstname, lastname FROM supervisor
WHERE department IN ('Cardiology', 'Neurology');

SELECT name, price FROM medicine
WHERE type = 'Tablet'
ORDER BY price DESC;

SELECT name, date_of_birth FROM patient
WHERE date_of_birth > '1990-01-01';

