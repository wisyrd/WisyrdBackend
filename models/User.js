const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const Schema = mongoose.Schema;

const userSchema = new Schema([
    {
        username: {
            type: String
        //     unique:true,
        //     index: { unique: true }
          },

        email: {
            type: String
            // required: true,
            // unique: true,
            // validate: {isEmail:true}
        },
        password: {
            type: String
            // required: true,
            // validate: {
            //     len: [8]
            // }
        },
        sheets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Sheets"
            }
        ]
         
    }
]);

userSchema.pre('save', async function save(next){
    if (!this.isModified('password')) return next();
   this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
   return next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;

