const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minLength:[3,'Username must be at least 3 character long'],
        unique: true,
        uniqueCaseInsensitive: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash: {
        type:String,
        required:true,
        minLength:[3,'Username must be at least 3 character long']
    },
    keypair: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'KeyPair'
        
        }
    ]
    
},{timestamps:true});

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON',{

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User