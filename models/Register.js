const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const registerSchema = new mongoose.Schema({
    title: {
        type: String
    },
    login:{
        type: String
    },
    password:{
        type: String
    },
    website: {
        type: String
    },
    notes: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

registerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
    }
})

module.exports = mongoose.model('Register', registerSchema)