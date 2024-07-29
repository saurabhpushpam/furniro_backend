const express = require('express');
const category_route = express();

const categorycontroller = require("../controllers/CategoryController");

const bodyParser = require("body-parser");
category_route.use(bodyParser.json());
category_route.use(bodyParser.urlencoded({ extended: true }));



category_route.post('/addcategory', categorycontroller.addcategory);
category_route.get('/getcategorydatabyid/:categoryid', categorycontroller.getcategorybycategoryid);
category_route.get('/getallcategory', categorycontroller.getallcategory);

module.exports = category_route;
