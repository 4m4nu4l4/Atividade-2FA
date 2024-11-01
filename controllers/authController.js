const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha))) return res.redirect('/error');

    user.codigo_acesso = Math.floor(100000 + Math.random() * 900000).toString();
    user.codigo_acesso_create_at = new Date();
    await user.save();
    // enviar código de acesso para e-mail do usuário
    res.redirect('/code');
};

exports.verifyCode = async (req, res) => {
    const { email, codigo } = req.body;
    const user = await User.findOne({ email });
    const now = new Date();

    if (user.codigo_acesso === codigo && now - user.codigo_acesso_create_at < 5 * 60 * 1000) { // 5 min
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/success');
    } else {
        res.redirect('/error');
    }
};
