const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Schema=mongoose.Schema

const userSchema=new Schema({
    email:{
        type:String ,
        required:true, // need to be filled
        unique:true //no 2 same email required

    },
    password:{
        type:String ,
        required:true, // need to be filled
        
    },
    
})

//static signup method

userSchema.statics.signup=async function(email,password){

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not sufficiently strong')
    }


    const exists= await this.findOne({email})
    if(exists){
        throw Error('email already exists')
    }
    const salt= await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const user= await this.create({email,password:hash})
    return user
}

//static login method

userSchema.statics.login=async function(email,password){
    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user= await this.findOne({email})
    if(!user){
        throw Error('incorrect email')
    }
    const match= await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('incorrect password')
    }
    return user
}


module.exports=mongoose.model('User',userSchema)