CREATE DATABASE GCDL;

USE GCDL;

DROP TABLE IF EXISTS users;
-- Create Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role ENUM('ceo', 'user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Produce;
-- Create Produce table
CREATE TABLE produce (
  ProduceId VARCHAR(50) PRIMARY KEY,
  ProduceName VARCHAR(100) NOT NULL,
  Type VARCHAR(50) NOT NULL,
  Date DATE NOT NULL,
  Time TIME NOT NULL,
  Tonnage DECIMAL(10,2) NOT NULL,
  Cost DECIMAL(10,2) NOT NULL,
  DealerName VARCHAR(100) NOT NULL,
  Branch VARCHAR(100) NOT NULL,
  Contact VARCHAR(50) NOT NULL,
  SellingPrice DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Sales;
-- Create Sales table
CREATE TABLE Sales (
  SalesId VARCHAR(50) PRIMARY KEY,
  ProduceName VARCHAR(100) NOT NULL,
  Tonnage DECIMAL(10,2) NOT NULL,
  AmountPaid DECIMAL(10,2) NOT NULL,
  BuyersName VARCHAR(100) NOT NULL,
  SalesAgentsName VARCHAR(100) NOT NULL,
  Date DATE NOT NULL,
  Time TIME NOT NULL,
  BuyersContact VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Receipt;
-- Create Receipt table
CREATE TABLE Receipt (
  ReceiptID VARCHAR(50) PRIMARY KEY,
  AmountPaid DECIMAL(10,2) NOT NULL,
  SalesAgentsName VARCHAR(100) NOT NULL,
  BuyersName VARCHAR(100) NOT NULL,
  ProduceName VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS creditSales;
-- Create CreditSales table
CREATE TABLE CreditSales (
  NIN VARCHAR(50) PRIMARY KEY,
  BuyersName VARCHAR(100) NOT NULL,
  Location VARCHAR(100) NOT NULL,
  AmountDue DECIMAL(10,2) NOT NULL,
  DueDate DATE NOT NULL,
  ProduceId VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS stockManagement;

-- Create StockManagement table
CREATE TABLE StockManagement (
  ProduceId VARCHAR(50) PRIMARY KEY,
  ProduceName VARCHAR(100) NOT NULL,
  TonnageSold DECIMAL(10,2) NOT NULL,
  TonnageBought DECIMAL(10,2) NOT NULL,
  CurrentTonnage DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


