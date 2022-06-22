const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/abc', (req, res) => {
    res.send('yeah it is working fine')
})

app.get('/xyz', (req, res) => {
    res.send('Lets Go')
})

app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({
        status: 'ok',
        msg: 'Data has been Saved'
    });
});

app.listen(5000, () => {
    console.log('Server is Running')
}).on('error', (err) => {
    console.log('Error is: ' + err)
});