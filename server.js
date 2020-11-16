const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs")
const seedDB = require("./scripts/seedDB")

const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wisyrddb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!')
    seedDB();
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });