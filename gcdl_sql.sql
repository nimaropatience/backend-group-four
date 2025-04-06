CREATE DATABASE GCDL;

USE GCDL;

CREATE TABLE users(
    username VARCHAR(10),
    password VARCHAR(10),
    email VARCHAR(20)
);

CREATE TABLE Produce(
    ProduceId VARCHAR(10) PRIMARY KEY,
    ProduceName VARCHAR(10),
    Type VARCHAR(10),
    Date DATE,
    Time TIME,
    Tonnage INT(10),
    Cost INT(10),
    DealerName VARCHAR(10),
    Branch VARCHAR(10),
    Contact VARCHAR(10),
    SellingPrice INT(10)
);

CREATE TABLE Sales(
    SalesId VARCHAR(10) PRIMARY KEY,
    ProduceName VARCHAR(10),
    Tonnage INT(10),
    AmountPaid INT(10),
    BuyersName VARCHAR(10),
    SalesAgentsName VARCHAR(10),
    Date DATE,
    Time TIME,
    BuyersContact VARCHAR(10)
);

CREATE TABLE Receipt(
    ReceiptID VARCHAR(10) PRIMARY KEY,
    AmountPaid INT(10),
    SalesAgentsName VARCHAR(10),
    BuyersName VARCHAR(10),
    ProduceName VARCHAR(10)
);

CREATE TABLE creditSales(
    BuyersName VARCHAR(10),
    NIN VARCHAR (15),
    Location VARCHAR(10), 
    AmountDue INT(10),
    DueDate DATE,
    ProduceId VARCHAR(10),
    FOREIGN KEY (ProduceId) REFERENCES Produce(ProduceId)
);


CREATE TABLE stockManagement(
    ProduceName VARCHAR(20),
    ProduceId VARCHAR(20),
    TonnageSold INT(10),
    TonnageBought INT(10),
    CurrentTonnage INT(10),
    FOREIGN KEY (ProduceId) REFERENCES Produce(ProduceId)
);

