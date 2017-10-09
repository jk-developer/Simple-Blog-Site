var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var registerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

registerSchema.plugin(passportLocalMongoose);

var User = mongoose.model("Users", registerSchema);
module.exports = User;
