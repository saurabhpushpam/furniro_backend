const category = require('../models/CategoryModel');

const addcategory = async (req, res) => {
    try {
        const categories = new category({
            categoryname, description
        } = req.body
        );

        const categorydata = await categories.save();
        res.status(200).send(categorydata);

    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getcategorybycategoryid = async (req, res) => {
    try {
        const categoryid = req.params.categoryid;
        const validcategoryid = await category.findById(categoryid);
        if (validcategoryid) {
            res.status(200).send({ success: true, data: validcategoryid });
        }
        else {
            res.status(200).send({ success: false, msg: 'invalid categoryid' });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


const getallcategory = async (req, res) => {
    try {
        const allcategorydata = await category.find();

        res.status(200).send({ success: true, data: allcategorydata });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addcategory,
    getcategorybycategoryid,
    getallcategory
}