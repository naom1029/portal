const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log("authenticate token: ", token);
    if (!token) {
        return res.status(401).json({ error: 'トークンが見つかりません' });
    }

    try {
        // トークンを検証してデコードしたデータを取得
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: '無効なトークンです' });
    }
};

module.exports = authenticate;
