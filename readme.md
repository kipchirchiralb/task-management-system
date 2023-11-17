## Let's bild a simple task management system. The database could have three tables: Users, Tasks, and Categories. Here's a basic schema:

### Users Table:

- UserID (Primary Key)
- Username
- Email
- Password

### Tasks Table:

- TaskID (Primary Key)
- Title
- Description
- DueDate
- UserID (Foreign Key referencing Users.UserID)
- CategoryID (Foreign Key referencing Categories.CategoryID)

### Categories Table:

- CategoryID (Primary Key)
- CategoryName

Now, let's set up two relationships:

A one-to-many relationship between Users and Tasks (one user can have many tasks).
Another one-to-many relationship between Categories and Tasks (one category can have many tasks).