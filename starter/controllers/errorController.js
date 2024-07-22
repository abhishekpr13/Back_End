const sendErrorDev = (err, res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) =>{

    // Operational error ,trusted error: send message to client
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        }); 
    // Programming or oter unknow error: don't leak erro details 
    } else{
        // 1) log erro 
        console.error('Error',err);
        //2) send message 
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong!'
        })

    }

};




module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production'){
        sendErrorProd(err,res)
    }

    
};