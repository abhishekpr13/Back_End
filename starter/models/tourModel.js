const mongoose = require('mongoose');

const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'],
        unique: true,
        trim: true,
        maxLength: [40, 'A tour name must have less or equal to 40 characters'],
        minLength: [10,'A tour must have 10 or more character']
       // validate: [validator.isAlpha,'Tour nam only contain character']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true,'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true,'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true,'A tour must have a difficulty'],
        enum: {
            values:['easy','medium','difficult'],
            message: 'Difficulties is either easy,medium or difficult'

        } 
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1,'rating must be above 1.0'],
        max: [5,'rating must be below 5 ']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true,'A tour must have a price']
    },
    priceDiscount:{
        type: Number,
        validate: {
            validator: function(val) {
                //this only points to current doc on NEW document creation
                return val < this.price; //100 < 200
    
            },
            message: 'Discount price ({VALUE}) should be below regular price'

        }
    } ,
    summary: {
        type: String,
        trim: true,
        required: [true,'A tour must have description']

    },
    description:{
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true,'A tour must have cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }

},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration /7;
});
// Document MIDDLEWARE: run before .save() and .create()
tourSchema.pre('save',function(next){
   this.slug = slugify(this.name, {lower:true});
   next();
});

//Quer Middleware excute befor and after find

tourSchema.pre(/^find/,function(next){

    this.find({secretTour: {$ne: true}});
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/,function(docs,next){
    console.log(`Query took ${Date.now()-this.start} millisecond!`);
 
    next();
});
//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}});
    next()
})

const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;