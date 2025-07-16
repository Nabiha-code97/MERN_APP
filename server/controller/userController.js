//it is basically used for handling request processing data and also generating the response 
import User from "../model/userModel.js";

export const create = async(req, res)=>{
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User already exists!"});
        }
        const saveData = await newUser.save();
        // res.status(200).json(saveData);
        res.status(200).json({message: "User added successfully!"});
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const getAllUsers = async(req, res)=>{
    try {
       const allUsers = await User.find();
       if(!allUsers || allUsers.length === 0){
        return res.status(404).json({message: 'user data not found!'});
       } 
       res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const getUserById = async(req, res)=>{
    try {
        const id = req.params.id;
       const userId = await User.findById(id);
       if(!userId){
        return res.status(404).json({message: 'user data not found!'});
       } 
       res.status(200).json(userId);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}

export const updateUser = async(req, res)=>{
    try {
        const id = req.params.id;
       const userId = await User.findById(id);
       if(!userId){
        return res.status(404).json({message: 'user data not found!'});
       } 
       const updatedUser = await User.findOneAndUpdate({_id: id}, req.body, {
        new:true
       });
    //    res.status(200).json(updatedUser);
       res.status(200).json({message: "User updated successfully!"});
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}
export const deleteUser = async(req, res)=>{
    try {
        const id = req.params.id;
       const userId = await User.findById(id);
       if(!userId){
        return res.status(404).json({message: 'user data not found!'});
       } 
       await User.findByIdAndDelete(id);
       res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}
 