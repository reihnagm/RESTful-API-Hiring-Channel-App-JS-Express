require("dotenv").config()

const { v4: uuidv4 } = require("uuid")
const User = require("../models/User")
const Engineer = require("../models/Engineer")
const Company = require("../models/Company")
const misc = require("../helpers/response")
const s = require("../helpers/slug")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserNotExists extends Error {
  constructor(message) {
    super(message)
    this.name = 'UserNotExists'
  }
}

class UserAlreadyExists extends Error {
  constructor(message) {
    super(message)
    this.name = 'UserAlreadyExists'
  }
}

class InvalidCredentials extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidCredentials'
  }
}

module.exports = {
  
  auth: async (request, response) => {
    const userId = request.user.id
    try {
      const u = await User.auth(userId)
      misc.response(response, 200, false, null, u)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error')
    }
  },

  login: async (request, response) => {
    const { email, password } = request.body
    try {
      const user = await User.login(email)
      if (user.length === 0) {
        throw new UserNotExists('User not exists')
      }
      const isMatch = await bcrypt.compare(password, user[0].password)
      if (!isMatch) {
        throw new InvalidCredentials('Invalid Credentials')
      }
      const payload = {
        user: {
          id: user[0].id,
          uid: user[0].uid,
          fullname: user[0].fullname
        }
      }
      const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })
      response.json({ token })
    } catch(error) {
      misc.response(response, 500, true, error.message)
    }
  },

  register: async (request, response) => {
    const { fullname, nickname, email, password, role_id } = request.body
    const uid = uuidv4()
    const o = {} 
    const createdAt = new Date()
    const updatedAt = new Date()
    let slug
    try {
      const cu = await User.checkUser(email)
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)
      if(cu.length !== 0) {
        throw new UserAlreadyExists('User already exists')
      }
      slug = s.slug(fullname, false) 
      const cs = await User.checkSlug(slug)

      if(cs.length !== 0) {
        slug = s.slug(fullname, true, uid)
      } 

      o.uid = uid
      o.nickname = nickname
      o.fullname = fullname
      o.email = email
      o.password = passwordHash
      o.role_id = role_id
      o.slug = slug
      o.created_at = createdAt
      o.updated_at = updatedAt
      const registered = await User.register(o)
      switch (role_id) {
        case 1:
          await Engineer.insertDataUser(uuidv4(), uid)
        break
        case 2:
          await Company.insertDataUser(uuidv4(), uid)
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
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })
      response.json({ token })
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error')
    }
  },
  
}
