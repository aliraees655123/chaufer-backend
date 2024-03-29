import Customer from "./../models/Customer.js";
// import sendMailer from "../Utility/mail.js";
import bcrypt from "bcryptjs"
import { sendMailer } from "../Utility/mail.js";
///Forget password
export async function forgetPassword(req, res) {
    console.log("email", req.body.email);
    try {
      let email = req.body.email;
      // console.log("email",email)
      let data = await Customer.findOne({ email: email });
  
      // console.log("data", data);
      // console.log("email", email);
      if (email) {
        let id = 23;
        console.log("====", email);
        await sendMailer(email, id);
        console.log("it is send mailer",sendMailer)
        res.status(200).json({
          message: "Check your Email for verification",
        });
        console.log("Check your Email for verification")
      } 
      else {
        res.status(400).json({
          Error_Message: "Email is not found",
          // error,
        });
        console.log("not found")
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        Error_Message: "Email is not found",
        error,
      });
    console.log("not found")

    }
  };
export async function resetPassword(req, res) {
    const { _id } = req.body;
    console.log("req.body",req.body,req.body.password)
    try {
      const hasedpassword = bcrypt.hashSync(req.body.password, 10);
      const data = await Customer.findOneAndUpdate(
        { _id: _id },
        { $set: { password: hasedpassword } },
        {
          new: true,
          useFindAndModify: false,
        }
      );

    // const data=await Customer.findOne({_id:_id})
  
      console.log("dataReset", data);
      if (data) {
        res.status(200).json({
          message: "Password Changed Successfully...",
          data,
        });
      } else {
        res.status(400).json({
          message: "Password Changed Failed...",
        });
      }
    } catch (error) {
      res.status(400).json({
        Error_Message: error,
      });
    }
  };


  //edit customer
export async function editProfile(req, res) {
  const { name, email, password, phone } = req.body;

  

    let { id } = req.params;

    try {
      let data = await Customer.findById({ _id: id });
      let hasedpassword;
      if(req.body.password)
      {
       hasedpassword = bcrypt.hashSync(req.body.password, 10);
  
      }
  
      data.name = req.body.name;
      data.email = req.body.email;
      data.phone = req.body.phone;
      data.address = req.body.address;
  
      if(hasedpassword)
      {
  
        data.password = hasedpassword;
      }
  
      await data.save();
      console.log("dataCompleProfile123", data);
      if (data) {
        res.status(200).json({
          message: "Information Updated",
          data,
        });
      } else {
        res.status(400).json("No data found");
      }
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json(error);
    }
}
