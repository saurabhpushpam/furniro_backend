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
    const userid = req.user._id;
    const avlcart = cart.findOne({ userid: userid });
    if (avlcart) {
      const cartid = avlcart._id;
      const { productvarientid, quantity } = req.body;

      const avlproductvar = await cartitems.findOne({ productvarientid: productvarientid, orderstatus: "false" });
      if (avlproductvar) {
        const avlqty = parseInt(avlproductvar.quantity, 10);
        const newqty = parseInt(quantity, 10);
        const newquantity = avlqty + newqty;
        const cartitemsdata = await cartitems.updateOne(
          { productvarientid: productvarientid },
          { $set: { quantity: newquantity } }
        );

        res.status(200).send({ success: true, data: cartitemsdata });


      }

      else {
        const cartitemdata = new cartitems({ cartid, productvarientid, quantity });
        const usercartitem = await cartitemdata.save();
        res.status(200).send({ success: true, data: usercartitem });
      }
    }

    else {
      const usercart = new cart({
        userid
      });

      const cartdata = await usercart.save();

      const usercartitem = new cartitems({
        cartid: cartdata._id,
        productvarientid: req.body.productvarientid,
        quantity: req.body.quantity
      });

      const newusercartitem = await usercartitem.save();

      res.status(200).send({ success: true, data: newusercartitem });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



// const getallcartitembycartid = async (req, res) => {
//   try {
//     const cartid = req.params.cartid;
//     const getcart = await cart.findOne({ _id: cartid });

//     if (getcart) {
//       const getcartitem = await cartitems.find({ cartid: cartid });
//       if (getcartitem) {
//         res.status(200).send({ success: true, data: getcartitem });
//       }
//       else {
//         res.status(200).send({ success: true, data: 'cart is empty' })
//       }

//     }
//     else {
//       res.status(200).send({ success: true, data: 'invalid cartid' })
//     }

//   } catch (error) {
//     res.status(200).send({ success: false, msg: error.message })
//   }
// }




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




// getallcartitembycartid by using populate()

// The .populate('cartid') method tells Mongoose to replace the cartid field in the resulting documents with the actual documents from the Cart collection that have the corresponding _id. This provides more detailed information about the cart rather than just its ID.
// And 'cartid' is schema availble in cartModel

const getallcartitembycartid = async (req, res) => {
  try {
    const { cartid } = req.params;
    const cartdata = await cart.findById(cartid);
    if (cartdata) {

      // const cartitemsdata = await cartitems.find({ cartid }).populate('cartid').populate('productvarientid');

      const cartitemsdata = await cartitems.find({ cartid }).populate('cartid')
        .populate({
          path: 'productvarientid',
          populate: {
            path: 'productid'
          }
        });

      res.status(200).json({ success: true, data: { cartdata, cartitemsdata } });
      // res.status(200).json({ success: true, data: { cartitemsdata } });

    } else {
      res.status(404).json({ success: false, msg: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};




//getallcartbyuserid by using populate()

// const getallcartbyuserid = async (req, res) => {
//   try {
//     const { userid } = req.params;
//     const userdata = await user.findById(userid);
//     if (userdata) {
//       // const cartdata = await cart.findOne({ userid }).populate('userid');
//       const cartdata = await cart.findOne({ userid });
//       if (cartdata) {
//         const cartdataitems = await cartitems.find({ cartid: cart._id }).populate('cartid');
//         res.status(200).json({ success: true, data: { cartdata, cartdataitems } });
//       } else {
//         res.status(404).json({ success: false, msg: 'Cart not found' });
//       }
//     } else {
//       res.status(404).json({ success: false, msg: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };



const getcartitembyuserid = async (req, res) => {

  const userid = req.user._id;

  const validuser = await user.findById(userid);
  if (validuser) {
    const usercart = await cart.findOne({ userid: userid });
    if (usercart) {
      const cartid = usercart._id;
      const allcartitem = await cartitems.find({ cartid: cartid }).populate('productvarientid').populate({
        path: 'productvarientid',
        populate: {
          path: 'productid'
        }
      });
      if (allcartitem) {
        res.status(200).send({ success: true, data: allcartitem });
      }
      else {
        res.status(200).send({ success: true, msg: 'cart is empty' });
      }
    }
    else {
      res.status(200).send({ success: true, msg: 'cart not created, add any product in cart for creating cart' });
    }
  }
  else {
    res.status(200).send({ success: true, msg: 'invalid user id' });
  }
}




const deletecartitem = async (req, res) => {
  const cartitemid = req.params.cartitemid;
  const validcartitem = await cartitems.findById(cartitemid);

  if (validcartitem) {
    const deldata = await cartitems.deleteOne({ _id: cartitemid });
    // console.log(deldata);
    res.status(200).send({ success: true, msg: 'cart item removed' });
  }
  else {
    res.status(200).send({ success: true, msg: 'invalid cartitem id' });
  }

}




const getactivecartitems = async (req, res) => {
  try {
    const cartitemdata = await cartitems.find({ orderstatus: false }).populate('productvarientid').populate({
      path: 'productvarientid',
      populate: {
        path: 'productid'
      }
    });;

    res.status(200).send({ success: true, data: cartitemdata })
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });

  }
}





const cartstatus = async (req, res) => {
  try {
    // const cartitemid = req.body.cartitemid;

    const result = await cartitems.updateMany(
      { orderstatus: false }, { orderstatus: true }
    );

    if (result) {

      res.status(200).send({ success: true, msg: 'updated successfully' });
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid cartitem id' });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });

  }

}

module.exports = {
  addcart,
  addcartitems,
  getallcartitembycartid,
  getallcartitembyuserid,
  getcartitembycartitemid,
  getcartitembyuserid,
  deletecartitem,

  cartstatus,
  getactivecartitems
}