const express = require('express')
const app = express();
const morgan = require('morgan');//package to manage login
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(//connecting to the database server
  'mongodb+srv://node-shop1:' +
   process.env.MONGO_ATLAS_PW +
    '@node-rest-shop.vm3bo.mongodb.net/<shopProduct>?retryWrites=true&w=majority',
    {
      //useMongoClient: true,//uses mongodb client under the hood
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
);

app.use(morgan('dev'));//passing every route through this
app.use(bodyParser.urlencoded({extended: false}));//have different properties which we can extract
app.use(bodyParser.json());                       //and use it to different methods

//CORS error handler
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);//middleware, any url will pass through these
app.use('/orders', orderRoutes);

//specific error handler
app.use((req, res, next)=>{//request not handled by above code goes through this
  const error = new Error('NOt Found');//creating error object
  error.status = 404;//assigning error code
  next(error);//passing the error to be handled by custom handler
});

//custom error handler for all types of error
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
