const Engineer = require('../models/Engineer')
const fs = require('fs-extra')


module.exports = {
    getAllData: async (request, response) => {
            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'date_updated'
            const offset = (page - 1) * limit
        try {
            const total = await Engineer.getCountAll()
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Engineer.all(offset, limit, sort, sortBy, search)
            response.json({
                data,
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            })
        }
        catch (error) {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    },
    storeData: async (request, response) => {
        const data = {
            description: request.body.description,
            skill: request.body.skill,
            location: request.body.location,
            birthdate: request.body.birthdate,
            showcase: request.body.showcase,
            telephone: request.body.telephone,
            salary: request.body.salary,
            avatar: request.file.originalname,
            user_id: request.body.user_id
        }
        try {
            await Engineer.store(data)
            response.json(data)
        } catch (error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    updateData: async (request, response, next) => {

        if(request.file.size >= 5242880)
        {
            const msg = 'Oops!, Size cannot more than 5MB'
            next(msg)
            fs.unlink(`public/images/engineer/${request.file.originalname}`, function(err) {
                if (err) throw err
                console.log('File deleted !')
            })
        }

        const file = request.file.originalname
        const extension = file.split('.')
        const filename = extension[extension.length - 1]

        if(!isImage(filename)) {
            const msg = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
            next(msg)
            fs.unlink(`public/images/engineer/${request.file.originalname}`, function(err) {
                if (err) throw err
                console.log('File deleted !')
            })
        }

        function isImage(filename) {
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

        const data =
        {
            description: request.body.description,
            skill: request.body.skill,
            location: request.body.location,
            birthdate: request.body.birthdate,
            showcase: request.body.showcase,
            telephone: request.body.telephone,
            salary: request.body.salary,
            avatar: request.file.originalname,
            user_id: request.body.user_id
        }
        try {
            await Engineer.update(data, request.params.id)
            await Engineer.updateNameUser(request.body.name, request.body.user_id)
            response.json(data)
        } catch (error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }

    },
    editData: async (request, response) => {
        try {
            const data = await Engineer.edit(request.params.id)
            response.json(data)
        } catch(error) {
            console.error(error.message)
            response.status(500).json('Server Error')
        }
    },
    profileEngineerData: async (request, response) => {
        try {
            const data = await Engineer.getCurrentProfileEngineer(request.params.id)
            response.json(data)
        } catch(error) {
            console.error(error.message)
            response.status(500).json('Server Error')
        }
    },
    deleteData: async (request, response) => {
        try {
            await Engineer.delete(request.params.id)
        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    }
}
