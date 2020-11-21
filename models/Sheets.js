const mongoose = require("mongoose");
const { ObjectId } = require("mongojs");



const Schema = mongoose.Schema;

const sheetsSchema = new Schema([
    {

        userid: {
            //mongo object id
            type: ObjectId
        },
        name: {
            //mongo object id
            type: String
        },
        sheetData: {
            //mongo object id
            type: {}
        }

         
    }
]);



// need a get routes for find one sheet and all sheets (user)

// post route for creating new sheets


const Sheets = mongoose.model("Sheets", sheetsSchema);

module.exports = Sheets;

