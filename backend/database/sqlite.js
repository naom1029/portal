const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname, '../data');
const dbPath = path.join(dbDir, 'database.sqlite');

// データベースディレクトリが存在しない場合は作成
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('データベースの接続に失敗しました:', err.message);
    } else {
        console.log('データベースに接続しました:', dbPath);
        // ユーザーテーブルの作成
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT UNIQUE,
      isAdmin BOOLEAN DEFAULT FALSE
    )`);

        // ショートカットアイテムテーブルの作成
        db.run(`CREATE TABLE IF NOT EXISTS shortcuts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT,
            url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);
    }
});

module.exports = db;