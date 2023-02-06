
const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    dotenv = require('dotenv').config(),
    indexRouter = require('./routes/index'),
    app = express(),
    // redis = require('redis'),
    cors = require('cors'),
    responseTime = require('response-time'),
    fileUpload = require('express-fileupload'),
    session = require('express-session');
const { SESSION_SECRET } = require('./config/constants');
const { errorHandler } = require('./helpers');

// const client = redis.createClient();

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.use(responseTime());

app.set('trust proxy', 1);
app.use(session({
    // store: new redisStore({ client: client }),
    // secret: 'raa-secret~!@#$%^&*',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: true,
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10 // 10 minutes
    },
    rolling: true
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