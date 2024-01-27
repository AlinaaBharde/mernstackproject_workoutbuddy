//require it
const mongoose=require('mongoose')
//create a Schema obj
const Schema =mongoose.Schema


//creating a schema for the incoming data to mongodb with the help of mongoose
const workoutSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String ,
        required:true,
    }
},{timestamps:true})

//this is how you export
 //               name of mongodb collection you want to put the schema on               
 //                                |
 //                                v
module.exports=mongoose.model('Workout',workoutSchema)

