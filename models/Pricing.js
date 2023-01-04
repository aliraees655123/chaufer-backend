import mongoose from 'mongoose'

let pricingSchema=new mongoose.Schema(
    {
        pricing: {
            type: Array,
          },


        // distance:{
        //     type:Number,
        //     default:''

        // },
        // handLuggage:{
        //     type:Number,
        //     default:''
        // },
        // suitcase:{
        //     type:Number,
        //     default:''
         

        // },
        // backPack:{
        //     type:Number,
        //     default:''
        // },
        // ruckSack:{
        //     type:Number,
        //     default:''
        // },
        // snowboard:{
        //     type:Number,
        //     default:''
        // },
        // pairSkies:{
        //     type:Number,
        //     default:''
        // },
        // golfBag:{
        //     type:Number,
        //     default:''
        // },
       
        // bike:{
        //     type:Number,
        //     default:''
        // },
        // largBox:{
        //     type:Number,
        //     default:''
        // },
        // childItem:{
        //     type:Number,
        //     default:''
        // },
        // wheelchair:{
        //     type:Number,
        //     default:''
        // },
       

    }
   
)


export default pricingSchema =mongoose.model("Pricing",pricingSchema)