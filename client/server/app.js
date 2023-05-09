
const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    indexRouter = require('./routes/index'),
    app = express(),
    cors = require('cors'),
    dotenv = require('dotenv'),
    fileUpload = require('express-fileupload'),
    session = require('express-session');
const { SESSION_SECRET } = require('./config/constants');
const { errorHandler } = require('./helpers');
const { v4: uuid } = require('uuid');

let client, redisStore, redis;
if (process.env.NODE_ENV === "production") {
    redis = require('redis');
    client = redis.createClient();
    redisStore = require('connect-redis')(session);
}

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
dotenv.config();

app.use(session({
    genid: () => {
        return uuid();
    },
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    ...(process.env.NODE_ENV === "production" && {
        name: '_raa',
        store: new redisStore({
            host: 'localhost',
            port: 6379,
            client: client,
            ttl: 1000 * 60 * 10
        })
    }),
}))

app.use('/api', indexRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../src')));

app.use(errorHandler)
app.get('/*', function (request, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

module.exports = app;