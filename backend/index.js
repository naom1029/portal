const express = require('express');
const cors = require('cors');
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

app.use('/api/auth', authRoutes);
app.use('/api/shortcuts', shortcutsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});