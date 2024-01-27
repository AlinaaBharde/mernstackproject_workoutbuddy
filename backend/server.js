require('dotenv').config()
//EXPRESS AND MONGOOSE
const express= require('express')
const mongoose= require('mongoose')
//ROUTES
const workoutroutes= require('./routes/workout.js')
const userRoutes= require('./routes/user.js')
//CORS
const cors = require('cors');

//BUILDING EXPRESS APP
const app= express()


//for cross network 1
app.use(cors());
//middleware
app.use(express.json()) //to prepare to req.body 2

app.use((req,res,next)=>{ //3
    console.log(req.path,req.method)
    next()
})

//routes(alag se page) so you would write this line 4
app.use('/api/workouts',workoutroutes)
app.use('/api/user',userRoutes)

//connect to db AND LISTENING

mongoose.connect(process.env.MERN_URI)
.then(()=>{
// listen for requests
    app.listen(process.env.PORT,()=>{
        console.log('CONNECTED TO DB & listening on',process.env.PORT)
})  
})
.catch((error)=>{
    console.log(error)
})






