const KeyPair = require('../models/KeyPair')

const getKeyPairByUser = async (request, response) => {
    //extract user from middleware
    const user = request.user
    try{
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

        const keypair = await KeyPair.findOne({ user: user._id })
        .populate('user', { username: 1 });
        if(!keypair){
            return response.status(404).json({error: 'Key pair not found'})

        }else{
            return response.status(200).json(keypair)
        }
    }catch (error) {
        return response.status(500).json({error: error.message})
    }
}

const createKeyPairByUser = async (request, response) => {
    const user = request.user;
    const { private, public } = request.body;
    try {
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      if (!private || !public) {
        return response.status(400).json({ error: 'private and public are required' });
      }
      const keypair = new KeyPair({
        private,
        public,
        user: user._id
      });
      const savedKeyPair = await keypair.save();
      user.keypair = user.keypair.concat(savedKeyPair._id); // Corrección: 'KeyPair' -> 'keypair'
      await user.save();
  
      return response.status(201).json({
        message: 'Register keys successfully'
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  };


module.exports = {
    getKeyPairByUser,
    createKeyPairByUser
}