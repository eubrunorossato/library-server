const Requests = require('../models/requests');
const Books = require('../models/book');
const { connection } = require('../database/index');
const { QueryTypes } = require('sequelize');
const user = require('./user');

const checkValues = (request) => {
    if (!request.pick_date || !request.return_date || !request.celphone) {
        throw new Error('Missing required fields');
    }
};

const removeOneBookAvaliable = async (book_id) => {
    const bookFound = await Books.findOne({ where: { id: book_id } });
    await bookFound.update({ avaliables: bookFound.avaliables - 1 });
};

module.exports = {
    create: async (req) => {
        try {
            checkValues(req.body);
            const { pick_date, return_date, celphone, book_id } = req.body;
            const { userRegister } = await user.getUserByEmail(req.user.email);
            const { id } = userRegister;
            const request = await Requests.create({ pick_date, return_date, celphone, user_id: id, status: 1, book_id });
            await removeOneBookAvaliable(book_id);
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