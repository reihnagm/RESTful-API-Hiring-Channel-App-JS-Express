require("dotenv").config()

const { v4: uuidv4 } = require("uuid")
const fs = require('fs-extra')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Engineer = require("../models/Engineer")
const Company = require("../models/Company")
const misc = require("../helpers/helper")

module.exports = {
  
  auth: async (req, res) => {
    let auth, userUid, roleUid, roleName, avatar
    let authObj = {}  

    userUid = req.user.uid

    auth = await User.auth(userUid)
    
    if(auth.role === 1) {
      const engineer = await Engineer.getProfile(userUid)
      roleUid = engineer.uid
      avatar = engineer.avatar 
      roleName = "Engineer"
    } else {
      const company = await Company.getProfilev2(userUid)
      roleUid = company.uid
      avatar = company.logo
      roleName = "Company"
    }
    
    try {
      
      authObj.id = auth.id
      authObj.uid = auth.uid
      authObj.avatar = avatar
      authObj.fullname = auth.fullname
      authObj.nickname = auth.nickname
      authObj.email = auth.email
      authObj.role = auth.role
      authObj.roleUid = roleUid
      authObj.roleName = roleName 
      authObj.createdAt = auth.created_at

      misc.response(res, 200, false, null, authObj)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error')
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.login(email)
      if (user.length === 0) {
        throw new Error('User not exists')
      }
      const isMatch = await bcrypt.compare(password, user[0].password)
      if (!isMatch) {
        throw new Error('Invalid Credentials')
      }
      const payload = {
        user: {
          id: user[0].id,
          uid: user[0].uid,
          fullname: user[0].fullname
        }
      }
      const access_token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
      const refresh_token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' })

      res.json({ 
        'access_token': access_token,
        'refresh_token': refresh_token
      })
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, err.message)
    }
  },

  register: async (req, res) => {
    let uid, logo, filename, extension, fileSize, slug, createdAt, updatedAt
    uid = uuidv4()
    createdAt = new Date()
    updatedAt = new Date()
    let userObj = {}
    let engineerObj = {}
    let companyObj = {}
    
    const { fullname, nickname, email, password, role, companyname, companyemail, companytelp, companydesc, companylocation } = req.body

    if(req.file) {
      
      filename = req.file.originalname
      ext = req.file.originalname.split('.').pop()
      fileSize = req.file.fileSize
      
      if(fileSize >= process.env.IMAGE_SIZE) { 
        fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
        throw new Error('Oops!, size is too large. Max: 1MB.')
      }
      
      if(!misc.isImage(ext)) {
        fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
        throw new Error('Oops!, file allowed only JPG, JPEG, PNG, GIF, SVG.')
      }
      
      logo = req.file.originalname

    }

    try {
      
      const checkUser = await User.checkUser(email)
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)
      
      if(checkUser.length !== 0) {
        throw new Error('User already exists')
      }
      slug = misc.slug(fullname, false) 
      const checkSlug = await User.checkSlug(slug)
      if(checkSlug.length !== 0) {
        slug = misc.slug(fullname, true, uid)
      }

      userObj.uid = uid
      userObj.nickname = nickname
      userObj.fullname = fullname
      userObj.email = email
      userObj.password = passwordHash
      userObj.role = role
      userObj.slug = slug
      userObj.created_at = createdAt
      userObj.updated_at = updatedAt
      
      const registered = await User.register(userObj)

      switch (parseInt(role)) {
        case 1:
          await Engineer.insertDataUser(uuidv4(), uid)
        break
        case 2:
          companyObj.uid = uuidv4()  
          companyObj.name = companyname
          companyObj.email = companyemail
          companyObj.logo = logo
          companyObj.telephone = companytelp
          companyObj.description = companydesc
          companyObj.location = companylocation
          companyObj.created_at = createdAt
          companyObj.updated_at = updatedAt
          companyObj.user_uid = uid
          await Company.insertDataUser(companyObj, uid)
        break
        default:
      }

      const payload = {
        user: {
          id: registered.insertId,
          uid: uid,
          fullname: fullname
        }
      }
      
      const access_token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
      const refresh_token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' })
      
      res.json({ 
        "access_token": access_token,
        "refresh_token": refresh_token
      })
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, err.message)
    }
  },
  
}
