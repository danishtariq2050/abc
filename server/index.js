const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Product = require('./models/product.model')
const Admin = require('./models/admin.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

mongoose.connect('mongodb+srv://danishtest:nShJPXTlAoRmdZoz@cluster0.dxauk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(error => console.error(error));

app.get('/abc', (req, res) => {
    res.send('yeah it is working fine')
})

app.get('/xyz', (req, res) => {
    res.send('Lets Go')
})

app.post('/api/admin/register', async (req, res) => {
    try {
        const isAdmin = await Admin.findOne({
            isActive: true,
        });

        if (!isAdmin) {
            const encryptPassword = await bcrypt.hash(req.body.password, 10);

            await Admin.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptPassword,
                isActive: true
            })

            res.json({
                status: 'ok',
                msg: 'Admin Account Created!!!'
            });
        }
        else {
            res.json({
                status: 'notok',
                msg: 'Admin Account Already Created by other Email!!!'
            });
        }

    } catch (error) {
        res.json({
            status: 'notok',
            msg: 'Admin Account not created!!!'
        });
    }
});

app.post('/api/admin/login', async (req, res) => {

    const isAdmin = await Admin.findOne({
        email: req.body.email,
        isActive: true,
    });

    if (!isAdmin) {
        return res.json({
            status: 'notok',
            adminFound: false
        });
    }

    const comparePassword = await bcrypt.compare(req.body.password, isAdmin.password);

    if (comparePassword) {
        const token = jwt.sign({
            name: isAdmin.name,
            email: isAdmin.email,
        }, 'secrettopadmin');

        return res.json({
            status: 'ok',
            adminFound: true,
            admin: token
        });
    }

    else {
        return res.json({
            status: 'notok',
            adminFound: false
        });
    }
});

app.post('/api/register', async (req, res) => {
    console.log(req.body);

    try {
        const encryptPassword = await bcrypt.hash(req.body.pass, 10);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptPassword,
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
    });

    if (!user) {
        return res.json({
            status: 'notok',
            userFound: false
        });
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password);

    if (comparePassword) {

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

app.post('/api/getProduct', async (req, res) => {

    const productId = req.body.id;

    const product = await Product.findById(productId);

    if (product) {
        return res.json({
            status: 'ok',
            product: product
        })
    }

    else {
        return res.json({
            status: 'Product is not Available!!!'
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

app.delete('/api/deleteProduct', async (req, res) => {

    const productId = req.body.id;

    const product = await Product.findByIdAndRemove(productId);

    if (product) {
        product.remove();
        return res.json({
            status: 'Product has been Removed!!!'
        })
    }

    else {
        return res.json({
            status: 'Product is not Found!!!'
        })
    }
});

app.put('/api/updateProduct', async (req, res) => {

    const productId = req.body._id;

    const product = await Product.findByIdAndUpdate(productId, {
        name: req.body.name,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
    });

    if (product) {
        return res.json({
            status: 'Product has been Updated!!!',
            msg: 'ok',
        })
    }

    else {
        return res.json({
            status: 'Product is not Found!!!'
        })
    }
});

app.listen(5000, () => {
    console.log('Server is Running')
}).on('error', (err) => {
    console.log('Error is: ' + err)
});