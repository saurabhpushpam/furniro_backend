const express = require("express");
const user_routes = express();

const auth = require("../middleware/auth");
const user_controller = require("../controllers/userController");

const bodyParser = require("body-parser");
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({ extended: true }));




const multer = require('multer');
const path = require('path');

user_routes.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/userImages'), function (error, success) {
      if (error) throw error
    })
  },

  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error, success) {
      if (error) throw error
    });
  }

});

const upload = multer({ storage: storage });


// user_routes.post('/register', upload.array('images', 2), auth, user_controller.register_user);

user_routes.post('/register', upload.single('profileimage'), user_controller.register_user);
user_routes.get('/profileimg/:id', user_controller.getimage);
user_routes.get('/getalluserdata', user_controller.getalluserdata);

user_routes.post('/login', user_controller.user_login);


module.exports = user_routes;