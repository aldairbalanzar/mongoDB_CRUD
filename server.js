require('dotenv').config();
const express = require('express');
const server = express();

const cors = require('cors');
const helmet = require('helmet');
const accessControl = require('./middleware/access_control_middleware');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(accessControl);

server.get('/', (req, res) => {
    res.status(200).json({ message: `hey! you've reached the '/' endpoint... what's up?` })
});

module.exports = server;