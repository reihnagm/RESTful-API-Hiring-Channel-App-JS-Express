const Company = require('../models/Company')
const fs = require('fs-extra')

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
        } catch(error) {
            console.error(error.message)
            response.status(500).json('Server error')
        }
    },
    updateData: async (request, response) => {

        if(request.file.size >= 5242880)
        {
            const msg = 'Oops!, Size cannot more than 5MB'
            next(msg)
            fs.unlink(`public/images/company/${request.file.originalname}`, function(err) {
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
            fs.unlink(`public/images/company/${request.file.originalname}`, function(err) {
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

        const data = {
            name: request.body.name,
            location: request.body.location,
            description: request.body.description,
            email: request.body.email,
            telephone: request.body.telephone,
            logo: request.file.originalname,
            user_id: request.body.user_id
        }
        try {
            await Company.update(data, request.params.id)
        } catch(error) {
            console.log(error.message)
            response.status(500).json('Server error')
        }
    },
    editData: async (request, response) => {
        try {
            const data = await Company.edit(request.params.id)
            response.json(data)
        } catch(error) {
            console.error(error.message)
            response.status(500).json('Server Error')
        }
    },
    deleteData: async (request, response) => {
        try {
            await Company.delete(request.params.id)
        } catch(error) {
            console.log(error.message)
            response.status(500).json('Server error')
        }
    }
}
