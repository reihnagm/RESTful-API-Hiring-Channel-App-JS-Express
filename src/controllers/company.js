const Company = require('../models/Company')
const fs = require('fs-extra')
const misc = require('../helpers/response')
module.exports = {
    getAll: async (request, response) => {
        const page = parseInt(request.query.page) || 1
        const search = request.query.search || ''
        const limit = request.query.limit || 10
        const sort = request.query.sort || 'DESC'
        const sortBy = request.query.sortBy || 'date_updated'
        const offset = (page - 1) * limit
        try {
            const total = await Company.getTotal();
            const resultTotal =  Math.ceil(total[0].total);
            const checkNextPage =  Math.ceil(resultTotal / limit);
            const prevPage = page === 1 ? 1 : page - 1;
            const nextPage = page === checkNextPage ? 1 : page + 1;
            const data = await Company.getAll(offset, limit, sort, sortBy, search);
            const pageDetail = {
                total: resultTotal,
                per_page: limit,
                next_page: nextPage,
                prev_page: prevPage,
                current_page: page,
                nextLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            }
            misc.responsePagination(response, 200, false, 'Succesfull get all data.', pageDetail, data)
        } catch (error) {
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
                    fs.unlink(`public/images/company/${filename}`)
                    throw new Error('Oops!, Size cannot more than 5MB.')
                }
                if(!isImage(extension)) {
                    error = true
                    fs.unlink(`public/images/company/${filename}`)
                    throw new Error('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG.')
                }
                function isImage(extension) {
                    switch (filename) {
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
            await Company.store(data)
            misc.response(response, 200, false, 'Succesfull create data.', data)
        } catch(error) {
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
                    fs.unlink(`public/images/company/${filename}`)
                    throw new Error('Oops!, Size cannot more than 5MB.')
                }
                if(!isImage(extension)) {
                    error = true
                    fs.unlink(`public/images/company/${filename}`)
                    throw new Error('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG.')
                }
                function isImage(extension) {
                switch (filename) {
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
                logo: request.file ? request.file.originalname  : '',
                user_id: request.body.user_id
            }
            const company_id = request.params.id
            await Company.update(data, company_id)
            misc.response(response, 200, false, 'Succesfull update data.', data)
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    },
    edit: async (request, response) => {
        try {
            const company_id = request.params.id
            const data = await Company.edit(company_id)
            misc.response(response, 200, false, 'Succesfull edit data.', data)
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    },
    delete: async (request, response) => {
        try {
            const company_id = request.params.id
            await Company.delete(company_id)
            misc.response(response, 200, false, 'Succesfull delete data.')
        } catch(error) {
            misc.response(response, 500, true, error.message)
        }
    }
}
