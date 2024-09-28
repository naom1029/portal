const express = require('express');
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
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
