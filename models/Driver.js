import mongoose from 'mongoose'

let driverSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            default:''

        },
        email:{
            type:String,
            default:''
        },
        phone:{
            type:String,
         

        },
        address:{
            type:String
        },
        assigned:{
            type:Boolean,
            default:false
        },
        password:{
            type:String,
         
        }
       

    }
   
)


export default driverSchema =mongoose.model("Driver",driverSchema)