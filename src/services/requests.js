const Requests = require('../models/requests');
const User = require('../models/user');
const sendEmail = require('./emailSender');
const user = require('./user');
const { request } = require('express');

const checkValues = (request) => {
    if (!request.pick_date || !request.return_date || !request.email) {
        throw new Error('Missing required fields');
    }
};

const removeOneBookAvaliable = async (book_id) => {
    const bookFound = await Books.findOne({ where: { id: book_id } });
    await bookFound.update({ avaliables: bookFound.avaliables - 1 });
};

const buildEmailInfo = (userId, book_id) => {
    return `${userId}${book_id}${Math.floor(Math.random() * 100)}`
};

const formatData = (list) => {
    list.forEach(request => {
        const pickDay = ("0" + request.pick_date.getDate()).slice(-2);
        const returnDay = ("0" + request.return_date.getDate()).slice(-2);
        const pickMonth = ("0" + request.return_date.getMonth()).slice(-2);
        const returnMonth = ("0" + request.return_date.getMonth()).slice(-2);
        const pickYear = request.return_date.getYear();
        const returnYear = request.return_date.getYear();
        request.pick_date = `${pickDay}/${pickMonth}/${pickYear}`;
        request.return_date = `${returnDay}/${returnMonth}/${returnYear}`;
    });
};
module.exports = {
    create: async (req) => {
        try {
            checkValues(req.body);
            const { pick_date, return_date, email, book_id } = req.body;
            const { userRegister } = await user.getUserByEmail(req.user.email);
            const { id } = userRegister;
            const pick_code = buildEmailInfo(id, book_id);
            const request = await Requests.create({ pick_date, return_date, email, user_id: id, status: 1, book_id, pick_code });
            await removeOneBookAvaliable(book_id);
            await sendEmail(req.user.email, 'Agendamento para empréstimo de livro', pick_code);
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
    getAllById: async (id) => {
        try {
            const requestsList = await Requests.findAll({
                where: {
                    book_id: id
                },
                include: {
                    model: User
                },
                raw: true,
            });
            formatData(requestsList)
            return {
                code: 200,
                data: requestsList
            }
        } catch (error) {
            console.log(error);
            return {
                code: 500,
                message: error.message,
            }
        }
    }
}
