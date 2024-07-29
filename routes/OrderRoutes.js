const express = require('express');
const order_routes = express();

const bodyParser = require("body-parser");
order_routes.use(bodyParser.json());
order_routes.use(bodyParser.urlencoded({ extended: true }));


const orderController = require('../controllers/OrderController');

order_routes.post('/addorder', orderController.addorder);
order_routes.post('/addorderitems', orderController.addorderitem);
order_routes.get('/getallorder', orderController.getallorder);
// order_routes.get('/getorderbyuserid/:userid', orderController.getorderbyuserid);
// order_routes.get('/getorderbyorderid/:orderid', orderController.getorderbyorderid);

module.exports = order_routes;