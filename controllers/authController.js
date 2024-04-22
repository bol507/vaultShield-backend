const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    const user = req.body;
    try {
      const duplicate = await User.find({usernname: user.username});
      if(duplicate && duplicate.length > 0){
        return res.status(400).json({ error: 'User already registered whith this username' });
      }
      const newUser = new User({
        username: user.username,
        email: user.email,
        passwordHash: CryptoJS.AES.encrypt(user.password, process.env.SECRET).toString()
      });
        
      const result = await newUser.save();
      console.log(result);
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '21d' }
      );
      return res.status(201).json({message:'User Registered successfully!', token });

      
    } catch (error) {
      return res.status(400).json({error: 'Error creating user' });
    }
  };

const loginUser = async (req, res) => {
    try {
      const user = await User.findOne(
        { email: req.body.email },
        {
          updatedAt: 0,
          createdAt: 0,
        }
      ); // exclude updateAt and createAt
  
      if (!user) {
        return res.status(401).json({error: 'Wrong credentials'});
      }
  
      const decryptedPassword = CryptoJS.AES.decrypt(user.passwordHash, process.env.SECRET);
      const decrypted = decryptedPassword.toString(CryptoJS.enc.Utf8);
  
      if (decrypted !== req.body.password) {
        return res.status(401).json({error: 'Wrong password'});
      }
  
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '21d' }
      );
  
      return res.status(200).json({ token });

    } catch (error) {
      const message = {
        error: error.message,
      };
  
      return res.status(400).json(message);
    }
};

module.exports = {
    createUser,
    loginUser,
}