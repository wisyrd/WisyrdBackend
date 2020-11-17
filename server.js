const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs")
const seedDB = require("./scripts/seedDB")




const PORT = process.env.PORT || 8080;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("../WisyrdBackend/routes/api")(app);


app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wisyrddb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!')
    seedDB(true);
})



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });