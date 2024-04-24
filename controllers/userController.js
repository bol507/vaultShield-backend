const User = require('../models/User')

const getUser = async (request,response) => {
    //extract user from middleware 
    const user = request.user
    try{
        
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
          }
        return response.status(200).json(user)
    }
    catch(error){
       return response.status(500).json({error:'Error retrieving user'})
    }
}

const updateUser = async (request,response) => {
    const userId = request.user._id
    try {
        await User.findByIdAndUpdate(userId,{
            $set: request.body

        },{new: true});
        response.status(201),json({status:true, message:"user updated succesfully"})
    }catch(error){
        response.status(500).json({message:'error retrieving user', error: error.message})
    }
}

const deleteUser = async (request,response) => {
    const userId = request.user._id
    try{
        await User.findByIdAndDelete(userId)
        response.status(200).json({status:true,message:'User deleted successfully'})
    }catch(error){
        response.status(500).json({message:'error deleting user'})
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser

}