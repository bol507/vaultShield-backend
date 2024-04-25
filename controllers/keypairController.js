const KeyPair = require('../models/KeyPair')

const getKeyPairByUser = async (request, response) => {
    //extract user from middleware
    const user = request.user
    try{
        const keypair = await KeyPair.findOne({ user: user.id })
        .populate('user', { username: 1 });
        if(!keypair){
            return response.status(404).json({error: 'Key pair not found'})
        }else{
            return response.stastus(200).json(keypair)
        }
    }catch (error) {
        return response.status(500).json({error: error.message})
    }
}

const createKeyPairByUser = async (request, response) => {
    const user = request.user
    console.log(user);
    const { private,public } = request.body
    try {
        
        if(!user){
           return response.stastus(404).json({error: 'User not found'})
        }
        if ( !private || !public ) {
            return response.status(404).json({error: 'private and public are required '})
        }
        const keypair = new KeyPair({
            private,
            public,
            user: user.id
        })
        const savedKeyPair = await keypair.save()
        user.keypair = user.KeyPair.concat(savedKeyPair._id)
        await user.save()
        
        return response.status(201).json({
            message: 'Register keys successfuly'
        })


    }catch(error){
        response.status(500).json({error: error.message})
    }
}


module.exports = {
    getKeyPairByUser,
    createKeyPairByUser
}