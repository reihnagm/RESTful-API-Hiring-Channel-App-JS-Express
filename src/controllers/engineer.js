const Engineer = require('../models/Engineer');
const fs = require('fs-extra');
const redis = require('../configs/redis');
const misc = require('../helpers/response');
module.exports = {
    getAll: async (request, response) => {
        const page = parseInt(request.query.page) || 1;
        const search = request.query.search || '';
        const limit = request.query.limit || 5;
        const sort = request.query.sort || 'DESC';
        const sortBy = request.query.sortBy || 'date_updated';
        const offset = (page - 1) * limit;
        try {
            const total = await Engineer.getTotal();
            const resultTotal =  Math.ceil(total[0].total);
            const lastPage = Math.ceil(resultTotal / limit);
            const prevPage = page === 1 ? 1 : page - 1;
            const nextPage = page === lastPage ? 1 : page + 1;
            const data = await Engineer.getAll(offset, limit, sort, sortBy, search);
            const pageDetail = {
                total: resultTotal,
                per_page: limit,
                next_page: nextPage,
                prev_page: prevPage,
                current_page: page,
                next_url: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prev_url: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            }
            redis.get(`page-${page}-sort-${sort}-sortBy-${sortBy}-limit-${limit}-search-${search}`, (errorRedis, resultRedis) => {
                if(resultRedis) {
                    misc.responsePagination(response, 200, false, 'Succesfull get all data with redis.', pageDetail, JSON.parse(resultRedis));
                } else {
                    redis.setex(`page-${page}-sort-${sort}-sortBy-${sortBy}-limit-${limit}-search-${search}`, 3600, JSON.stringify(data));
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
                    fs.unlink(`public/images/engineer/${filename}`);
                    throw new Error('Oops!, Size cannot more than 5MB.');
                }
                if(!isImage(extension)) {
                    error = true;
                    fs.unlink(`public/images/engineer/${filename}`);
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
                description: request.body.description,
                skill: request.body.skill,
                location: request.body.location,
                birthdate: request.body.birthdate,
                showcase: request.body.showcase,
                telephone: request.body.telephone,
                salary: request.body.salary,
                avatar: request.file ? request.file.originalname : request.body.avatar,
                user_id: request.body.user_id
            }
            if(error === false) {
                await Engineer.store(data);
                misc.response(response, 200, false, 'Succesfull create data.', data);
                redis.flushall();
            }
        } catch (error) {
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
                    fs.unlink(`public/images/engineer/${filename}`);
                    throw new Error('Oops!, Size cannot more than 5MB.');
                }
                if(!isImage(extension)) {
                    error = true;
                    fs.unlink(`public/images/engineer/${filename}`);
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
            let avatar;
            if(request.file) {
                avatar = request.file.originalname;
            } else {
                avatar = request.body.avatar;
            }
            const data = {
                description: request.body.description ? request.body.description : '',
                skill: request.body.skill ? request.body.skill : '',
                location: request.body.location ? request.body.location : '',
                birthdate:  request.body.birthdate ? request.body.birthdate : '',
                showcase:  request.body.showcase ? request.body.showcase : '',
                telephone: request.body.telephone ? request.body.telephone : '',
                salary: request.body.salary ? request.body.salary : '',
                avatar: avatar,
                user_id: request.body.user_id
            }
            if(error === false) {
                const engineer_id = request.params.id;
                const user_id = request.body.user_id;
                const name = request.body.name;
                const slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
                await Engineer.update(data, engineer_id);
                await Engineer.updateNameUser(name, slug, user_id);
                misc.response(response, 200, false, 'Succesfull update data.', data);
                redis.flushall();
            }
        } catch (error) {
            misc.response(response, 500, true, error.message);
        }
    },
    delete: async (request, response) => {
        const engineer_id = request.params.id;
        try {
            await Engineer.delete(engineer_id);
            misc.response(response, 200, false, 'Succesfull delete data.');
            redis.flushall();
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    },
    getProfile: async (request, response) => {
        const user_id = request.body.user_id;
        try {
            const data = await Engineer.getProfile(user_id);
            redis.get(`user_id:${user_id}`, (errorRedis, resultRedis) => {
                if(resultRedis) {
                    if(typeof user_id !== "undefined") {
                        misc.response(response, 200, false, 'Succesfull get profile with redis.', JSON.parse(resultRedis));
                    }
                } else {
                    if(typeof user_id !== "undefined") {
                        redis.setex(`user_id:${user_id}`, 3600, JSON.stringify(data[0]));
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
            const data = await Engineer.getProfileBySlug(slug);
            redis.get(`slug:${slug}`, (errorRedis, resultRedis) => {
                if(resultRedis) {
                    if(typeof slug !== "undefined") {
                        misc.response(response, 200, false, 'Succesfull get profile with redis.', JSON.parse(resultRedis));
                    }
                } else {
                    if(typeof slug !== "undefined") {
                        redis.setex(`slug:${slug}`, 3600, JSON.stringify(data[0]));
                        misc.response(response, 200, false, 'Succesfull get profile.', data[0]);
                    }
                }
            });
        } catch(error) {
            misc.response(response, 500, true, error.message);
        }
    }
}
