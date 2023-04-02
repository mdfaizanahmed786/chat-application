require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const helmet=require('helmet');
const morgan=require('morgan');
const cors=require('cors');
const PORT=8006 || process.env.PORT
const app=express();
const mongoose=require('mongoose');
const Channel = require('./src/v1/models/Channel');

// defining all middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));



//defining all routes
app.use('/api/v1',require('./src/v1/routes/channelRoutes'));
app.use('/api/v1',require('./src/v1/routes/userRoutes'));
app.use('/api/v1',require('./src/v1/routes/sendMessage'));




	// Connection to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
