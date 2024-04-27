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

module.exports = {
    createRegister
}