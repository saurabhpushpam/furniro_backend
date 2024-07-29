const cart = require('../models/CartModel');
const cartitems = require('../models/CartItemsModel');
const user = require('../models/userModel');



const addcart = async (req, res) => {
  try {
    const userid = req.body.userid;
    const validuser = await user.findOne({ _id: userid });
    if (validuser) {
      const getuser = await cart.findOne({ userid: userid });
      if (!getuser) {
        const cartdata = new cart({ userid });

        const usercart = await cartdata.save();
        res.status(200).send({ success: true, data: usercart });
      }

      else {
        res.status(200).send({ success: true, msg: 'user already exist' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid userid' });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



const addcartitems = async (req, res) => {
  try {
    const cartitemdata = new cartitems({ cartid, productid, quantity } = req.body);

    const usercartitem = await cartitemdata.save();
    res.status(200).send({ success: true, data: usercartitem });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



const getallcartitembycartid = async (req, res) => {
  try {
    const cartid = req.params.cartid;
    const getcart = await cart.findOne({ _id: cartid });

    if (getcart) {
      const getcartitem = await cartitems.find({ cartid: cartid });
      if (getcartitem) {
        res.status(200).send({ success: true, data: getcartitem });
      }
      else {
        res.status(200).send({ success: true, data: 'cart is empty' })
      }

    }
    else {
      res.status(200).send({ success: true, data: 'invalid cartid' })
    }

  } catch (error) {
    res.status(200).send({ success: false, msg: error.message })
  }
}




const getallcartitembyuserid = async (req, res) => {
  try {
    const userid = req.params.userid;
    const getuser = await user.findById(userid);

    if (getuser) {
      const getusercart = await cart.findOne({ userid: userid });
      if (getusercart) {
        const usercartid = getusercart._id;
        const getusercartitems = await cartitems.find({ cartid: usercartid });

        if (getusercartitems) {
          res.status(200).send({ success: true, data: getusercartitems });
        }

        else {
          res.status(200).send({ success: true, data: 'cart items not found' });
        }

      }
      else {
        res.status(200).send({ success: true, data: 'cart not found' });
      }
    }
    else {
      res.status(200).send({ success: true, data: 'invalid userid' })
    }

  } catch (error) {
    res.status(200).send({ success: false, msg: error.message })
  }
}


const getcartitembycartitemid = async (req, res) => {
  try {
    const cartitemid = req.params.cartitemid;

    const cartitemdata = await cartitems.findById(cartitemid);
    if (cartitemdata) {
      res.status(200).send({ success: true, data: cartitemdata });
    }
    else {
      res.status(200).send({ success: true, data: "invalid cartitem id " });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message })
  }

}

module.exports = {
  addcart,
  addcartitems,
  getallcartitembycartid,
  getallcartitembyuserid,
  getcartitembycartitemid
}