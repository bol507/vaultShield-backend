const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createUser = async (request, response) => {
    const user = request.body;
    try {
      const duplicate = await User.find({username: user.username});
      if(duplicate && duplicate.length > 0){
        return response.status(400).json({ error: 'User already registered whith this username' });
      }
      const newUser = new User({
        username: user.username,
        email: user.email,
        passwordHash: user.password
      });
        
      const result = await newUser.save();
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '21d' }
      );
      return response.status(201).json({message:'User Registered successfully!', token });

      
    } catch (error) {
      return response.status(400).json({error: 'Error creating user' });
    }
  };

const loginUser = async (request, response) => {
    try {
      const user = await User.findOne(
        { email: request.body.email },
        {
          updatedAt: 0,
          createdAt: 0,
        }
      ); // exclude updateAt and createAt
  
      if (!user) {
        return response.status(401).json({error: 'Wrong credentials'});
      }
  
      
      if (user.passwordHash !== request.body.password) {
        return response.status(401).json({error: 'Wrong password'});
      }
  
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '21d' }
      );
  
      return response.status(200).json({ token });

    } catch (error) {
      const message = {
        error: error.message,
      };
  
      return response.status(400).json(message);
    }
};

module.exports = {
    createUser,
    loginUser,
}