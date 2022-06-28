const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors())
app.use(express.json())

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
        return res.json({
            status: 'ok',
            userFound: true,
            user: user
        });
    }

    else {
        return res.json({
            status: 'notok',
            userFound: false
        });
    }
});

app.listen(5000, () => {
    console.log('Server is Running')
}).on('error', (err) => {
    console.log('Error is: ' + err)
});