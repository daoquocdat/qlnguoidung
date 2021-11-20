const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    emoji: {
        type: String,
    }
})
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return true
        }
        return false
    }
    return false
}

module.exports = mongoose.model('user', userSchema)