const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs")
const seedDB = require("./scripts/seedDB")
const cors = require("cors")
var allRoutes = require('./controllers');
const jwt = require("jsonwebtoken")



const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(allRoutes);




app.use(cors({
    origin: process.env.FRONT_END_URL || "http://lvh.me:3000"
}))


require("./controllers/spellcontroller")(app);


app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://murmuring-falls-88355',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!')
    seedDB(true);
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });