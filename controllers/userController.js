const User = require('../models/User')

const getUser = async (req,res) => {
    const userId = req.user.id
    try{
        const user = await User.findById({_id:userId}, {password:0, __v:0, createdAt:0, updatedAt:0})
        return res.status(200).json(user)
    }
    catch(error){
       return res.status(500).json({message:'Error retrieving user'})
    }
}

const updateUser = async (req,res) => {
    const userId = req.user._id
    try {
        await User.findByIdAndUpdate(userId,{
            $set: req.body

        },{new: true});
        res.status(201),json({status:true, message:"user updated succesfully"})
    }catch(error){
        res.status(500).json({message:'error retrieving user', error: error.message})
    }
}

const deleteUser = async (req,res) => {
    const userId = req.user._id
    try{
        await User.findByIdAndDelete(userId)
        res.status(200).json({status:true,message:'User deleted successfully'})
    }catch(error){
        res.status(500).json({message:'error deleting user'})
    }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser

}