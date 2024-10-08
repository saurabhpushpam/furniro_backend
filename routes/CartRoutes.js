const express = require('express');
const cart_routes = express();

const auth = require('../middleware/auth');
const cartcontroller = require('../controllers/CartController');


const bodyParser = require("body-parser");
cart_routes.use(bodyParser.json());
cart_routes.use(bodyParser.urlencoded({ extended: true }));


cart_routes.post('/addcart', cartcontroller.addcart);
cart_routes.post('/addcartitems', auth, cartcontroller.addcartitems);
cart_routes.get('/getcartbycartid/:cartid', cartcontroller.getallcartitembycartid);
cart_routes.get('/getcartbyuserid/:userid', cartcontroller.getallcartitembyuserid);
cart_routes.get('/getdatabycartitemid/:cartitemid', cartcontroller.getcartitembycartitemid);
cart_routes.get('/getallcartitem', auth, cartcontroller.getcartitembyuserid);
cart_routes.post('/deletecartitem/:cartitemid', cartcontroller.deletecartitem);

cart_routes.post('/updatestatus', cartcontroller.cartstatus);
cart_routes.get('/getactivecartitems', cartcontroller.getactivecartitems);


module.exports = cart_routes;