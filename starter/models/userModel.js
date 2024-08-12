const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please tell me your name ']
    },
    email: {
        type: String,
        required: [true,'Please provide your email ID'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,'Please provide a valid email']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user','guide','lead-guide','admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true,'Provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true,'Please provide a confirm password'],
        validate: {
            // This only works on CREATE ans Save
            validator: function(el) {
                return el == this.password;
            },
            message: "Password are not the same!!"
        }

    },
    passwordChangedAt: Date
    // Passwords are encrypted by a very popular algo called 
    // Bcrypt
});

userSchema.pre('save',async function(next) {
    //only run the function if the password was actually modified
    if (!this.isModified('password'))  return next(); 

    //Hash password at the cost of 12
    this.password = await bcrypt.hash(this.password,12);

    // Delete passwordConfirm field

    this.passwordConfirm = undefined;
    next();

});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword,userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
};



const User = mongoose.model('User',userSchema);

module.exports = User;