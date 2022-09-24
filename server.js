const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// add body-parser
app.use(bodyParser.json());

// add cors 
app.use(cors());

// import routes
const postRoutes = require('./routes/router');
app.use(postRoutes);

const PORT = 8080;

const DB_URL = 'mongodb+srv://sonal1:sonal123@mernapp1.dpca29d.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB_URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('DB connection error',err)
})


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
