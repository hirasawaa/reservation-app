const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const FakeDb = require('./fake-db')

const productRoutes = require('./routes/products')

mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        const fakeDb = new FakeDb()
        fakeDb.initDb()
    }
)


const app = express()

app.use('/api/v1/products',productRoutes)

// app.get('/products', function (req, res) {
//     res.json({ 'success': true })
// })

const PORT = process.env.PORT || '3001'

app.listen(PORT, function () {
    console.log('I am running!!!')
})

// mongodb+srv://test:<password>@cluster0.yx5etoa.mongodb.net/?retryWrites=true&w=majority