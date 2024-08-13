const express = require('express');
const neworder_routes = express();

const auth = require('../middleware/auth')

const bodyParser = require("body-parser");
neworder_routes.use(bodyParser.json());
neworder_routes.use(bodyParser.urlencoded({ extended: true }));


const newordercontroller = require('../controllers/NeworderController');

neworder_routes.post('/neworder', auth, newordercontroller.addneworder);
neworder_routes.get('/getallneworder', newordercontroller.getallneworder);
neworder_routes.get('/getneworderbyuserid/:userid', newordercontroller.getneworderbyuserid);

module.exports = neworder_routes;
