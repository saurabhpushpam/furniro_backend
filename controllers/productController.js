const path = require("path");

const product = require('../models/productModel');
const productvarient = require('../models/ProductVarientModel');
const category = require('../models/CategoryModel');

const addproduct = async (req, res) => {
  try {

    // const categoryid = req.body.categoryid || req.headers.categoryid; for frontend integration
    const categoryid = req.body.categoryid;

    const validcategoryid = await category.findById(categoryid);

    if (validcategoryid) {

      var arrimages = [];
      for (let i = 0; i < req.files.length; i++) {

        arrimages[i] = req.files[i].filename;

      }

      const addnewproduct = new product({
        categoryid: req.body.categoryid,
        productname: req.body.productname,
        description: req.body.description,
        descriptionimage: arrimages,
      });

      const productdata = await addnewproduct.save();
      res.status(200).send({ success: true, data: productdata });

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid categoryid' });
    }

  } catch (error) {
    res.status({ success: false, msg: error.message });
  }
}


const addproductvarient = async (req, res) => {
  try {
    const productid = req.body.productid;
    const validproductid = await product.findById(productid);

    if (validproductid) {

      var arrimages = [];
      for (let i = 0; i < req.files.length; i++) {

        arrimages[i] = req.files[i].filename;

      }

      const addnewproductvarient = new productvarient({
        productid: productid,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        oldprice: req.body.oldprice,
        tags: req.body.tags,
        image: arrimages

      });

      const productvarientdata = await addnewproductvarient.save();
      res.status(200).send({ success: true, data: productvarientdata });

    }

    else {
      res.status(200).send({ success: true, msg: 'invalid product id' })
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }
}


const getproductbyproductid = async (req, res) => {
  try {
    const productid = req.params.productid;
    const validproductid = await product.findById(productid);
    if (validproductid) {
      res.status(200).send({ success: true, data: validproductid });
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid productid' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }

}


const getproductvarientbyproductid = async (req, res) => {
  try {
    const productid = req.params.productid;
    const isvalidproductid = await product.findById(productid);
    if (isvalidproductid) {
      const productvarientdata = await productvarient.findOne({ productid: productid }).populate('productid');
      if (productvarientdata) {
        res.status(200).send({ success: true, data: productvarientdata });
      }
      else {
        res.status(200).send({ success: true, msg: 'productvarient not available' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid productid' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}




const getproductvarientbyproductvarientid = async (req, res) => {
  try {
    const productvarientid = req.params.productvarientid;
    const validproductvarient = await productvarient.findById(productvarientid);
    if (validproductvarient) {
      const productid = await validproductvarient.productid;
      const productvarientdata = await validproductvarient.populate('productid');

      res.status(200).send({ success: true, data: productvarientdata });

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid product varient id' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }

}





const getproductimagebyimagename = async (req, res) => {
  try {
    const image = req.params.imagename;
    const imagedata = await product.findOne({ descriptionimage: image });

    // const imagedata = await product.findOne({ descriptionimage: { $elemMatch: { $eq: image } } });
    // const imagedata = await product.findOne({ descriptionimage: { $in: [image] } });

    if (imagedata) {

      const images = path.join(__dirname, '..', 'public/productImages', image);
      res.status(200).sendFile(images);

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid imagename' });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }

}



const getproductvarientimagebyimagename = async (req, res) => {
  try {
    const imgname = req.params.image;
    const imgdata = await productvarient.findOne({ image: imgname });
    if (imgdata) {

      const img = path.join(__dirname, '..', 'public/productImages', imgname);
      res.status(200).sendFile(img);

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid image name' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}




const get_description_image_by_productid_and_imagename = async (req, res) => {

  try {

    const productid = req.params.productid;
    const imagename = req.params.imagename;
    const productdata = await product.findOne({ _id: productid });
    if (productdata) {

      const imagedata = productdata.descriptionimage.find(img => img === imagename);

      if (imagedata) {
        const images = path.join(__dirname, '..', 'public/productImages', imagedata);

        res.status(200).sendFile(images);
      }
      else {
        res.status(200).send({ success: true, msg: 'invalid image name' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid product id' });
    }

  } catch (error) {
    res.status(400).send(error.message);
  }

}



const get_image_by_productvarientid_and_imagename = async (req, res) => {
  try {
    const productvarientid = req.params.p_varientid;
    const imagename = req.params.image;
    const productvardata = await productvarient.findOne({ _id: productvarientid });
    if (productvardata) {

      const imagedata = productvardata.image.find(img => img === imagename);

      if (imagedata) {
        const images = path.join(__dirname, '..', 'public/productImages', imagedata);

        res.status(200).sendFile(images);
      }
      else {
        res.status(200).send({ success: true, msg: 'invalid image name' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid product varient id' });
    }

  } catch (error) {
    res.status(400).send(error.message);
  }


}


const getallproduct = async (req, res) => {
  try {
    const productdata = await product.find();
    res.status(200).send({ success: true, data: productdata });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



const getallproductvarient = async (req, res) => {
  try {
    const productvarientdata = await productvarient.find().populate('productid');
    res.status(200).send({ success: true, data: productvarientdata });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



module.exports = {
  addproduct,
  addproductvarient,
  getproductbyproductid,
  getproductvarientbyproductid,
  getproductvarientbyproductvarientid,

  getproductimagebyimagename,
  getproductvarientimagebyimagename,
  get_description_image_by_productid_and_imagename,
  get_image_by_productvarientid_and_imagename,

  getallproduct,
  getallproductvarient

}