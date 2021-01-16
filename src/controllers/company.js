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
      const data = await Company.all(offset, show, sort, sortby, search)
      for (let i = 0; i < data.length; i++) {
        const companyObj = {}
        companyObj.uid = data[i].uid
        companyObj.logo = data[i].logo
        companyObj.name = data[i].name
        companyObj.email = data[i].email
        companyObj.location = data[i].location
        companyObj.description = data[i].description
        companyObj.telephone = data[i].telephone
        companyObj.slug = data[i].slug 
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
    const slug = req.params.slug
    try {
      const data = await Company.getProfileBySlug(slug)
      misc.response(res, 200, false, null, data[0])
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  },

  postJob: async (req, res) => {
    const postJobUid = uuidv4()
    const { userUid, content } = req.body
    try {
      const data = await Company.sendPostJob(postJobUid, content, userUid)
      misc.response(res, 200, false, null, null)
    } catch(err) {
      console.log(err.message) // in-development
      misc.response(res, 500, true, 'Server Error.')
    }
  }

}
