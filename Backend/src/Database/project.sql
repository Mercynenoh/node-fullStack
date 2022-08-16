--  CREATE TABLE [dbo].[Projects]( 
--  	[ProjectsId] VARCHAR(100) NOT NULL, 
--  	[name] VARCHAR(100) UNIQUE,
--  	[description] VARCHAR(200),
--  	[enddate] VARCHAR(200),
-- 	[email] VARCHAR (100) UNIQUE
	

	

--  	CONSTRAINT 
--  	email FOREIGN KEY(email) 

--     REFERENCES UsersTable(email)
-- 	)

-- CREATE PROCEDURE insertProjects(@ProjectsId VARCHAR(100) ,@name VARCHAR(100), @description VARCHAR(200) ,@enddate VARCHAR(200), @User_id VARCHAR(100))
--   AS
--   BEGIN
--   INSERT INTO Projects(ProjectsId,name,description, enddate, user_id) VALUES (@ProjectsId,@name,@description, @enddate, @User_id)
--   END

--  --  CREATE PROCEDURE getProjects
-- --  AS
-- --  BEGIN
-- --  SELECT * FROM Projects
-- --  END

--   --CREATE PROCEDURE getProject(@ProjectsId VARCHAR(100))
--   --AS
--   --BEGIN
--   --SELECT * FROM Projects WHERE ProjectsId =@ProjectsId
--   --END

--   CREATE PROCEDURE deleteProject(@ProjectsId VARCHAR(100))
--   AS
--   BEGIN
--   DELETE FROM Projects WHERE ProjectsId =@ProjectsId
--   END


  
--  CREATE PROCEDURE updateProject(@ProjectsId VARCHAR(100) ,@name VARCHAR(100), @description VARCHAR(200) ,@enddate VARCHAR(200))
--  AS
--  BEGIN
--  UPDATE Projects SET ProjectsId=@ProjectsId , name=@name , description=@description, enddate=@enddate WHERE ProjectsId =@ProjectsId

--   END


-- ALTER TABLE dbo.Projects
--  [User_id] VARCHAR (100) FOREIGN KEY REFERENCES UsersTable(UsersId)