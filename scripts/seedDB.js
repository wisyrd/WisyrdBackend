const mongoose = require("mongoose");
const db = require("../models");
const fs = require("fs");


function seedDb(force) {
    
db.Spell.find({},
    (error, data) => {
        if (error) throw error
        if (data && !force)
        return;

        // change to fs system parameters for the current Const
    fs.readFile("spells.json","utf-8", (err, data) => {
        if (err) throw err
        let spellSeed = JSON.parse(data)
        // console.log(spellSeed);
        db.Spell.deleteMany({}, (err, data) => {
            if (err) throw err
            console.log(data);
            db.Spell.create(spellSeed)
          });
    })

    })

}



module.exports = seedDb; 