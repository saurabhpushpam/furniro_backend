const reviews = require('../models/ReviewsModel');

const addreviews = async (req, res) => {
  try {
    const reviewdata = new reviews({ userid, productid, rating, comment } = req.body);

    const userreview = await reviewdata.save();
    res.status(200).send(userreview);

  } catch (error) {
    res.status(400).send(error.message);
  }

}

const getreviews = async (req, res) => {
  try {
    const reviewid = req.params.reviewid;

    const datareview = await reviews.findOne({ _id: reviewid });
    if (datareview) {
      res.status(200).send(datareview);
    }
    else {
      res.status(400).send('something went wrong');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addreviews,
  getreviews
}