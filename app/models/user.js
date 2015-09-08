//CALL PACKAGES
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');


// USER SCHEMA
var UserSchema   = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true }},
    email: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: false }
});


// HASH PASSWORD BEFORE USER IS SAVED
UserSchema.pre('save', function(next) {
    var user = this;



// HASH PASSWORD IF PASSWORD HAS BEEN CHANGED OR IF NEW USER
    if (!user.isModified('password')) return next();



// GENERATES THE HASH
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);



// CHANGES PASSWORD TO HASHED VERSION
        user.password = hash;
        next();
    });
});



// COMPARES GIVEN PASSWORD WITH THE DATABASE HASH
UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};




module.exports = mongoose.model('User', UserSchema);

