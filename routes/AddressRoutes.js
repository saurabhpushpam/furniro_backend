const express = require('express');
const addressRoutes = express();

const addressController = require('../controllers/AddressController');
const auth = require('../middleware/auth');


const bodyParser = require("body-parser");
addressRoutes.use(bodyParser.json());
addressRoutes.use(bodyParser.urlencoded({ extended: true }));

addressRoutes.post('/addaddress', addressController.addaddress);
addressRoutes.get('/getaddress/:addressid', addressController.getaddress);
addressRoutes.get('/getalladdress', addressController.getalladdress);

module.exports = addressRoutes;