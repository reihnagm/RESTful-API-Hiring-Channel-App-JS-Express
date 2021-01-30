const { v4: uuidv4 } = require("uuid")
const Engineer = require("../models/Engineer")
const fs = require("fs-extra")
const redis = require("../configs/redis")
const misc = require("../helpers/helper")

module.exports = {

  all: async (req, res) => {
    const dataAssign = []
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ""
    const sort = req.query.sort === "newer" ? "DESC" : "ASC"
    const sortby = req.query.filterby === "latest-update" ? "updated_at" : req.query.filterby || "updated_at"
    const show = parseInt(req.query.show) || 5
    const offset = (page - 1) * show
    try {
      const total = await Engineer.total()
      const resultTotal = Math.ceil(total[0].total / show) 
      const perPage = Math.ceil(resultTotal / show) 
      const prevPage = page === 1 ? 1 : page - 1
      const nextPage = page === perPage ? 1 : page + 1
      const data = await Engineer.allv2(offset, show, sort, sortby, search)
      for (let i = 0; i < data.length; i++) {
        const engineerObj = {}
        const skills = await Engineer.getSkillsBasedOnProfile(data[i].uid)
        engineerObj.uid = data[i].uid
        engineerObj.fullname = data[i].username
        engineerObj.avatar = data[i].avatar
        engineerObj.salary = data[i].salary
        engineerObj.slug = data[i].slug 
        engineerObj.skills = skills
        dataAssign.push(engineerObj)
      }
      const pageDetail = {
        total: resultTotal,
        perPage: perPage,
        nextPage: nextPage,
        prevPage: prevPage,
        currentPage: page,
        nextUrl: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prevUrl: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      }
      misc.responsePagination(res, 200, false, null, pageDetail, dataAssign)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
      // next(err)
    }
  },

  store: async (req, res) => {
    let avatar, filename, ext, fileSize, engineerObj
    engineerObj = {}
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
    let engineer, userUid, slug, skillsStore, skillsDestroy, avatar, filename, ext, fileSize, engineerObj
    engineerObj = {}
    const { uid, fullname, nickname, description, location, birthdate, showcase, telephone, salary } = req.body
    
    engineer = await Engineer.getProfileByEngineer(uid)
    userUid = engineer.userUid
    slug = misc.slug(fullname, false, null)

    skillsStore = JSON.parse(req.body.skillsStore)
    skillsDestroy = JSON.parse(req.body.skillsDestroy) 

    // Store skills
    for(let z = 0; z < skillsStore.length; z++) {
      const checkSkills = await Engineer.checkSkills(skillsS[z].uid, uid)
      if(checkSkills.length == 0) {
        await Engineer.storeSkills(uuidv4(), skillsS[z].uid, uid)
      }
    }

    // Destroy skills
    for (let i = 0; i < skillsDestroy.length; i++) {
      for (let z = 0; z < skillsDestroy[i].length; z++) {
        await Engineer.destroySkills(skillsD[i][z].uid, uid)
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
    const profileObj = {}
    const slug = req.params.slug
    const profile = await Engineer.getProfileBySlug(slug)
    const skills = await Engineer.getSkillsBasedOnProfile(profile.uid)
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
  }
  
}
