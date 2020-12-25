const { v4: uuidv4 } = require("uuid")
const Engineer = require('../models/Engineer')
const fs = require('fs-extra')
const redis = require('../configs/redis')
const misc = require('../helpers/response')
const s = require('../helpers/slug')

module.exports = {

  all: async (request, response) => {
    const o = {}
    const a = []
    const page = parseInt(request.query.page) || 1
    const search = request.query.search || ''
    const sort = request.query.sort || 'DESC'
    const sortBy = request.query.sortBy || 'updated_at'
    const limit = request.query.limit || 5
    const offset = (page - 1) * limit
    try {
      const total = await Engineer.total()
      const resultTotal = limit > 5 ? Math.ceil(total[0].total / limit) : total[0].total
      const lastPage = Math.ceil(resultTotal / limit)
      const prevPage = page === 1 ? 1 : page - 1
      const nextPage = page === lastPage ? 1 : page + 1
      const data = await Engineer.allv2(offset, limit, sort, sortBy, search)
      for (let i = 0; i < data.length; i++) {
        const skills = await Engineer.getSkillsBasedOnProfile(data[i].uid)
        o.uid = data[i].uid
        o.fullname = data[i].fullname
        o.avatar = data[i].avatar
        o.salary = data[i].salary
        o.slug = data[i].slug 
        o.skills = skills
      }
      a.push(o)
      const pageDetail = {
        total: resultTotal,
        per_page: lastPage,
        next_page: nextPage,
        prev_page: prevPage,
        current_page: page,
        next_url: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prev_url: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      }
      misc.responsePagination(response, 200, false, null, pageDetail, a)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  store: async (request, response) => {
    const o = {}
    let filename, extension, fileSize
    if(request.file) {
      filename = request.file.originalname
      extension =  request.file.originalname.split('.')[1]
      fileSize = request.file.fileSize
    }
    try {
      if(request.file) {
        if(fileSize >= 5242880) { 
          fs.unlink(`public/images/engineer/${filename}`)
          throw new Error('Oops!, Size cannot more than 5MB.')
        }
        if(!isImage(extension)) {
          fs.unlink(`public/images/engineer/${filename}`)
          throw new Error('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG.')
        }
        function isImage(extension) {
          switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
              return true
          }
            return false
        }
      }
      o.description = request.body.description
      o.skill = request.body.skill
      o.location = request.body.location
      o.birthdate = request.body.birthdate
      o.showcase = request.body.showcase
      o.telephone = request.body.telephone
      o.salary = request.body.salary
      o.avatar = request.file ? request.file.originalname : request.body.avatar
      o.user_id = request.body.user_id
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
    const fullname = request.body.fullname
    const nickname = request.body.nickname
    const slug = s.slug(fullname)
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
      extension =  request.file.mimetype
      fileSize = request.file.fileSize
    }

    try {
      if(request.file) {
        if(fileSize >= 5242880) {
          fs.unlink(`public/images/engineer/${filename}`)
          throw new Error('Oops! size cannot more than 5MB')
        }
        if(!isImage(extension)) {
          fs.unlink(`public/images/engineer/${filename}`)
          throw new Error('Oops! file allowed only JPG, JPEG, PNG, GIF, SVG')
        }
        function isImage(extension) {
          switch (extension) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':
            case 'image/bmp':
            case 'image/svg+xml':
              return true
          }
          return false
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
      // await Engineer.updateNameUser(name, slug, userUid)
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
      o.description = p.description
      o.location = p.location
      o.birthdate = p.birthdate
      o.showcase = p.showcase
      o.telephone = p.telephone
      o.avatar = p.avatar
      o.salary = p.salary
      o.user_id = p.user_id
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
