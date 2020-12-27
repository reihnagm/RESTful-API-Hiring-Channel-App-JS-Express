const { v4: uuidv4 } = require("uuid")
const Engineer = require('../models/Engineer')
const fs = require('fs-extra')
const redis = require('../configs/redis')
const misc = require('../helpers/response')
const s = require('../helpers/slug')
const f = require('../helpers/file')

module.exports = {

  all: async (request, response) => {
    const a = []
    const page = parseInt(request.query.page) || 1
    const search = request.query.search || ''
    const sort = request.query.sort == "newer" ? "DESC" : "ASC"
    const sortBy = request.query.sortby == "latest-update" ? "updated_at" : request.query.sortby
    const show = parseInt(request.query.show) || 5
    const offset = (page - 1) * show
    try {
      const total = await Engineer.total()
      const resultTotal = Math.ceil(total[0].total / show) 
      const perPage = Math.ceil(resultTotal / show) 
      const prevPage = page === 1 ? 1 : page - 1
      const nextPage = page === perPage ? 1 : page + 1
      const data = await Engineer.allv2(offset, show, sort, sortBy, search)
      for (let i = 0; i < data.length; i++) {
        const o = {}
        const skills = await Engineer.getSkillsBasedOnProfile(data[i].uid)
        o.uid = data[i].uid
        o.fullname = data[i].fullname
        o.avatar = data[i].avatar
        o.salary = data[i].salary
        o.slug = data[i].slug 
        o.skills = skills
        a.push(o)
      }
      const pageDetail = {
        total: resultTotal,
        perPage: perPage,
        nextPage: nextPage,
        prevPage: prevPage,
        currentPage: page,
        nextUrl: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prevUrl: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      }
      misc.responsePagination(response, 200, false, null, pageDetail, a)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  store: async (request, response) => {
    let avatar, filename, extension, fileSize
    const o = {}
    if(request.file) {
      filename = request.file.originalname
      extension = request.file.originalname.split('.').pop()
      fileSize = request.file.fileSize
    }
    try {
      if(request.file) {
        if(fileSize >= process.env.IMAGE_SIZE) { 
          fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
          throw new Error('Oops!, size is too large. Max: 5MB.')
        }
        if(!f.isImage(extension)) {
          fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
          throw new Error('Oops!, file allowed only JPG, JPEG, PNG, GIF, SVG.')
        }
         avatar = request.file.originalname
      } else {
        avatar = request.body.avatar ? request.body.avatar : "avatar.png"
      }
      o.description = request.body.description
      o.skill = request.body.skill
      o.location = request.body.location
      o.birthdate = request.body.birthdate
      o.showcase = request.body.showcase
      o.telephone = request.body.telephone
      o.salary = request.body.salary
      o.avatar = avatar
      await Engineer.store(o)
      misc.response(response, 200, false, null, o)     
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error')
    }
  },

  update: async (request, response) => {
    let avatar, filename, extension, fileSize
    const o = {}
    const uid = request.body.uid
    const userUid = request.body.userUid
    const fullname = request.body.fullname
    const slug = s.slug(fullname, false, null)
    const nickname = request.body.nickname
    const description = request.body.description 
    const location = request.body.location
    const birthdate = request.body.birthdate
    const showcase = request.body.showcase
    const telephone = request.body.telephone
    const salary = request.body.salary

    // All skills selected 
    const skillsS = JSON.parse(request.body.skillsStore)

     // All skills unselected
    const skillsD = JSON.parse(request.body.skillsDestroy) 

    // Store skills
    for(let z = 0; z < skillsS.length; z++) {
      const checkSkills = await Engineer.checkSkills(skillsS[z].uid, uid)
      if(checkSkills.length == 0) {
        await Engineer.storeSkills(uuidv4(), skillsS[z].uid, uid)
      }
    }

    // Delete skills
    for (let i = 0; i < skillsD.length; i++) {
      for (let z = 0; z < skillsD[i].length; z++) {
        await Engineer.destroySkills(skillsD[i][z].uid, uid)
      }
    }

    if(request.file) {
      filename = request.file.originalname
      extension = request.file.originalname.split('.').pop()
      fileSize = request.file.fileSize
    }

    try {
      if(request.file) {
        if(fileSize >= process.env.IMAGE_SIZE) {
          fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
          throw new Error('Oops!, size is too large. Max: 5MB.')
        }
        if(!f.isImage(extension)) {
          fs.unlink(`${process.env.BASE_URL_IMAGE_ENGINEER}/${filename}`)
          throw new Error('Oops! file allowed only JPG, JPEG, PNG, GIF, SVG')
        }
      }
      if(request.file) {
        avatar = request.file.originalname
      } else {
        avatar = request.body.avatar
      }
      o.location = location
      o.birthdate = birthdate
      o.showcase = showcase
      o.telephone = telephone
      o.salary = salary
      o.avatar =  avatar
      o.description = description

      await Engineer.update(o, uid)
      await Engineer.updateNameUser(fullname, slug, userUid)
      misc.response(response, 200, false, null, o)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  delete: async (request, response) => {
    const engineerId = request.params.engineerId
    const userId = request.params.userId
    try {
      await Engineer.delete(engineerId)
      await Engineer.deleteUser(userId)
      misc.response(response, 200, null, false)
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  getSkills: async (request, response) => {
    const data = await Engineer.getSkills()
    try {
      misc.response(response, 200, false, null, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  getProfile: async (request, response) => {
    const userUid = request.body.userUid
    const o = {}
    const p = await Engineer.getProfile(userUid)
    const skills = await Engineer.getSkillsBasedOnProfile(p.uid)
    try {
      o.id = p.id
      o.uid = p.uid
      o.fullname = p.fullname
      o.nickname = p.nickname
      o.email = p.email
      o.skills = skills
      o.description = p.description
      o.location = p.location
      o.birthdate = p.birthdate
      o.showcase = p.showcase
      o.telephone = p.telephone
      o.avatar = p.avatar
      o.salary = p.salary
      o.created_at = p.created_at
      o.updated_at = p.updated_at  
      misc.response(response, 200, false, null, o) 
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  getProfileBySlug: async (request, response) => {
    const slug = request.params.slug
    const o = {}
    const p = await Engineer.getProfileBySlug(slug)
    const skills = await Engineer.getSkillsBasedOnProfile(p.uid)
    try {
      o.id = p.id
      o.fullname = p.fullname
      o.description = p.description
      o.location = p.location
      o.birthdate = p.birthdate
      o.showcase = p.showcase
      o.telephone = p.telephone
      o.avatar = p.avatar
      o.salary = p.salary
      o.user_uid = p.user_uid
      o.created_at = p.created_at
      o.updated_at = p.updated_at
      o.name = p.name
      o.email = p.email
      o.skills = skills
      misc.response(response, 200, false, null, o)
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  }
  
}
