//server
const express = require('express')
const app = express()
//configs
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')
//router
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
//swagger
const swagger = require('./swagger');
swagger(app);

const middleware = require('./utils/middleware')
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI).then(()=>{
    logger.info('connected to MongoDB')
}).catch((error)=>{

    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/auth/', authRouter);
app.use('/api/users/',userRouter)

app.use(express.static('build'))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app



