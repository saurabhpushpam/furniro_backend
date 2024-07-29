const order = require('../models/OrderModel');
const orderitem = require('../models/OrderItemsModel');
const address = require('../models/AddressModel');
const user = require('../models/userModel');
const productvarient = require('../models/ProductVarientModel');

const addorder = async (req, res) => {
  try {

    // const userid = req.body._id;
    const { userid, addressid, totalamount, orderdate } = req.body;

    const validuser = await user.findById(userid);
    if (validuser) {
      const validaddress = await address.findById(addressid);

      if (validaddress) {


        const orderdata = new order({
          userid, addressid, totalamount, orderdate, orderstatus: 'active'
        });

        const userorder = await orderdata.save();

        res.status(200).send({ success: true, data: userorder });
      }
      else {
        res.status(200).send({ success: true, data: 'invalid address id' });

      }

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid user id' });

    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });

  }
}



const addorderitem = async (req, res) => {
  try {
    const { orderid, productvarientid, quantity } = req.body;

    const validorder = await order.findById(orderid);

    if (validorder) {
      const validproductvarientid = await productvarient.findById(productvarientid);

      if (validproductvarientid) {

        const orderitemdata = new orderitem({
          orderid, productvarientid, quantity
        });

        const orderdataitems = await orderitemdata.save();

        res.status(200).send({ success: true, data: orderdataitems });
      }
      else {
        res.status(200).send({ success: true, msg: 'invalid product_varient id' })
      }
    }
    else {

      res.status(200).send({ success: true, msg: 'invalid ordre id' });
    }

  } catch (error) {

    res.status(400).send({ success: false, msg: error.message });

  }

}



const getallorder = async (req, res) => {
  try {
    // const allorderdata = await orderitem.find().populate('orderid').populate('productvarientid');
    const allorderdata = await orderitem.find().populate('orderid').populate('productvarientid')
      .populate({
        path: 'orderid',
        populate: {
          path: 'userid'
        }
      })
      .populate({
        path: 'orderid',
        populate: {
          path: 'addressid'
        }
      })
      .populate({
        path: 'productvarientid',
        populate: {
          path: 'productid'
        }
      });
    res.status(200).send({ success: true, data: allorderdata });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



const getorderbyuserid = async (req, res) => {
  try {
    const userid = req.params.userid;
    const validuser = await user.findById(userid);
    if (validuser) {
      const userorder = await order.find({ userid: userid });
      if (userorder) {
        // console.log(userorder.length);
        const ordernumber = userorder.length;

        const userorderdata = [];

        for (let i = 0; i < ordernumber; i++) {
          const order = userorder[i];
          const orderid = order._id;

          const userorderitemsdata = await orderitem.find({ orderid: orderid }).populate('orderid').populate('productvarientid')
            .populate({
              path: 'orderid',
              populate: {
                path: 'userid'
              }
            })
            .populate({
              path: 'orderid',
              populate: {
                path: 'addressid'
              }
            })
            .populate({
              path: 'productvarientid',
              populate: {
                path: 'productid'
              }
            });

          userorderdata.push({
            order_id: orderid,
            items: userorderitemsdata
          });
        }

        res.status(200).send({ success: true, data: userorderdata })
      }
      else {
        res.status(200).send({ success: true, msg: 'no any order yet' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid userid' });

    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


const getorderbyorderid = async (req, res) => {
  try {
    const orderid = req.params.orderid;
    const validorderid = await order.findById(orderid);
    if (validorderid) {
      // const orderdata = await orderitem.find({ orderid: orderid });
      const orderdata = await orderitem.find({ orderid: orderid })
        .populate('orderid').populate('productvarientid')
        .populate({
          path: 'orderid',
          populate: {
            path: 'userid'
          }
        })
        .populate({
          path: 'orderid',
          populate: {
            path: 'addressid'
          }
        })
        .populate({
          path: 'productvarientid',
          populate: {
            path: 'productid'
          }
        });

      res.status(200).send({ success: true, data: orderdata });
    }
    else {

      res.status(200).send({ success: true, msg: 'invalid orderid' });

    }
  } catch (error) {

    res.status(400).send({ success: false, msg: error.message });

  }
}


module.exports = {
  addorder,
  addorderitem,
  getallorder,
  getorderbyuserid,
  getorderbyorderid

}

