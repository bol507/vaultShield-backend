const Register = require('../models/Register')

const createRegister = async (request, response) => {
    const user = request.user;
    const { title, login, password, website, notes } = request.body
    try{
        if(!user){
            return response.status(404).json({error: 'User not found'})
        }
        const register = new Register({
            title,
            login,
            password,
            website,
            notes,
            user: user._id
        })

        const savedRegister = await register.save()
        user.register = user.register.concat(savedRegister._id)
        await user.save();

        return response.status(201).json({message: 'Register successfully'})

    }catch(error){
        return response.status(500).json({error: error.message})
    }
}

const getRegisters = async (request,response) => {
    const user = request.user;
    try{
        if(!user){
            return response.status(404).json({error: 'User not found'})
        }
        const registers = await Register.find({ user: user._id });
        if (!registers){
            return response.status(404).json({error: 'Registers not found'})
        }
        return response.status(200).json({ registers });
        


    }catch(error){
        return response.status(500).json({error: error.message})
    }
}

module.exports = {
    createRegister,
    getRegisters
}