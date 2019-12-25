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
        const { name, location, description, email, telephone } = req.body
        const logo = request.file.originalname

        const data = {
            name,
            logo,
            location,
            description,
            email,
            telephone
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
        const { name, location, description, email, telephone } = request.body
        const id = request.params.id
        const logo = request.file.originalname
        const data = {
            id,
            name,
            logo,
            location,
            description,
            email,
            telephone
        }
        try {
            await Company.update(data, id)
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
