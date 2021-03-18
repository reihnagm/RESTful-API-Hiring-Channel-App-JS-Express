const { v4: uuidv4 } = require("uuid")
const Engineer = require("../models/Engineer")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const fs = require("fs-extra")
const redis = require("../configs/redis")
const misc = require("../helpers/helper")

module.exports = {

  allWithPagination: async (req, res) => {
    let page, search, sort, sortby, show, offset
    let total, resultTotal, perPage, prevPage, nextPage
    let pageDetail
    let dataAssign = []

    page = parseInt(req.query.page) || 1
    search = req.query.search || ""
    sort = req.query.sort === "newer" ? "DESC" : "ASC"
    sortby = req.query.filterby === "latest-update" ? "updated_at" : req.query.filterby || "updated_at"
    show = parseInt(req.query.show) || 10   
    offset = (page - 1) * show
    
    try {
      
      total = await Engineer.total()
      resultTotal = Math.ceil(total[0].total / show) 
      perPage = Math.ceil(resultTotal / show) 
      prevPage = page === 1 ? 1 : page - 1
      nextPage = page === perPage ? 1 : page + 1

      data = await Engineer.allWithPagination(offset, show, sort, sortby, search)
      for (let i = 0; i < data.length; i++) {
        let engineerObj = {}
        const skills = await Engineer.getSkillsBasedOnProfile(data[i].uid)

        engineerObj.uid = data[i].uid
        engineerObj.fullname = data[i].fullname
        engineerObj.avatar = data[i].avatar
        engineerObj.salary = data[i].salary
        engineerObj.slug = data[i].slug 
        engineerObj.skills = skills

        dataAssign.push(engineerObj)
      }
      pageDetail = {
        total: resultTotal,
        perPage: perPage,
        nextPage: nextPage,
        prevPage: prevPage,
        currentPage: page,
        nextUrl: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prevUrl: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      } 
      misc.responsePagination(res, 200, false, null, pageDetail, dataAssign)
      misc.responsePagination(res, 200, false, null, null, dataAssign)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  allWithInfiniteScroll: async (req, res) => {
    let page, search, sort, sortby, show, offset
    let data
    let dataAssign = []

    page = parseInt(req.query.page) || 1
    search = req.query.search || ""
    sort = req.query.sort === "newer" ? "DESC" : "ASC"
    sortby = req.query.filterby === "latest-update" ? "updated_at" : req.query.filterby || "updated_at"
    show = parseInt(req.query.show) || 10
    offset = parseInt(req.query.offset) || 0   
   
    try {
      data = await Engineer.allWithInfiniteScroll(offset, show, sort, sortby, search)
      for (let i = 0; i < data.length; i++) {
        let engineerObj = {}
        const skills = await Engineer.getSkillsBasedOnProfile(data[i].uid)

        engineerObj.uid = data[i].uid
        engineerObj.fullname = data[i].fullname
        engineerObj.avatar = data[i].avatar
        engineerObj.salary = data[i].salary
        engineerObj.slug = data[i].slug 
        engineerObj.skills = skills

        dataAssign.push(engineerObj)
      }
      misc.responsePagination(res, 200, false, null, null, dataAssign)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  store: async (req, res) => {
    let avatar, filename, ext, fileSize
    let engineerObj = {}

    const { description, skill, location, birthdate, showcase, telephone, salary } = req.body

    try {
      
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
        avatar = request.file.originalname
      } else {
        avatar = request.body.avatar
      }

      engineerObj.description = description
      engineerObj.skill = skill
      engineerObj.location = location
      engineerObj.birthdate = birthdate
      engineerObj.showcase = showcase
      engineerObj.telephone = telephone
      engineerObj.salary = salary
      engineerObj.avatar = avatar

      await Engineer.store(engineerObj)
      misc.response(res, 200, false, null)     
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error')
    }
  },

  update: async (req, res) => {
    let engineer, userUid, slug
    let skillsStore, skillsDestroy
    let avatar, filename, ext, fileSize
    let engineerObj = {}
   
    const { uid, fullname, nickname, description, location, birthdate, showcase, telephone, salary } = req.body
    
    engineer = await Engineer.getProfileByEngineer(uid)
    userUid = engineer.userUid
    slug = misc.slug(fullname, false, null)

    skillsStore = JSON.parse(req.body.skillsStore)
    skillsDestroy = JSON.parse(req.body.skillsDestroy) 

    // Store skills
    for(let z = 0; z < skillsStore.length; z++) {
      const checkSkills = await Engineer.checkSkills(skillsStore[z].uid, uid)
      if(checkSkills.length == 0) {
        await Engineer.storeSkills(uuidv4(), skillsStore[z].uid, uid)
      }
    }

    // Destroy skills
    for (let i = 0; i < skillsDestroy.length; i++) {
      for (let z = 0; z < skillsDestroy[i].length; z++) {
        await Engineer.destroySkills(skillsDestroy[i][z].uid, uid)
      }
    }

    try {

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
          throw new Error('Oops! file allowed only JPG, JPEG, PNG, GIF, SVG')
        }
        avatar = req.file.originalname
      } else {
        avatar = req.body.avatar
      }
      
      engineerObj.location = location
      engineerObj.birthdate = birthdate
      engineerObj.showcase = showcase
      engineerObj.salary = salary
      engineerObj.avatar =  avatar
      engineerObj.description = description
      engineerObj.telephone = telephone

      await Engineer.update(engineerObj, uid)
      await Engineer.updateNameUser(fullname, nickname, slug, userUid)
      
      misc.response(res, 200, false, null)

    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  delete: async (req, res) => {
    const engineerUid = req.params.engineerUid
    const userUid = req.params.userUid
    try {
      await Engineer.delete(engineerUid)
      await Engineer.deleteUser(userUid)
      misc.response(res, 200, false, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  getProfile: async (req, res) => {
    const profileObj = {}
    const userUid = req.body.userUid
    const profile = await Engineer.getProfile(userUid)
    const skills = await Engineer.getSkillsBasedOnProfile(profile.uid)
    
    try { 
    
      profileObj.id = profile.id
      profileObj.uid = profile.uid
      profileObj.fullname = profile.fullname
      profileObj.nickname = profile.nickname
      profileObj.email = profile.email
      profileObj.description = profile.description
      profileObj.location = profile.location
      profileObj.birthdate = profile.birthdate
      profileObj.showcase = profile.showcase
      profileObj.telephone = profile.telephone
      profileObj.avatar = profile.avatar
      profileObj.salary = profile.salary
      profileObj.skills = skills
      profileObj.created_at = profile.created_at
      profileObj.updated_at = profile.updated_at  

      misc.response(res, 200, false, null, profileObj) 
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  getProfileBySlug: async (req, res) => {
    let slug, profile, skills
    profileObj = {}
    slug = req.params.slug
    profile = await Engineer.getProfileBySlug(slug)
    skills = await Engineer.getSkillsBasedOnProfile(profile.uid)
   
    try {
      
      profileObj.id = profile.id
      profileObj.fullname = profile.fullname
      profileObj.description = profile.description
      profileObj.location = profile.location
      profileObj.birthdate = profile.birthdate
      profileObj.showcase = profile.showcase
      profileObj.telephone = profile.telephone
      profileObj.avatar = profile.avatar
      profileObj.salary = profile.salary
      profileObj.user_uid = profile.user_uid
      profileObj.created_at = profile.created_at
      profileObj.updated_at = profile.updated_at
      profileObj.name = profile.name
      profileObj.email = profile.email
      profileObj.skills = skills

      misc.response(res, 200, false, null, profileObj)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  dummy: async (req, res) => {
    let uid, fullname, nickname, email, slug, role, createdAt, updatedAt 
    let salt, password
    let userObj = {}

    for (let i = 0; i < 60; i++) {
      salt = await bcrypt.genSalt(10)
      passwordHash = await bcrypt.hash('123456', salt)
      
      uid = uuidv4()
      fullname = `dummy-${i}`
      nickname = `dummy-${i}`
      email = `dummy-${i}@gmail.com`
      slug = `dummy-${i}`
      role = 1
      createdAt = new Date()
      updatedAt = new Date()

      userObj.uid = uid
      userObj.nickname = nickname
      userObj.fullname = fullname
      userObj.email = email
      userObj.password = passwordHash
      userObj.role = role
      userObj.slug = slug
      userObj.created_at = created_at
      userObj.updated_at = updated_at

      await User.register(userObj)
      await Engineer.insertDataUser(uuidv4(), uid)
    }
    misc.response(res, 200, false, null, null)
  }
  
}
