const user = require('../models/userModel');
const neworder = require('../models/NeworderModel');
// const { errorMonitor } = require('nodemailer/lib/xoauth2');

const addneworder = async (req, res) => {
  try {

    const userid = req.user._id;

    const { totalamount, orderdate, productvarientid, quantity, firstname, lastname,
      companyname, streetaddress, city, province, zipcode, country, phone, email, additionalinfo, cartitemid } = req.body;

    const validuser = await user.findById(userid);
    if (validuser) {

      const userorderdata = await new neworder({
        userid, totalamount, orderdate, productvarientid, quantity, firstname, lastname,
        companyname, streetaddress, city, province, zipcode, country, phone, email, additionalinfo, cartitemid
      });

      const neworderdata = await userorderdata.save();

      res.status(200).send({ success: true, data: neworderdata });

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid userid' });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

const getallneworder = async (req, res) => {
  try {

    // const allorderdata = await neworder.find().populate('cartitemid').populate({
    //   path: 'cartitemid',
    //   populate: {
    //     path: 'productvarientid'
    //   }
    // });

    // const allorderdata = await neworder.find()
    //   .populate({
    //     path: 'cartitemid',
    //     populate: {
    //       path: 'productvarientid',
    //       populate: {
    //         path: 'productid'
    //       }
    //     }
    //   });

    const allorderdata = await neworder.find()
      .populate({
        path: 'cartitemid', // First level: Populate the cart items
        populate: {
          path: 'productvarientid', // Second level: Populate the product variants within each cart item
          populate: {
            path: 'productid' // Third level: Populate the product within each product variant
          }
        }
      });
    res.status(200).send({ success: true, data: allorderdata });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


const getneworderbyuserid = async (req, res) => {
  try {

    const userid = req.params.userid;
    const validuser = await user.findById(userid);
    if (validuser) {
      const userorderdata = await neworder.findOne({ userid: userid });
      if (userorderdata) {
        res.status(200).send({ success: true, data: userorderdata });
      }
      else {
        res.status(200).send({ success: true, data: 'no order yet' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid user id ' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

module.exports = {
  addneworder,
  getallneworder,
  getneworderbyuserid
}