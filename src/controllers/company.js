const Company = require('../models/Company')
const fs = require('fs-extra')
const redis = require('../configs/redis')
const misc = require('../helpers/response')

module.exports = {

  all: async (request, response) => {
    const page = parseInt(request.query.page) || 1
    const search = request.query.search || ''
    const limit = request.query.limit || 5
    const sort = request.query.sort || 'DESC'
    const sortBy = request.query.sortBy || 'date_updated'
    const offset = (page - 1) * limit
    try {
      const total = await Company.total()
      const resultTotal = limit > 5 ? Math.ceil(total[0].total / limit) : total[0].total
      const lastPage = Math.ceil(resultTotal / limit)
      const prevPage = page === 1 ? 1 : page - 1
      const nextPage = page === lastPage ? 1 : page + 1
      const data = await Company.all(offset, limit, sort, sortBy, search)
      const pageDetail = {
        total: resultTotal,
        per_page: limit,
        next_page: nextPage,
        prev_page: prevPage,
        current_page: page,
        nextLink: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
        prevLink: `${process.env.BASE_URL}${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
      }
      misc.responsePagination(response, 200, false, null, pageDetail, data)
    } catch (error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  store: async (request, response) => {
    let error = false
    let filename
    let extension
    let fileSize
    if(request.file) {
      filename = request.file.originalname
      extension =  request.file.originalname.split('.')[1]
      fileSize = request.file.fileSize
    }
    try {
      if(request.file) {
        if(fileSize >= 5242880) { // size 5 MB
          error = true
          fs.unlink(`public/images/company/${filename}`)
          throw new Error("Oops! Size cannot more than 5MB.")
        }
        if(!isImage(extension)) {
          error = true
          fs.unlink(`public/images/company/${filename}`)
          throw new Error("Oops! File allowed only JPG, JPEG, PNG, GIF, SVG.")
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
      const data = {
        name: request.body.name,
        location: request.body.location,
        description: request.body.description,
        email: request.body.email,
        telephone: request.body.telephone,
        logo: request.file ? request.file.originalname : '',
        user_id: request.body.user_id
      }
      if(error === false) {
        await Company.store(data)
        misc.response(response, 200, false, null, data)
      }
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  update: async (request, response) => {
    let error = false
    let filename
    let extension
    let fileSize
    if(request.file) {
        filename = request.file.originalname
        extension =  request.file.originalname.split('.')[1]
        fileSize = request.file.fileSize
    }
    try {
      if(request.file) {
        if(fileSize >= 5242880) { // 5 MB 
          error = true
          fs.unlink(`public/images/company/${filename}`)
          throw new Error('Oops! Size cannot more than 5MB.')
        }
        if(!isImage(extension)) {
          error = true
          fs.unlink(`public/images/company/${filename}`)
          throw new Error('Oops! File allowed only JPG, JPEG, PNG, GIF, SVG.')
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
        let logo
        if(request.file) {
          logo = request.file.originalname
        } else {
          logo = request.body.logo
        }
        const data = {
          name: request.body.name,
          location: request.body.location,
          description: request.body.description,
          email: request.body.email,
          telephone: request.body.telephone,
          logo,
          user_id: request.body.user_id
        }
      if(error === false) {
        let name = request.body.name
        let company_id = request.params.id
        let user_id = request.body.user_id
        let slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
        await Company.update(data, company_id)
        await Company.updateNameUser(name, slug, user_id)
        misc.response(response, 200, false, null, data)
        redis.flushall()
      }
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  edit: async (request, response) => {
    try {
      const company_id = request.params.id
      const data = await Company.edit(company_id)
      misc.response(response, 200, false, null, data)
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  delete: async (request, response) => {
    try {
      const company_id = request.params.id
      await Company.delete(company_id)
      misc.response(response, 200, false, null)
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },
  
  getProfile: async (request, response) => {
    const user_id = request.body.user_id
    try {
      const data = await Company.getProfile(user_id)
      redis.get(`user_id_companies:${user_id}`, (errorRedis, resultRedis) => {
        if(resultRedis) {
          if(typeof user_id !== 'undefined') {
            misc.response(response, 200, false, null, JSON.parse(resultRedis))
          }
        } else {
          if(typeof user_id !== 'undefined') {
            redis.setex(`user_id_companies:${user_id}`, 3600, JSON.stringify(data[0]))
            misc.response(response, 200, false, null, data[0])
          }
        }
      })
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  },

  getProfileBySlug: async (request, response) => {
    const slug = request.params.slug
    try {
      const data = await Company.getProfileBySlug(slug)
      misc.response(response, 200, false, null, data[0])
    } catch(error) {
      console.log(error.message) // in-development
      misc.response(response, 500, true, 'Server Error.')
    }
  }

}
