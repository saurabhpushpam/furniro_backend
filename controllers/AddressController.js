const address = require('../models/AddressModel');
const user = require('../models/userModel');

const addaddress = async (req, res) => {
  try {

    const userid = req.user._id;
    const { firstname, lastname, companyname, streetaddress, city, province, zipcode, country, phone, email, additionalinfo } = req.body;
    const validuser = await user.findById(userid);
    if (validuser) {

      const useraddress = new address({
        userid, firstname, lastname, companyname, streetaddress, city, province, zipcode, country, phone, email, additionalinfo
      });

      const userdata = await useraddress.save();
      res.status(200).send({ success: true, data: userdata });

    }
    else {
      res.status(200).send({ success: true, msg: 'invalid userid' });
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
}


const getaddress = async (req, res) => {
  try {
    const addressid = req.params.addressid;
    const data = await address.findOne({ _id: addressid });

    if (data) {
      res.status(200).send(data);
    }

  } catch (error) {
    res.status(400).send(error.message);

  }
}



const getalladdress = async (req, res) => {
  try {
    const addressdata = await address.find();
    res.status(200).send({ successtrue, data: addressdata });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


module.exports = {
  addaddress,
  getaddress,
  getalladdress
}