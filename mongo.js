require('dotenv').config();
const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const createProduct = async (req, res, next) => {
    const { name, price } = req.body;

    let newProduct = {
        name,
        price
    };

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
    } catch {
        console.log('Error in attempt to create new product.');
        return res.status(201).json({ message: 'Error in attempt to create new product.' })
    }
    client.close();
    console.log('New product created!');
    res.status(201).json({ message: 'New product created!', newProduct: newProduct });
};

const getProducts = async (req, res, next) => {
    let products;
    
    try {
        await client.connect();
        products = await client.db().collection('products').find().toArray();
    } catch {
        console.log('Error in attempt to retrieve products.')
        return res.status(500).json({ message: 'Error in attempt to retrieve products.' })
    }
    client.close();
    console.log('fetched products!');
    res.status(200).json({ message: 'Successfuly retrieved products!', products:  products });
};

module.exports = {
    createProduct,
    getProducts
};

router.post('/test', createProduct);

router.get('/test', getProducts)

router.get('/', async (req, res) => {
    try {
        await client.connect();
        console.log('connected to DB!')
        res.status(200).json({ message: 'connected to DB!' });
    } catch (err) {
        console.log('could not connect to DB...');
        res.status(500).json({ message: 'error in connecting to mongoDB...', error: err });
    }
});



module.exports = router;