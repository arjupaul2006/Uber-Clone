const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            required: true,
            minLength: [3, "Last name must be at least 3 characters long"],
        }
    },

    email : {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        minLength: [5, "Email must be at least 5 characters long"],
    },

    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "Password must be at least 6 characters long"],
    },

    socketId: {
        type: String,
    },
});

// this function will be called before saving the user
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

// compare the password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// hash the password
userSchema.methods.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = mongoose.model('User', userSchema);