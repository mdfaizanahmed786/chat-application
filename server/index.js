require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const helmet=require('helmet');
const morgan=require('morgan');
const cors=require('cors');
const PORT=8000 || process.env.PORT
const app=express();
const mongoose=require('mongoose');

// defining all middlewares
app.use(morgan());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//defining all routes
	
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
