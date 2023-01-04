import mongoose from 'mongoose'

let bookingSchema=new mongoose.Schema(
    {
        passenger:{
            type:String,
   
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        bookingAmount:{
            type:String,
            default:''
        },
        pickUpLocation:{
            type:String,
            default:''
        },
        arrivalLocation:{
            type:String
          
        },
        pickUpDate:{
            type:String
          
        },
        
        pickUpTime:{
            type:String
          
        },
        
        returnPickUpTime:{
            type:String
          
        },
        
        returnPickUpDate:{
            type:String
          
        },
        


    }
)


export default bookingSchema =mongoose.model("Booking",bookingSchema)