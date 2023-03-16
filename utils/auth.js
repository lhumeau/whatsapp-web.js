const { Client,LocalAuth } = require('../index');
const qrcode = require('qrcode');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const http = require('http');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const path = require('path');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

/**
     * BASED ON MANY QUESTIONS
     * Actually ready mentioned on the tutorials
     *
     * Many people confused about the warning for file-upload
     * So, we just disabling the debug for simplicity.
     */
app.use(
    fileUpload({
        debug: false,
    })
);

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../'),
    });
});

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        executablePath: '/bin/chromium-browser',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
        ],
    },
    authStrategy: new LocalAuth(),
});



client.initialize();

// Socket IO
io.on('connection', function (socket) {
    socket.emit('message', 'Connecting...');

    client.on('qr', (qr) => {
        console.log(`QR RECEIVED:
        `, qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QR Code received, scan please!');
        });
    });

    client.on('ready', () => {
        socket.emit('ready', 'Whatsapp is ready!');
        socket.emit('message', 'Whatsapp is ready!');
    });

    client.on('authenticated', () => {
        socket.emit('authenticated', 'Whatsapp is authenticated!');
        socket.emit('message', 'Whatsapp is authenticated!');
        console.log('AUTHENTICATED');
    });

    client.on('auth_failure', function (session) {
        socket.emit('message', 'Auth failure, restarting...');
    });

    client.on('disconnected', (reason) => {
        socket.emit('message', 'Whatsapp is disconnected!');
        client.destroy();
        client.initialize();
    });
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

server.listen(port, function () {
    console.log('App running on *: ' + port);
});



module.exports = {
    client,
    io,
    mime,
    axios,
    fs,
    port,
    server,
    body,
    validationResult,
    qrcode,
};