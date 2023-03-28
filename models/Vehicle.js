import mongoose from 'mongoose'

let vehicleSchema=new mongoose.Schema(
    {
        catagory:{
            type:String,
            default:''

        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver'
        },
        company:{
            type:String,
            default:''
        },
        passenger:{
            type:String,
         

        },
        luggage:{
            type:String
        },
        image:{
            type:String
        },
        price:{
            type:String
        },
        availability:{
            type:Boolean
        },
        driverEmail:{
            type:String
        },
        hourPrice:{
            type:String
        }

    }
   
)


export default vehicleSchema =mongoose.model("Vehicle",vehicleSchema)