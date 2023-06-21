# Dailygram (Backend Part)

## Description
An app which can manage todo list, trace expenditure record, and take note of your new connection.

### Tool 
1. Express.js
2. Mongoose
3. bcrypt
4. JWT(jsonwebtoken)

### Features & Discriptions
1. Authentication : User passwords get bcrypted before saved in mongoDB for the signin, then a JWT token will be sent back to the client
2. Authorization : middlware handle it by checking JWT token from the client
2. Rest API : CRUD maniupulation with MongoDB 
3. MVC structure : Modal(MongoDB data structure), View(React.js Frontend), Controller(Express.js)


### Deployment
https://dailygram2023-api.onrender.com
