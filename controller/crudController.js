const { User } = require("../models");
const express = require("express");
const app = express();
app.use(express.json());


const createUser= async (req, res) => {
  const { name, role, email } = req.body;

  try {
    const user = await User.create({
      name,
      role,
      email,
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const getUser= async (req, res) => {
  try {
    const user = await User.findAll();

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });

    if(!user){
        return res.json("User Not Found");
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const deleteUser= async (req, res) => {
    const id=req.params.id;
  try{
      const user = await User.findOne({ where: { id } });
      if(!user){
        return res.json("User Not Found");
      }
       await user.destroy();
      return res.json("User Deleted Successfully")
  }catch(err){
      return res.status(500).json(err)
  }
}

const updateUser= async (req, res) => {
    const{name,role,email}=req.body;
    const id=req.params.id;
    try{
        const user = await User.findOne({where:{ id }});
        if(!user){
            return res.json("User Not Found");
          }
        user.name=name;
        user.email=email;
        user.role=role;
        user.save();
        return res.json(user).json("User Updated")
    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  deleteUser,
  updateUser,
};
