const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail
    auth: {
        user: process.env.EMAIL_USER, // e-mail do remetente
        pass: process.env.EMAIL_PASS  // senha do remetente
    }
});

exports.sendAccessCode = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Seu Código de Acesso',
        text: `Seu código de acesso é: ${code}. Ele expira em 5 minutos.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};
