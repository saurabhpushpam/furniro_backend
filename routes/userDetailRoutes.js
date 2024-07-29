const express = require('express');
const completedetail_routes = express();

const userdetailController = require('../controllers/userDetailController');
const auth = require('../middleware/auth');

const bodyParser = require("body-parser");
completedetail_routes.use(bodyParser.json());
completedetail_routes.use(bodyParser.urlencoded({ extended: true }));


completedetail_routes.get('/alluserdetail', auth, userdetailController.allusercompletedetail);
completedetail_routes.get('/userdetailbyuserid', auth, userdetailController.usercompletedetailbytoken);
// completedetail_routes.get('/getuseridbytoken', auth, userdetailController.getuseridbytoken);

module.exports = completedetail_routes;