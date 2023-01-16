const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    sequlizer = require('./models/index'),
    dotenv = require('dotenv').config(),
    indexRouter = require('./routes/index'),
    app = express(),
    cors = require('cors'),
    fileUpload = require('express-fileupload');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.use('/api', indexRouter);


app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../client/src')));


app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

app.get('/*', function (request, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

/**
 * Initaing the Database Connection
 */
sequlizer.sequelize.sync({ force: false }).then(() => {
    // inside our db sync callback, we start the server
    // this is our way of making sure the server is not listening 
    // to requests if we have not made a db connection
    app.listen(app.Sequlizer_port, () => {
        console.log(`server listening on PORT ${app.Sequlizer_port}`);
    });
});

module.exports = app;