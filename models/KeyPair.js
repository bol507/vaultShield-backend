const mongoose =  require('mongoose')

const keypairSchema = new mongoose.Schema({
    private: {
        type:String
    },
    public: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:false});

keypairSchema.set('toJSON',{
    transform: (document, returnObject) =>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

const KeyPair = mongoose.model('KeyPair', keypairSchema)

module.exports = KeyPair
















