const mongoose = require('mongoose');
// installed via: npm install --save mongoose-unique-validator (helps checking unique entries)
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true},
  password: { type: String, require: true }
});

//need to plug in the validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
