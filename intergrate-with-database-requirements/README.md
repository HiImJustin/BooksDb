### Books Assignment

### Startup Insturctions
* Install NPM depencdancies 
* - npm init
* - npm install express
* - npm install express-session
* - npm install express-validator
* - npm install validator
* - npm install bcrypt
* - npm install mysql2

### Admin user details - case sensitive
* username: castiel
* password: 1225

### database 
Import the database bookdb.sql into database 'bookdb' or Create one following the Schema below
### SQL Schema
books - bookID, bookTitle, datePublished, genre, millionsSold, language, authorID
authors - authorID, name, surname, nationality, birthYear, deathYear
users - firstName, lastName, email, username, password
log - userID, bookID, dateCreated, dateChanged

### start the server
Run Node Server with:  npm start or node server.js

### User Interface

### Anonymous
- login
### Access to the following pages only after login
- User list
- User Edit
- User Delete
- User Create

- Author list
- Author Edit
- Author Delete
- Author Create

- Book List
- Book Edit
- Book Delete
- Book Create

- Logout

### Authenticated

### Books
router.get('/api/allbooks')
router.post('/api/addbook') 
router.post('/api/updatebook')
router.delete('/api/deletebook)
### Authors
router.get('/api/allauthors')
router.post('/api/addauthor')
router.post('/api/updateauthor')
router.post('/api/deleteauthor')
### Users
router.get('/api/createusers)
router.post('/api/adduser')
router.post('/api/updateuser')
router.post('/api/deleteuser')

### Validation functions found in 'backend/models/validation.js'