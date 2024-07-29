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
    const allorderdata = await orderitem.find();

    res.status(200).send({ success: true, data: allorderdata });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



module.exports = {
  addorder,
  addorderitem,
  getallorder,

}

