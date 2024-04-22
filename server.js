//server
const express = require('express')
const app = express()
//configs
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./db');
const dotenv = require('dotenv');
//router
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
//swagger
const swagger = require('./swagger');

dotenv.config();
const port = process.env.PORT

swagger(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({ credentials: true, origin: true }));

app.use('/api/auth/', authRouter);
app.use('/api/users/',userRouter)

app.use(express.static('build'))

connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}`)
    );
  })
  .catch((error) => {
    console.error('Error connecting to database:', error.message);
  });
