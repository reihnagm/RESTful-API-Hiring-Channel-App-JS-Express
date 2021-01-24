const { v4: uuidv4 } = require("uuid")
const Company = require('../models/Company')
const fs = require('fs-extra')
const redis = require('../configs/redis')
const misc = require('../helpers/helper')

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
      const total = await Company.total()
      const resultTotal = Math.ceil(total[0].total / show)
      const perPage = Math.ceil(resultTotal / show)
      const prevPage = page === 1 ? 1 : page - 1
      const nextPage = page === perPage ? 1 : page + 1
      const data = await Company.allv2(offset, show, sort, sortby, search)
      for (let i = 0; i < data.length; i++) {
        const companyObj = {}
        const skills = await Company.getSkillsBasedOnProfile(data[i].uid)
        companyObj.uid = data[i].uid
        companyObj.slug= data[i].slug
        companyObj.logo = data[i].logo
        companyObj.title = data[i].title
        companyObj.content = data[i].content
        companyObj.salary = data[i].salary
        companyObj.skills = skills
        dataAssign.push(companyObj)
      }
      const pageDetail = {
        total: resultTotal,
        perPage: perPage,
        nextPage: nextPage,
        prevPage: prevPage,
        currentPage: page,
        nextLink: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prevLink: `${process.env.BASE_URL}${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      }
      misc.responsePagination(res, 200, false, null, pageDetail, dataAssign)
    } catch (err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  store: async (req, res) => {
    let logo, filename, ext, fileSize, companyObj
    companyObj = {}
    const { name, location, description, email, telephone } = req.body

    try {
      
      if(req.file) {
        filename = req.file.originalname
        ext =  req.file.originalname.split('.').pop()
        fileSize = req.file.fileSize
        if(fileSize >= process.env.IMAGE_SIZE) { 
          fs.unlink(`${process.env.BASE_URL_IMAGE_COMPANY}/${filename}`)
          throw new Error("Oops!, size is too large. Max: 1MB.")
        }
        if(!misc.isImage(ext)) {
          fs.unlink(`${process.env.BASE_URL_IMAGE_COMPANY}/${filename}`)
          throw new Error("Oops! File allowed only JPG, JPEG, PNG, GIF, SVG.")
        }
        logo = req.file.originalname
      } else {
        logo = req.body.logo
      }

      companyObj.logo = logo
      companyObj.name = name
      companyObj.location = location
      companyObj.description = description
      companyObj.email = email
      companyObj.telephone = telephone
      
      await Company.store(companyObj)

      misc.response(res, 200, false, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  update: async (req, res) => {
    let postJobUid, logo, filename, ext, fileSize, companyObj
    companyObj = {}
    postJobUid = uuidv4()

    const { uid, userUid, name, location, description, email, telephone, postJob } = req.body

    let data = {
      uid: postJobUid,
      content: postJob,
      user_uid: userUid,
      company_uid: uid
    }

    try {

      await Company.storePostJob(data)

      if(req.file) {
        filename = req.file.originalname
        ext = req.file.originalname.split('.').pop()
        fileSize = req.file.fileSize
        if(fileSize >= process.env.IMAGE_SIZE) { 
          fs.unlink(`${process.env.BASE_URL_IMAGE_COMPANY}/${filename}`)
          throw new Error('Oops! Size cannot more than 1MB.')
        }
        if(!misc.isImage(extension)) {
          fs.unlink(`${process.env.BASE_URL_IMAGE_COMPANY}/${filename}`)
          throw new Error('Oops! File allowed only JPG, JPEG, PNG, GIF, SVG.')
        }
        logo = req.file.originalname
      } else {
        logo = req.body.logo
      }
      
      companyObj.logo = logo
      companyObj.name = name
      companyObj.location = location
      companyObj.description = description
      companyObj.email = email
      companyObj.telephone = telephone
 
      await Company.update(companyObj, uid)
  
      misc.response(res, 200, false, null, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  edit: async (req, res) => {
    try {
      const companyUid = request.params.uid
      const company = await Company.edit(companyUid)
      misc.response(res, 200, false, null, company)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  delete: async (req, res) => {
    try {
      const companyUid = request.params.Uid
      await Company.delete(companyUid)
      misc.response(res, 200, false, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },
  
  getProfile: async (req, res) => {
    const profileObj = {}
    const userUid = req.body.userUid
    const profile = await Company.getProfilev2(userUid)

    try {
      
      profileObj.uid = profile.uid
      profileObj.logo = profile.logo 
      profileObj.name = profile.name
      profileObj.email = profile.email
      profileObj.content = profile.content
      profileObj.description = profile.description
      profileObj.requirement = profile.requirement
      profileObj.location = profile.location
      profileObj.telephone = profile.telephone
      profileObj.username = profile.username

      misc.response(res, 200, false, null, profileObj)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  getProfileBySlug: async (req, res) => {
    let profileObj = {}
    const slug = req.params.slug

    try {
      
      const profile = await Company.getProfileBySlug(slug)
      const skills = await Company.getSkillsBasedOnProfile(profile.uid)

      profileObj.title = profile.title
      profileObj.slug = profile.slug
      profileObj.name = profile.name
      profileObj.email = profile.email
      profileObj.location = profile.location
      profileObj.logo = profile.logo
      profileObj.content = profile.content
      profileObj.description = profile.description
      profileObj.telephone = profile.telephone
      profileObj.skills = skills

      misc.response(res, 200, false, null, profileObj)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  storePostJob: async (req, res) => {
    let postJobUid, postJobTypesUid
    postJobUid = uuidv4()
    postJobTypesUid = uuidv4()
    
    const { title, content, salary, skills, jobtypes, companyUid } = req.body

    const allSkill = JSON.parse(skills)

    for(let i = 0; i < allSkill.length; i++) {
      await Company.storePostJobSkills(uuidv4(), allSkill[i].uid, postJobUid)
    }

    await Company.storePostJobTypes(postJobTypesUid, jobtypes.uid, postJobUid)  

    try {
      let payload = {
        uid: postJobUid,
        title: title, 
        content: content,
        salary: salary,
        company_uid: companyUid,
        slug: misc.makeid(5)
      }
      await Company.storePostJob(payload)
      misc.response(res, 200, false, null, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  editPostJob: async (req, res) => {
    let postObj = {}
    const slug = req.body.slug    
    const postjob = await Company.getProfileBySlug(slug)
    const skills = await Company.getSkillsBasedOnProfile(postjob.uid)
    const jobtypes = await Company.getJobTypesBasedOnProfile(postjob.uid)

    postObj.title = postjob.title
    postObj.slug = postjob.slug
    postObj.name = postjob.name
    postObj.email = postjob.email
    postObj.salary = postjob.salary
    postObj.location = postjob.location
    postObj.logo = postjob.logo
    postObj.content = postjob.content
    postObj.description = postjob.description
    postObj.telephone = postjob.telephone
    postObj.skills = skills
    postObj.jobtypes = jobtypes

    try {
      misc.response(res, 200, false, null, postObj)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  updatePostJob: async (req, res) => {

  }

}
