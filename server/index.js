const express = require('express')
const mongoose = require('mongoose')

const bodyParser =require('body-parser')
const config = require('./config/dev')
const FakeDb = require('./fake-db')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

mongoose.set('strictQuery', false);
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then(
    () => {
        if (process.env.NODE_ENV !== 'production') {
            const fakeDb = new FakeDb()
            // fakeDb.initDb()
        }
    }
)


const app = express()
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

const PORT = process.env.PORT || '3001'

app.listen(PORT, function () {
    console.log('I am running!!!')
})