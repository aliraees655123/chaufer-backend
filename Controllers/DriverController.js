


import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//get driverVehicles
export async function driverVehicle(req, res) {
    let { id } = req.params;
  
    console.log("req.body===", id);
    let vehicle = null;
    let driver = null;
    const newDriver=null;
    // if (id) {
        vehicle = await Vehicle.find({ driverId: id });

       





    // }
  
    console.log("driver....", driver,newDriver);
    res.json({ success: true, vehicle });
  }


  //login driver
export async function loginDriver(req, res) {
    console.log("body=====", req.body);
    const { email, password } = req.body;
  
    try {
      let data = await Driver.findOne({ email: email });
      console.log("=========", data);
      const isMatch = await bcrypt.compare(password, data.password);
      console.log("isMatch", isMatch);
      if (isMatch) {
        const token = jwt.sign(data.toObject(), "secret", { expiresIn: "7d" });
        res.status(200).json({
          status: true,
          message: "UserLogin Successfully",
          user: data,
          token,
        });
      } else {
        res.status(400).json({
          message: "Invalid Email or password",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        Error_Message: error,
      });
    }
  }