import mongoose from 'mongoose'

let UserSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            // unique:true
        },
        name:{
            type:String,
            default:''
        },
        fullName:{
            type:String,
            default:''
        },
        password:{
            type:String
          
        },
        phone:{
            type:String
          
        },
      


    }
)


export default UserSchema =mongoose.model("Customer",UserSchema)