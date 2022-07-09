const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

mongoose.connect('mongodb+srv://danishtest:nShJPXTlAoRmdZoz@cluster0.dxauk.mongodb.net/?retryWrites=true&w=majority')

app.get('/abc', (req, res) => {
    res.send('yeah it is working fine')
})

app.get('/xyz', (req, res) => {
    res.send('Lets Go')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body);

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            country: req.body.country
        })

        res.json({
            status: 'ok',
            msg: 'Data has been Saved'
        });

        // res.send(user)
    } catch (error) {
        console.log(error)
        res.json({
            status: 'notok',
            msg: 'Data has not been Saved'
        });
    }
});

app.post('/api/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email,
            country: user.country
        }, 'secrettop');

        return res.json({
            status: 'ok',
            userFound: true,
            user: token
        });
    }

    else {
        return res.json({
            status: 'notok',
            userFound: false
        });
    }
});

app.get('/api/getProducts', async (req, res) => {
    const products = await Product.find();

    if (products) {
        return res.json({
            status: 'ok',
            product: products
        })
    }

    else {
        return res.json({
            status: 'notok'
        })
    }
});

app.post('/api/saveProducts', async (req, res) => {

    if (req.body.price < 0) {
        res.json({
            status: 'notok',
            msg: 'Price must be greater then 0'
        });
    }

    else {
        try {
            await Product.create({
                name: req.body.name,
                model: req.body.model,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category,
            })

            res.json({
                status: 'ok',
                msg: 'Product has been Saved'
            });

        } catch (error) {
            console.log(error)
            res.json({
                status: 'notok',
                msg: 'Product has not been Saved'
            });
        }
    }
});

app.listen(5000, () => {
    console.log('Server is Running')
}).on('error', (err) => {
    console.log('Error is: ' + err)
});