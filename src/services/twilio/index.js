const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSms = async (body) => {
    try {
        const response = await client.messages
            .create({
                body: body.message,
                from: process.env.TWILIO_SOURCE_NUMBER,
                to: body.to
            });
            return {
                code: 200,
                isSent: true,
            }
    } catch (error) {
        return {
            code: 500,
            isSent: false,
        }
    }

};

module.exports = sendSms