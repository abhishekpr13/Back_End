const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');


exports.getAllUsers = catchAsync(async (req,res,next)=>{
    const users = await User.find();
    
    
    res.status(200).json({
        status: 'Success',
        results:users.length,
        data:{
            users
        }
    });
});

exports.createUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};


exports.updateUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};
exports.getUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};