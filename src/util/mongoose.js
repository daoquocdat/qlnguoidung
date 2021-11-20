module.exports = {
    multipleMongooseToObject: function(mongooses){
        return mongooses.map(mongooses => mongooses.toObject({ getters: true }))
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject({ getters: true }) : mongoose
    }
}