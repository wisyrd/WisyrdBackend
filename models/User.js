const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const Schema = mongoose.Schema;

const userSchema = new Schema([
    {
        username: {
            type: String,
            trim: true,
            required: "Username is Required"
          },

        email: {
            type: String,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        password: {
            type: String,
            trim: true,
            required: "Password is Required",
            validate: [({ length }) => length >= 8, "Password should be longer."]
        }
    }
]);

userSchema.pre('save', async function save(next){
    if (!this.isModified('password')) return next();
   this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
   return next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;

