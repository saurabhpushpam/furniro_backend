const express = require("express");
const product_route = express();

const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const path = require("path");

product_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'), function (err, success) {

            if (err) {
                throw err
            }

        });
    },

    filename: function (req, file, cb) {

        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error, success) {

            if (error) {
                throw error
            }

        });

    }
});

const upload = multer({ storage: storage });

const auth = require("../middleware/auth");

const productController = require("../controllers/productController");




// product_route.post('/addproduct', upload.single('images'), productController.addproduct);
product_route.post('/addproduct', upload.array('descriptionimage', 2), productController.addproduct);
product_route.post('/addproductvarient', upload.array('image', 5), productController.addproductvarient);
product_route.get('/getallproduct', productController.getallproduct);
product_route.get('/getallproductvarient', productController.getallproductvarient);

product_route.get('/getproductbyproductid/:productid', productController.getproductbyproductid);
product_route.get('/getproductvarientbyproductid/:productid', productController.getproductvarientbyproductid);
product_route.get('/getproductvarientbyproductvarientid/:productvarientid', productController.getproductvarientbyproductvarientid);

product_route.get('/getdescimage/:productid/:imagename', productController.get_description_image_by_productid_and_imagename);
product_route.get('/getimage/:p_varientid/:image', productController.get_image_by_productvarientid_and_imagename);

product_route.get('/getproductimage/:imagename', productController.getproductimagebyimagename);
product_route.get('/getproductvarientimage/:image', productController.getproductvarientimagebyimagename);

product_route.get('/getimagepath/:imagename', productController.getproductvarientimagepathbyimagename);


product_route.delete('/deleteoneproduct/:productid', productController.deleteproductbyid);

product_route.delete('/deleteoneproductvarient/:productvarientid', productController.deleteproductvarientbyid);


module.exports = product_route;