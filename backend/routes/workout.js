const express=require('express')
const {
    createWorkout,
    getallworkouts,
    getaworkout,
    deleteaworkout,
    updateaworkout
}=require('../controllers/workoutcontroller') //HOUSING THE FUNCTIONS 
//THAT DESCRIBE WHAT TO DO WHEN A REQUEST HAS BEEN SENT
const requireAuth =require('../middleware/requireAuth')
//ROUTING (PROVIDED BY EXPRESS)
const router= express.Router()
router.use(requireAuth)
//get all workouts
router.get('/',getallworkouts)

//get a single workout
router.get('/:id',getaworkout)

//post a new workout
router.post('/',createWorkout )

//delete
router.delete('/:id',deleteaworkout)

router.patch('/:id',updateaworkout)

//IMP TO EXPORT THE ROUTER INORDER TO IMPORT IT IN server.js
module.exports=router