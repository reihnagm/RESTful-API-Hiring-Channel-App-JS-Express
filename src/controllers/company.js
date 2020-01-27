const Company = require('../models/Company');
const fs = require('fs-extra');
const redis = require('../configs/redis');
const misc = require('../helpers/response');
module.exports = {
    getAll: async (request, response) => {
        const page = parseInt(request.query.page) || 1;
        const search = request.query.search || '';
        const limit = request.query.limit || 10;
        const sort = request.query.sort || 'DESC';
        const sortBy = request.query.sortBy || 'date_updated';
        const offset = (page - 1) * limit;
        try {
            const total = await Company.getTotal();
            const resultTotal =  Math.ceil(total[0].total);
            const lastPage =  Math.ceil(resultTotal / limit);
            const prevPage = page === 1 ? 1 : page - 1;
            const nextPage = page === lastPage ? 1 : page + 1;
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
            await redis.get(`companies-${page}-${search}-${limit}-${sort}-${sortBy}`, (errorRedis, resultRedis) => {
                if(resultRedis) {
                    misc.responsePagination(response, 200, false, 'Succesfull get all data with redis.', pageDetail, JSON.parse(resultRedis));
                } else {
                    if(data.length !== null || typeof data !== "undefined") {
                        redis.setex(`companies-${page}-${search}-${limit}-${sort}-${sortBy}`, 3600, JSON.stringify(data));
                    }
                    misc.responsePagination(response, 200, false, 'Succesfull get all data.', pageDetail, data);
                }
            });
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    store: async (request, response) => {
        let error = false;
        let filename;
        let extension;
        let fileSize;
        if(request.file) {
            filename = request.file.originalname;
            extension =  request.file.originalname.split('.')[1];
            fileSize = request.file.fileSize;
        }
        try {
            if(request.file) {
                if(fileSize >= 5242880) {
                    error = true;
                    fs.unlink(`public/images/company/${filename}`);
                    throw new Error('Oops!, Size cannot more than 5MB.');
                }
                if(!isImage(extension)) {
                    error = true;
                    fs.unlink(`public/images/company/${filename}`);
                    throw new Error('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG.');
                }
                function isImage(extension) {
                    switch (extension) {
                            case 'jpg':
                            case 'jpeg':
                            case 'png':
                            case 'gif':
                            case 'svg':
                                return true;
                            }
                            return false;
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
            await Company.store(data);
            misc.response(response, 200, false, 'Succesfull create data.', data);
            redis.flushall();
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    update: async (request, response) => {
        let error = false;
        let filename;
        let extension;
        let fileSize;
        if(request.file) {
            filename = request.file.originalname;
            extension =  request.file.originalname.split('.')[1];
            fileSize = request.file.fileSize;
        }
        try {
            if(request.file) {
                if(fileSize >= 5242880) {
                    error = true;
                    fs.unlink(`public/images/company/${filename}`);
                    throw new Error('Oops!, Size cannot more than 5MB.');
                }
                if(!isImage(extension)) {
                    error = true;
                    fs.unlink(`public/images/company/${filename}`);
                    throw new Error('Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG.');
                }
                function isImage(extension) {
                switch (extension) {
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'gif':
                    case 'svg':
                        return true;
                    }
                    return false;
                }
            }
            let logo;
            if(request.file) {
                logo = request.file.originalname;
            } else {
                logo = request.body.logo;
            }
            const data = {
                name: request.body.name,
                location: request.body.location,
                description: request.body.description,
                email: request.body.email,
                telephone: request.body.telephone,
                logo: logo,
                user_id: request.body.user_id
            }
            if(error === false) {
                const company_id = request.params.id;
                await Company.update(data, company_id);
                misc.response(response, 200, false, 'Succesfull update data.', data);
                redis.flushall();
            }
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    edit: async (request, response) => {
        try {
            const company_id = request.params.id;
            const data = await Company.edit(company_id);
            misc.response(response, 200, false, 'Succesfull edit data.', data);
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    delete: async (request, response) => {
        try {
            const company_id = request.params.id;
            await Company.delete(company_id);
            misc.response(response, 200, false, 'Succesfull delete data.');
            redis.flushall();
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    getProfile: async (request, response) => {
        const user_id = request.body.user_id;
        try {
            const data = await Company.getProfile(user_id);
            await redis.get(`user_id:${user_id}`, (errorRedis, resultRedis) => {
                if(user_id) {
                    if(resultRedis) {
                        misc.response(response, 200, false, 'Succesfull get profile with redis.', JSON.parse(resultRedis));
                    } else {
                        if(typeof data[0] !== "undefined") {
                            redis.setex(`user_id:${user_id}`, 3600, JSON.stringify(data[0]));
                        }
                        misc.response(response, 200, false, 'Succesfull get profile.', data[0]);
                    }
                }
            });
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    getProfileBySlug: async (request, response) => {
        const slug = request.params.slug;
        try {
            const data = await Company.getProfileBySlug(slug);
            await redis.get(`slug:${slug}`, (errorRedis, resultRedis) => {
                if(slug) {
                    if(resultRedis) {
                        misc.response(response, 200, false, 'Succesfull get profile by slug with redis.', JSON.parse(resultRedis));
                    } else {
                        if(typeof data[0] !== "undefined") {
                            redis.setex(`slug:${slug}`, 3600, JSON.stringify(data[0]));
                        }
                        misc.response(response, 200, false, 'Succesfull get profile by slug.', data[0]);
                    }
                }
            });
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    }
}
