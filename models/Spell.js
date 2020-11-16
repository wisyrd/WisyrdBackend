const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: { type: String, required: true },
  castTime: { type: String, required: true },
  duration: { type: String, required: true},
  level: { type: Number, required: true}
});

const Spell = mongoose.model("Spell", spellSchema);

module.exports = Spell;