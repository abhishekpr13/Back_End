const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

//1)Middleware 
app.use(morgan('dev'));

app.use(express.json());

app.use ((req,res,next)=>{
    console.log("APIiss running fine");
    next()
});
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})



const tours = JSON.parse( 
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handler 
const getAllTours =(req,res) =>{
    console.log(req.requestTime)
    res.status(200)
    .json({
        status: 'Success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours:tours
        }
    });

};
const getTour = (req,res)=>{
    const id = req.params.id*1
    const tour = tours.find(el =>el.id ==id)
    if (id > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid Id'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tours: tour
        }

    });
};
const createTour = (req,res) =>{
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err=>{
        res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
        });
        
    });

    
    

};
const updateTour = (req,res)=>{
    if (req.params.id*1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid request'
        });
    }
    res.status(200).json({
        status:'succes',
        data:{
            tour:'updated tour here..'
        }
    });

};
const deleteTour = (req,res)=>{
    if (req.params.id *1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid Request'
        });
    }
    res.status(200).json({
        status:'succes',
        data:{
            tour:'Deleted succesfully!'
        }
    });

};

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};

const createUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};


const updateUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};
const getUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};

const deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message: 'This route is not implemented'
    });
};

//3)Route
app
 .route('/api/v1/tours')
 .get(getAllTours)
 .post(createTour);

app 
 .route('/api/v1/tours/:id')
 .get(getTour)
 .patch(updateTour)
 .delete(deleteTour);

app
 .route('/api/v1/users')
 .get(getAllUsers)
 .post(createUsers);

app
 .route('/api/v1/users/:id')
 .get(getUser)
 .patch(updateUser)
 .delete(deleteUser);


//4)server
const port = 3000;
app.listen(port , ()=>{
    console.log(`app running on ${port}..`)
});