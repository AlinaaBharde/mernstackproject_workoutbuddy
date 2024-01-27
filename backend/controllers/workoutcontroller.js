//require the schema-based-db and mongoose
const Workout= require('../models/workoutMern')
const mongoose = require('mongoose')

//get all workouts
const getallworkouts= async (req,res)=>{
    const user_id= req.user._id
    const workouts= await Workout.find({user_id}).sort({createdAt:-1}) 
    //to find all, thats why .find({})
    res.status(200).json(workouts)
    console.log(workouts)
}

//get a single workout

const getaworkout= async (req,res)=>{
    const {id}=req.params //to get the parameters from the req.body=> req.params
    
    //code for if id is not valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such workouts"})
    }
    const workout= await Workout.findById(id)
    //code for if workout does not exist for the id
    if(!workout)
{
    return res.status(404).json({error:"No such workouts"})
}
    res.status(200).json(workout)
}

//create new workout
const createWorkout= async (req,res)=>{
    const {title,load,reps}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length> 0)
    {
        return res.status(400).json({error:'Please complete all fields',emptyFields})
    }

    //add doc to db
    try{
        const user_id=req.user._id
        const workout=await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete a workout
const deleteaworkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such workouts"})
    }
    const workout= await Workout.findOneAndDelete({_id:id})
    if(!workout)
{
    return res.status(404).json({error:"No such workouts"})
}
    res.status(200).json(workout)


}
//update a workout

const updateaworkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such workouts"})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body // to ensure rest of the info which is not updated is intact?
    })
    if(!workout)
{
    return res.status(404).json({error:"No such workouts"})
}
    res.status(200).json(workout)
}


//export
module.exports={
    createWorkout,
    getallworkouts,
    getaworkout,
    deleteaworkout,
    updateaworkout
}