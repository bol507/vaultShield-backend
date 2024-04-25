const KeyPair = require('../models/keypar')

const getKeyPairByUser = async (request, response) => {
    //extract user from middleware
    const user = request.user
    try{
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
          }
        const keypair = await KeyPair.findOne({ userId: user.id })
        .populate('user', { username: 1 });
        console.log(keypair)
        if(!keypair ){
            response.status(404).json({error: 'Key pair not found'})
        }else{
            response.status(200).json(keypair)
        }
    }catch (error) {
        response.status(500).json({error: error.message})
    }
}


module.exports = {
    getKeyPairByUser
}