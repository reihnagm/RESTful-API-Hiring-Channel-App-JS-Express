a Simple RESTful API this match for learning from scratch, especially this project build use MYSQL Database.

---
## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/)
- Nodemon - Download and Install [Nodemon](https://nodemon.io/)
- Postman - Download and Install [Postman](https://www.getpostman.com/)
---

## Featured
<ol>
    <li>Auth with JWT.</li>
    <li>Validate File Image.</li>
    <li>Password Hashing.</li>
</ol>

---
## Installation
### Clone
```bash
$ git clone https://github.com/reihnagm/RESTful-API-Node-JS-Express.git
$ cd RESTful-API-Node-JS-Express
$ npm install
```

### Create Environment Variable
```bash
$ cp .env.example .env
$ nano .env
```

---
### Start Development Server
```bash
$ npm run start
```
---

### ENDPOINT
GET api/v1/engineers  
GET api/v1/engineers/profile/:slug
POST api/v1/engineers  
PATCH api/v1/engineers/:id
POST api/v1/engineers/profile

GET api/v1/companies  
GET api/v1/companies/profile/:slug
POST api/v1/companies  
PATCH api/v1/companies/:id  
POST api/v1/companies/profile

### HOW TO USE
You can test API via Postman or I finished building a website to consume this API. Check this : [React-Redux-Hiring-Channel-Website](https://github.com/reihnagm/React-Redux-Hiring-Channel-Website)

### Problem with Bcrypt-JS
- if you Linux user and new migrate to Windows, maybe getting an error when installing npm, in my case, specify package "bcrypt", try to uninstall "npm uninstall bcrypt" and install "bcrypt-nodejs".

## Other Dependencies
- [mysql](#)
- [bcryptjs](#)
- [dotenv](#)
- [fs-extra](#)
- [body-parser](#)
- [jsonwebtoken](#)
- [multer](#)
- [morgan](#)
- [redis](#)
- [cors](#)
- etc.
