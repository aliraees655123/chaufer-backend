import mongoose from 'mongoose'

let customerSchema=new mongoose.Schema(
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


export default customerSchema =mongoose.model("Customer",customerSchema)