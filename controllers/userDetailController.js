const user = require('../models/userModel');
const order = require('../models/OrderModel');
const orderitem = require('../models/OrderItemsModel');
const review = require('../models/ReviewsModel');
const contact = require('../models/ContactModel');;
const cart = require('../models/CartModel');
const cartitem = require('../models/CartItemsModel');

const allusercompletedetail = async (req, res) => {
  try {
    const userid = req.user._id;
    const validuserdata = await user.findById(userid);
    const isadmin = await validuserdata.usertype;
    if (isadmin === 'admin') {
      // Find all users
      const allUsers = await user.find();

      // Array to hold details of all users
      const allUserDetails = [];

      // Loop through each user and gather their details
      for (let userIndex = 0; userIndex < allUsers.length; userIndex++) {
        const validuser = allUsers[userIndex];
        const userid = validuser._id;

        const orderdata = await order.find({ userid: userid }).populate('addressid');
        const ordernumber = orderdata.length;

        const userorderdata = [];

        for (let i = 0; i < ordernumber; i++) {
          const order = orderdata[i];
          const orderid = order._id;

          const userorderitemsdata = await orderitem.find({ orderid: orderid }).populate('orderid').populate('productvarientid')
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

        const reviewdata = await review.find({ userid: userid }).populate('productid');
        const contactdata = await contact.find({ userid: userid });
        const cartid = await cart.findOne({ userid: userid });
        const cartdata = await cartitem.find({ cartid: cartid }).populate('productvarientid');

        allUserDetails.push({
          user_detail: validuser,
          all_order_detail: userorderdata,
          review_detail: reviewdata,
          contact_data: contactdata,
          cart_detail: cartdata
        });
      }

      res.status(200).send({ success: true, data: allUserDetails });

    }
    else {
      res.status(200).send({ success: true, msg: 'you are not admin' });
    }

  } catch (error) {

    res.status(400).send({ success: false, msg: error.message });

  }
}



const usercompletedetailbytoken = async (req, res) => {
  try {
    const userid = req.user._id;
    const validuser = await user.findById(userid);
    if (validuser) {
      const orderdata = await order.find({ userid: userid }).populate('addressid');
      // const orderid = orderdata._id;
      const ordernumber = orderdata.length;

      const userorderdata = [];

      for (let i = 0; i < ordernumber; i++) {
        const order = orderdata[i];
        const orderid = order._id;


        const userorderitemsdata = await orderitem.find({ orderid: orderid }).populate('orderid').populate('productvarientid')
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



      const reviewdata = await review.find({ userid: userid }).populate('productid');

      const contactdata = await contact.find({ userid: userid });

      const cartid = await cart.findOne({ userid: userid });
      const cartdata = await cartitem.find({ cartid: cartid }).populate('productvarientid');



      res.status(200).send({ success: true, user_detail: validuser, all_order_detail: userorderdata, review_detail: reviewdata, contact_data: contactdata, cart_detail: cartdata });
    }
    else {
      res.status(200).send({ success: true, msg: 'invalid user id' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}



// const getuseridbytoken = async (req, res) => {
//   try {
//     const userid = req.user._id;
//     const userdata = await user.findById(userid);

//     const useralldetail = {
//       id: userid,
//       firstname: userdata.firstname,
//       lastname: userdata.lastname,
//       phone: userdata.phone,
//       email: userdata.email,
//       usertype: userdata.usertype
//     }

//     res.status(200).send({ success: true, userid: userid, userdetail: useralldetail });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// }



module.exports = {
  allusercompletedetail,
  usercompletedetailbytoken,
  // getuseridbytoken
}