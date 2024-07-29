const express = require('express');
const cart_routes = express();

const cartcontroller = require('../controllers/CartController');


const bodyParser = require("body-parser");
cart_routes.use(bodyParser.json());
cart_routes.use(bodyParser.urlencoded({ extended: true }));


cart_routes.post('/addcart', cartcontroller.addcart);
cart_routes.post('/addcartitems', cartcontroller.addcartitems);
cart_routes.get('/getcartbycartid/:cartid', cartcontroller.getallcartitembycartid);
cart_routes.get('/getcartbyuserid/:userid', cartcontroller.getallcartitembyuserid);
cart_routes.get('/getdatabycartitemid/:cartitemid', cartcontroller.getcartitembycartitemid);

module.exports = cart_routes;