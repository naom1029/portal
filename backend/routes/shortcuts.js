// backend/routes/shortcuts.js
const express = require('express');
const router = express.Router();
const db = require('../database/sqlite');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);

// ショートカット追加エンドポイント
router.post('/user/:user_id/add', (req, res) => {
    const user_id = req.params.user_id;
    const { title, url } = req.body;
    const query = `INSERT INTO shortcuts (user_id, title, url) VALUES (?, ?, ?)`;
    db.run(query, [user_id, title, url], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, user_id, title, url });
    });
});

// ユーザーIDに基づいてショートカットを取得するエンドポイント
router.get('/user/me/fetch', (req, res) => {
    const query = `SELECT * FROM shortcuts WHERE user_id = ?`;
    db.all(query, [req.user.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
module.exports = router;