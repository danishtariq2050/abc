const express = require('express')
const app = express()

app.get('/abc', (req, res) => {
    res.send('yeah it is working fine')
})

app.get('/xyz', (req, res) => {
    res.send('Lets Go')
})

app.listen(5000, () => {
    console.log('Server is Running')
}).on('error', (err) => {
    console.log('Error is: ' + err)
});