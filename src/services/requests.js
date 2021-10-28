const Requests = require('../models/requests');
const { connection } = require('../database/index');
const { QueryTypes } = require('sequelize');
const user = require('../services/user');

const checkValues = (request) => {
    if (!request.pick_date || !request.return_date || !request.celphone) {
        throw new Error('Missing required fields');
    }
};

module.exports = {
    create: async (req) => {
        try {
            checkValues(req.body);
            const { pick_date, return_date, celphone, book_id } = req.body;
            const { userRegister } = await user.getUserByEmail(req.user.email);
            const { id } = userRegister;
            const request = await Requests.create({ pick_date, return_date, celphone, user_id: id, status: 1, book_id });
            return {
                code: 200,
                data: { ...request }
            }

        } catch (error) {
            return {
                code: 500,
                message: error.message
            }
        }
    },
    getAll: async () => {
        try {
            const genres = await connection.query('select * from "genres"', {
                type: QueryTypes.SELECT
            });
            return {
                code: 200,
                genres,
            }
        } catch (error) {
            return {
                code: 500,
                message: error.message
            }
        }
    }
}