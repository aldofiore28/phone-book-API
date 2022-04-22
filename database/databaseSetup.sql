USE master
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'phoneBook')
BEGIN
  CREATE DATABASE phoneBook;
END;
GO

USE phoneBook
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'address')
    CREATE TABLE address (
        id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        address1 VARCHAR(256) NOT NULL,
        address2 VARCHAR(256),
        city VARCHAR(50) NOT NULL,
        postcode VARCHAR(20) NOT NULL,
        country VARCHAR(50) NOT NULL
    )
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'phoneNumbers')
    CREATE TABLE phoneNumbers (
        id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        work VARCHAR(20),
        home VARCHAR(20),
        mobile VARCHAR(20) NOT NULL,
        other VARCHAR(20),
    )
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'record')
    CREATE TABLE record (
        id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        email VARCHAR(256) NOT NULL,
        frnPhoneNumbersId INT NOT NULL FOREIGN KEY REFERENCES phoneNumbers(id),
        frnAddressId INT NOT NULL FOREIGN KEY REFERENCES address(id)
    )
GO

INSERT INTO address (
    address1,
    city,
    postcode,
    country
) VALUES (
    'via consolare',
    'priverno',
    '04015',
    'italy'
)
