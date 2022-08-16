--Drop table UsersTable
-- Select * from UsersTable
-- CREATE TABLE [dbo].[UsersTable]( 
-- 	[UsersId] VARCHAR  (100) NOT NULL, 
-- 	[username] VARCHAR(100) UNIQUE,
-- 	[email] VARCHAR(100) UNIQUE,
-- 	[password] VARCHAR(100),
-- 	[role] VARCHAR(100) DEFAULT 'user',
-- 	[issent] VARCHAR(100) DEFAULT '0'


	

-- 	CONSTRAINT 
-- 	[PK_UsersTable]
-- 	PRIMARY KEY (
-- 	[UsersId]
-- 	),
-- )

-- CREATE PROCEDURE addUser ( @UsersId VARCHAR(100), @username VARCHAR(100), @email VARCHAR(100), @password VARCHAR(100))
--   AS
--   BEGIN

--   INSERT INTO UsersTable(UsersId,username,email,password) VALUES(@UsersId,@username, @email, @password)

--   END

  -- CREATE PROCEDURE getUser(@email VARCHAR(100))
  -- AS      
  -- BEGIN
  -- SELECT * FROM UsersTable WHERE email =@email
  -- END

-- CREATE PROCEDURE getUsers
--   AS
--   BEGIN
--   SELECT * FROM UsersTable
--   END
