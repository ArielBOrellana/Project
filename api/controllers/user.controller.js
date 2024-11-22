import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json ({
        message: 'API route is working!',
    });
};

{/* Deletes user in database */}
export const deleteUser = async (req, res, next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401, 'Can not delete this account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}

{/* Gets the listings of the user */}
export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id){
        try {
            const listings = await Listing.find({ userRef: req.params.id }); //Using the Listing model to get info
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }

    } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
};

{/* Function to get the user */}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return next(errorHandler(404, 'User not found!'));

        const { password: pass, ...rest } = user._doc; //Separating the password from the rest

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}