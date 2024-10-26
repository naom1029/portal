const express = require('express');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const https = require('https');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const shortcutsRoutes = require('./routes/shortcuts');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/shortcuts', shortcutsRoutes);

const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure server running on ${PORT}`);
});