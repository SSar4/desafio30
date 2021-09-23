const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

var routes = require('./routes/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT || 3000,function () {
    console.log('ouvindo na porta 3000')
});