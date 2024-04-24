const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    service: {
        type:String,
    },
    passwordCipherText: {
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
},{timestamps:true});


passwordSchema.set('toJSON',{

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Password = mongoose.model('Password',passwordSchema)

module.exports = Password