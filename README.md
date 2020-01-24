a Simple RESTful API this match for learning from scratch, especially this project build use MYSQL Database.

---
## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/)
- Nodemon - Download and Install [Nodemon](https://nodemon.io/)
---

## Featured
<ol>
    <li>Auth with JWT</li>
    <li>Validate File Image</li>
    <li>Password Hashing</li>
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
POST api/v1/engineers  
PATCH api/v1/engineers/:id
POST api/v1/engineers/profile

GET api/v1/companies  
POST api/v1/companies  
PATCH api/v1/companies/:id  
POST api/v1/companies/profile 

### Problem with Bcrypt-JS
- if you Linux user and new migrate to Windows, maybe getting an error when installing npm, in my case, specify package "bcrypt", try to uninstall "npm uninstall bcrypt" and install "bcrypt-nodejs"

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
