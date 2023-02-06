
const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    indexRouter = require('./routes/index'),
    app = express(),
    cors = require('cors'),
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

/**
 * Initaing the Database Connection
 */
// sequlizer.sequelize.sync({ force: false }).then(() => {
//     // inside our db sync callback, we start the server
//     // this is our way of making sure the server is not listening 
//     // to requests if we have not made a db connection
//     app.listen(app.serverPort, () => {
//         console.log(`server listening on PORT ${app.serverPort}`);
//     });
// });

module.exports = app;