const contact = require('../models/ContactModel');
const user = require('../models/userModel');

const addcontact = async (req, res) => {
  try {
    const userid = req.user._id;
    const { name, email, subject } = req.body;
    const validuser = await user.findOne({ _id: userid });

    if (validuser) {

      const usercontact = new contact({ userid, name, email, subject });

      const contactdata = await usercontact.save();

      res.status(200).send({ success: true, data: contactdata });
    }

    else {
      res.status(200).send({ success: false, msg: "invalid userid" });
    }


  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getcontactdata = async (req, res) => {
  const contactid = req.params.contactid;
  const getcontact = await contact.findOne({ _id: contactid });
  if (getcontact) {
    res.status(200).send(getcontact);
  }
  else {
    res.status(400).send('something went wrong');
  }
}



const getallcontactdata = async (req, res) => {
  try {
    const getcontact = await contact.find();
    if (getcontact) {
      res.status(200).send({ success: true, data: getcontact });
    }
    else {
      res.status(400).send({ success: true, msg: 'something went wrong' });
    }

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });

  }

}

module.exports = {
  addcontact,
  getcontactdata,
  getallcontactdata
}