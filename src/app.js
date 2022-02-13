const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expresshbs = require("express-handlebars");

const app = express();

// set habdlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', expresshbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine)
app.set('view engine', 'hbs')
// 

app.use(morgan('dev'));

//post cath from form
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/index'))

// enable return .html file
app.use(express.static(path.join(__dirname,'public')))

module.exports = app;