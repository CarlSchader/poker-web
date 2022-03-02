const http = require('http');
const path = require('path');
const axios = require('axios');
const express = require('express');
require('dotenv').config();

process.on('SIGTERM', _ => process.exit(0));

const PORT = process.env.PORT || 80;
const API_URL = process.env.API_URL || 'http://localhost:3000';

app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'public', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/api', async (req, res) => {
    console.log(req.url, req.query)
    try {
        const apiRes = await axios.get(API_URL + '/?hand=' + req.query.hand + '&shared=' + req.query.shared + '&count=' + req.query.count);
        res.json(apiRes.data);
    } catch (error) {
        res.json(error.message);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'public', req.url));
});

http.createServer(app).listen(PORT);
console.log(`Serving on ${PORT}`);