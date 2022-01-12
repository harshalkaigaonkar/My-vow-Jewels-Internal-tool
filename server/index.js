const express = require('express');
const cors = require('cors');
const products = require('./routes/products');
const categories = require('./routes/categories');
const connectDB = require('./database/connection/connectDB');

// database connection
connectDB();
// app intialised
const app = express();
// middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// Welcome Endpoint
app.get('/', (req, res) => {
 res.send('<h1>Welcome to the my Vow Jewels Server</h1>');
});

// app routes
app.use('/products', products);
app.use('/categories', categories);

// port listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server on Port ${PORT}`);
})
