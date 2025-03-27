import User from "../models/User.js"

export const userProfile = async (req, res) => {
    const {id} = req.user;
    
    try {
        const response = await User.findById(id).select('-password');

        if(!response) return res.status(404).json({message : 'User not found.'})
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(`Internal server error`, err)
    }
    
}