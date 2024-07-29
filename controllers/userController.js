const user = require("../models/userModel");

const bcryptjs = require('bcryptjs');

const config = require("../config/config");

const jwt = require("jsonwebtoken");
const path = require("path");




const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    }
    catch (error) {

        res.status(400).send(error.message);

    }
}

const register_user = async (req, res) => {


    try {

        const spassword = await securePassword(req.body.password);
        const image = req.file.filename;
        const imagePath = path.join(__dirname, '..', 'public/userImages', image);


        const users = new user({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            password: spassword,
            // usertype: 'user',
            profileimage: imagePath
            // profileimage: req.file.filename

        });


        const useremail = await user.findOne({ email: req.body.email });

        const userphone = await user.findOne({ phone: req.body.phone });

        if (useremail) {

            res.status(200).send({ success: false, msg: "This email is already exist" });

        }

        else if (userphone) {
            res.status(200).send({ success: false, msg: "This phone number is already exist" });

        }

        else {
            const user_data = await users.save();
            res.status(200).send({ success: true, data: user_data });
        }

    }

    catch (error) {


        res.status(400).send(error.message);
    }
}




const create_token = async (id) => {

    try {

        // const token = jwt.sign({ id: userId, name }, SECRET_KEY, { expiresIn: '1h' });

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}



//login Method

const user_login = async (req, res) => {
    try {

        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        if (email) {
            const userData = await user.findOne({ email: email });


            if (userData) {

                // compare() is a function of bcryptjs, in that function we compare 2 values
                // first value "password" which user pass at the time of login
                // and second value "userData.password" means the original password stored in database

                const passwordmatch = await bcryptjs.compare(password, userData.password);

                if (passwordmatch) {

                    const tokenData = await create_token(userData._id);


                    const userResult = {
                        _id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                        phone: userData.phone,
                        type: userData.type,
                        token: tokenData

                    }

                    const response = {
                        success: true,
                        msg: "User Details",
                        data: userResult

                    }

                    res.status(200).send(response);

                }
                else {
                    res.status(200).send({ success: false, msg: "login details are incorrect" });
                }

            }
            else {
                res.status(200).send({ success: false, msg: "login details are incorrect" });
            }
        }


        else {
            const userData = await user.findOne({ phone: phone });

            if (userData) {

                const passwordmatch = await bcryptjs.compare(password, userData.password);

                if (passwordmatch) {

                    const tokenData = await create_token(userData._id);

                    const userResult = {
                        _id: userData._id,
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                        phone: userData.phone,
                        type: userData.type,
                        token: tokenData

                    }

                    const response = {
                        success: true,
                        msg: "User Details",
                        data: userResult

                    }

                    res.status(200).send(response);

                }
                else {
                    res.status(200).send({ success: false, msg: "login details are incorrect" });
                }

            }
            else {
                res.status(200).send({ success: false, msg: "login details are incorrect" });
            }
        }

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


// const getImagePath = (imageName) => {
//    const imagePath = path.join(__dirname, '..', 'public', 'productImages', imageName);
//     return imagePath;
//   };

const getimage = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findOne({ _id: id });
        if (data) {
            const image = data.profileimage;
            res.sendFile(image);
        }
        else {
            res.status(400).send('something went wrong');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getalluserdata = async (req, res) => {
    try {
        const userdata = await user.find();
        res.status(200).send({ success: true, data: userdata });
    } catch (error) {
        res.status(200).send({ success: true, msg: error.message });
    }
}


module.exports = {
    register_user,
    user_login,
    getimage,
    getalluserdata,

}