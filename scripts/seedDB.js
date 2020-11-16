const mongoose = require("mongoose");
const db = require("../models");


function seedDb(force) {
    
db.Spell.find({},
    (error, data) => {
        if (error) throw error
        if (data && !force)
        return;

        // change to fs system parameters for the current Const
        const spellSeed = 
  [{
    name: "fire",
    castTime: "one action",
    duration: "one minute",
    level: 1
  }]
  db.Spell.deleteMany({}, (err, data) => {
    if (err) throw err
    console.log(data);
    db.Spell.create(spellSeed)
  });
  

    })




}



module.exports = seedDb; 