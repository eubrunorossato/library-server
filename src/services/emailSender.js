const nodemailer = require("nodemailer");
async function main(to, subject, pick_code) {
    try {
        const transport = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "bruno_facul@outlook.com",
                pass: "Bru274boc@"
            },
        });

        const mailOptions = {
            from: 'bruno_facul@outlook.com',
            to: to,
            subject: subject,
            html: `Parabéns você acaba de realizar o agendamento de empréstimo do seu livro. <br /> 
            Seu código de retirada é <b>${pick_code}</b>. Apresente-o ao responsável na hora de retirar seu livro.`,
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log(error);
    }
}
module.exports = main