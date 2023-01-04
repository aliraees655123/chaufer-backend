import mongoose from 'mongoose'

let adminSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            // unique:true
        },
        name:{
            type:String,
            default:''
        },
        phone:{
            type:String,
            default:''
        },
        password:{
            type:String
          
        },
        userType:{
            type:String
        }


    }
)


export default adminSchema =mongoose.model("Admin",adminSchema)