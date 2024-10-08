const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModel');

dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => {
    console.log('DB connection successful!');
});

//Read the json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//Import Data to DATABASE

const importData = async() =>{
    try {
        await Tour.create(tours);
        console.log('Data succesfully loaded!')
    } catch(err) {
        console.log(err)
    }
    process.exit();

};

//Delete all the data from collections 
const deleteData = async()=>{
    try{
        await Tour.deleteMany()
        console.log('Data succesfully deleted!!');
        

    } catch(err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }