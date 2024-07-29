const express = require('express');
const contactRoutes = express();

const contactcontroller = require('../controllers/ContactController');
const auth = require('../middleware/auth');

const bodyParser = require("body-parser");
contactRoutes.use(bodyParser.json());
contactRoutes.use(bodyParser.urlencoded({ extended: true }));

contactRoutes.post('/addcontact', auth, contactcontroller.addcontact);

contactRoutes.get('/getcontactdetail/:contactid', contactcontroller.getcontactdata);

module.exports = contactRoutes