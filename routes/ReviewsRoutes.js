const express = require('express');
const review_routes = express();

const reviewcontroller = require('../controllers/ReviewsController');

const bodyParser = require("body-parser");
review_routes.use(bodyParser.json());
review_routes.use(bodyParser.urlencoded({ extended: true }));

review_routes.post('/addreview', reviewcontroller.addreviews);

review_routes.get('/getreview/:reviewid', reviewcontroller.getreviews);

module.exports = review_routes;