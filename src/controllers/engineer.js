const Engineer = require('../models/Engineer')
const fs = require('fs-extra')
const misc = require('../helpers/response')
module.exports = {
    getAll: async (request, response) => {
        const page = parseInt(request.query.page) || 1
        const search = request.query.search || ''
        const limit = request.query.limit || 5
        const sort = request.query.sort || 'DESC'
        const sortBy = request.query.sortBy || 'date_updated'
        const offset = (page - 1) * limit
        try {
            const total = await Engineer.getTotal()
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Engineer.getAll(offset, limit, sort, sortBy, search)
            const pageDetail = {
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                next_url: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prev_url: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
                prev_url_page: `http://localhost:5000/api/v1/engineers?page=${prevPage}`,
                next_url_page: `http://localhost:5000/api/v1/engineers?page=${nextPage}`
            }
            misc.responsePagination(response, 200, false, 'Succesfull get all data.', pageDetail, data)
        }
        catch (error) {
            misc.response(response, 500, true, error.message)
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
                if(fileSize >= 5242880) {
                    error = true
                    fs.unlink(`public/images/engineer/${filename}`)
                    throw new Error('Oops!, Size cannot more than 5MB.')
                }
                if(!isImage(extension)) {
                    error = true
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
            const data = {
                description: request.body.description,
                skill: request.body.skill,
                location: request.body.location,
                birthdate: request.body.birthdate,
                showcase: request.body.showcase,
                telephone: request.body.telephone,
                salary: request.body.salary,
                avatar: request.file ? request.file.originalname : '',
                user_id: request.body.user_id
            }
            if(error === false) {
                await Engineer.store(data)
                misc.response(response, 200, false, 'Succesfull create data.', data)
            }
        } catch (error) {
            misc.response(response, 500, true, error.message)
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
                if(fileSize >= 5242880) {
                    error = true
                    fs.unlink(`public/images/engineer/${filename}`)
                    throw new Error('Oops!, Size cannot more than 5MB.')
                }
                if(!isImage(extension)) {
                    error = true
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
            const data = {
                description: request.body.description,
                skill: request.body.skill,
                location: request.body.location,
                birthdate: request.body.birthdate,
                showcase: request.body.showcase,
                telephone: request.body.telephone,
                salary: request.body.salary,
                avatar: request.file ? request.file.originalname : '',
                user_id: request.body.user_id
            }
            if(error === false) {
                const engineer_id = request.params.id
                const user_id = request.body.user_id
                const name = request.body.name
                await Engineer.update(data, engineer_id)
                await Engineer.updateNameUser(name, user_id)
                misc.response(response, 200, false, 'Succesfull update data.', data)
            }
        } catch (error) {
            misc.response(response, 500, true, error.message)
        }
    },
    delete: async (request, response) => {
        const engineer_id = request.params.id
        try {
            await Engineer.delete(engineer_id)
            misc.response(response, 200, false, 'Succesfull delete data.')
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    },
    getProfile: async (request, response) => {
        const user_id = request.body.user_id
        try {
            const data = await Engineer.getProfile(user_id)
            misc.response(response, 200, false, 'Succesfull get profile.', data[0])
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    }
}
