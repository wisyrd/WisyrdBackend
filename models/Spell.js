const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spellSchema = new Schema([
    {
        name: {type: String},
        castTime: {type: String},
        duration: {type: String},
        level: {type: Number},
        range: {type: String},
        ritual: {type: Boolean},
        aoe: {type: String},
        attackType: {type: String},
        classes: 
            [
        
                {type: String}     
                
            ]
        ,
        components: {
            V: {type: Boolean},
            S: {type: Boolean},
            M: {type: Boolean},
        },
        material: {type: String},
        damage: {
            damage_type: {
                index: {type: String},
                name: {type: String},
                url: {type: String},
            }
        },
        desc: 
             {type: String}
        ,
        healAtSlotLevel: {type: Object},
        higherLevel: 
             [
                {type: String},
            ]   
    }
]);

const Spell = mongoose.model("Spell", spellSchema);

module.exports = Spell;

