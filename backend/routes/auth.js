const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/sqlite');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ユーザー登録エンドポイント
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
            [username, hashedPassword, email], function (err) {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.status(201).json({ id: this.lastID, username });
            });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ユーザーログインエンドポイント
router.post(
    '/login',
    [
        // バリデーションルール
        body('email').notEmpty().withMessage('email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        // バリデーション結果の取得
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // ユーザーをDBから取得
        db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            try {
                // パスワードの比較
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                // JWTトークンの生成
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
);

module.exports = router;
