const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const http = require('http');

app.use(express.json());

const mongoose = require('mongoose');

const DB = "mongodb+srv://spuspam111:Sp123456@cluster0.0taaaup.mongodb.net/furniro?retryWrites=true&w=majority";
mongoose.connect(DB)
    .then(() => {
        console.log("Connected to MongoDB");
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on :${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });


// const conn = mongoose.connect("mongodb://127.0.0.1:27017/furniro").then(() => {
//     console.log('MongoDB Connected');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });


// user routes

const user_route = require("./routes/userRoutes");
app.use('/api', user_route);

// address routes

const address_routes = require("./routes/AddressRoutes");
app.use('/api', address_routes);


//contact routes

const contact_routes = require("./routes/ContactRoutes");
app.use('/api', contact_routes);

// reviews routes

const reviews_route = require("./routes/ReviewsRoutes");
app.use('/api', reviews_route);


// category routes

const category_routes = require("./routes/CategoryRoutes");
app.use('/api', category_routes);



// cart routes

const cartRoutes = require("./routes/CartRoutes");
app.use('/api', cartRoutes);


// product routes

const productRoutes = require("./routes/ProductRoutes");
app.use('/api', productRoutes);


// order routes

const ordreroutes = require("./routes/OrderRoutes");
app.use('/api', ordreroutes);


// neworder routes

const newordreroutes = require("./routes/NeworderRoutes");
app.use('/api', newordreroutes);



// completeuserdetail routes

const userdetailroute = require('./routes/userDetailRoutes');
app.use('/api', userdetailroute);


const PORT = 5000;


// app.listen(PORT, function () {
//     console.log('server is running on port : ', PORT);
// });

