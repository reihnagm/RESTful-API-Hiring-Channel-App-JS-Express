const Company = require('../models/Company')

module.exports = {
    getAllData: async (request, response) => {
        try {
            const result = await Company.all()
            response.json(result)
        } catch (error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    storeData: async (request, response) => {
        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }
        const data = {
            name: request.body.name,
            location: request.body.location,
            description: request.body.description,
            email: request.body.email,
            telephone: request.body.telephone,
            logo: request.body.logo,
            user_id: request.body.user_id
        }
        try {
            await Company.store(data)
        }
        catch(error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    updateData: async (request, response) => {
        if (!validationResult(request).isEmpty()) {
            return response.status(422).json({ errors: validationResult(request).array() })
        }
        const data = {
            name: request.body.name,
            location: request.body.location,
            description: request.body.description,
            email: request.body.email,
            telephone: request.body.telephone,
            logo: request.body.logo,
            user_id: request.body.user_id
        }
        try {
            await Company.update(data, request.params.id)
        }
        catch(error)
        {
            console.log(error.message)
            response.status(500).json('Server error')
        }
    },
    editData: async (request, response) => {
        try {
            const data = await Company.edit(request.params.id)
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
            await Company.delete(request.params.id)
        }
        catch(error)
        {
            console.log(error.message)
            response.status(500).json('Server error')
        }
    }
}
