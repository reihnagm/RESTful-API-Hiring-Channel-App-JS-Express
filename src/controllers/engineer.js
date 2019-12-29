const Engineer = require('../models/Engineer')
const connection = require('../configs/db')
const { check, validationResult } = require('express-validator')
const checkext = require('../helpers/checkext')

module.exports = {
    getAllData: async (request, response) => {
        try {
            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'date_updated'

            const offset = (page - 1) * limit

            let total = await Engineer.getCountAll()

            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1

            let data = await Engineer.all(offset, limit, sort, sortBy, search)

            response.json({
                data,
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:3001${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:3001${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            })
        }
        catch (error) {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    },
    storeData: async (request, response) => {
        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }
        const data = {
            description: request.body.description,
            skill: request.body.skill,
            location: request.body.location,
            birthdate: request.body.birthdate,
            showcase: request.body.showcase,
            telephone: request.body.telephone,
            salary: request.body.salary,
            avatar: request.body.avatar,
            user_id: request.body.user_id
        }
        try {
            const result = await Engineer.store(data)
            response.json(result)
        } catch (error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    updateData: async (request, response) => {
        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
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
            avatar: request.body.avatar,
            user_id: request.body.user_id
        }
        try {
            const result = await Engineer.update(data, request.params.id)
            response.json(result)
        } catch (error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    editData: async (request, response) => {
        try {
            const data = await Engineer.edit(request.params.id)
            response.json(data)
        }
        catch(error)
        {
            console.error(error.message)
            response.status(500).json('Server Error')
        }
    },
    deleteData: async (request, response) => {
        try {
            await Engineer.delete(request.params.id)
        }
        catch(error)
        {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    }
}
