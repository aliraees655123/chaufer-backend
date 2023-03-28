import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";
import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Pricing from "../models/Pricing.js";
import { SERVERURL } from "../ServerUrl.js";
//add vehicle
export async function addVehicle(req, res) {
  const { catagory, company, passenger, luggage, price, availability ,driverEmail,driverId,hourPrice} =
    req.body;

  const vehicle = new Vehicle({
    catagory,
    company,
    passenger,
    luggage,
    price,
    availability,
    driverEmail,
    driverId,
    hourPrice,
    image: `${SERVERURL}/profile/${req.file.filename}`,
    
  });
  const vehicleNew = await vehicle.save();

  let data = await Driver.findById({ _id: driverId });

  data.assigned = true;

  await data.save();

  res
    .status(201)
    .json({ success: true, vehicleNew, message: "Succesfully Created" });
}
//update vehicle
export async function updateVehicle(req, res) {
  let { id } = req.params;
  const { catagory, company, passenger, luggage, price, availability } =
    req.body;
console.log(req.body)
  try {
    let data = await Vehicle.findById({ _id: id });
console.log("data",data)
    data.catagory = req.body.catagory;
    data.company = req.body.company;
    data.passenger = req.body.passenger;
    data.luggage = req.body.luggage;
    data.price = req.body.price;
    data.availability = req.body.availability;
    data.driverEmail = req.body.driverEmail;
    data.hourPrice = req.body.hourPrice;
    // data.driverId = req.body.driverId;

if(req.file)
{
  data.image = `${SERVERURL}/profile/${req.file.filename}`;


}

    // let dataDriver = await Driver.findById({ _id: req.body.driverId });

    // console.log("dataDriver",dataDriver)
    
    // if(dataDriver)
    // {
    //   dataDriver.assigned = true;
    //   await dataDriver.save();

    // }
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
//get vehicles
export async function getVehicles(req, res) {
  const vehicles = await Vehicle.find();
  res.json({ success: true, vehicles });
}
//delete vehicles
export async function deleteVehicle(req, res) {
  const deleteVehicle = await Vehicle.findByIdAndRemove(req.params.id);
  if (!deleteVehicle) {
    return next(new AppError("Invalid Vehicle Id Provided", 400));
  }
  res.json({ success: true, deleteVehicle, message: "Vehicle Deleted" });
}

//add driver
export async function addDriver(req, res) {
  const { name, email, phone, address,password,type } = req.body;
 const hasedpassword = bcrypt.hashSync(password, 10);
  const driver = new Driver({
    name,
    email,
    phone,
    address,
    type,
    password:hasedpassword
  });
  const newDriver = await driver.save();
  res
    .status(201)
    .json({ success: true, newDriver, message: "Succesfully Created" });
}

//update driver
export async function updateDriver(req, res) {
  let { id } = req.params;

  try {
    let data = await Driver.findById({ _id: id });
    let hasedpassword;
    if(req.body.password)
    {
     hasedpassword = bcrypt.hashSync(req.body.password, 10);

    }

    data.name = req.body.name;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.address = req.body.address;
    data.type = req.body.type;
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
//get drivers
export async function getDrivers(req, res) {
  const drivers = await Driver.find();
  res.json({ success: true, drivers });
}

//delete driver
export async function deleteDriver(req, res) {
  const deleteDriver = await Driver.findByIdAndRemove(req.params.id);
  if (!deleteDriver) {
    return next(new AppError("Invalid Vehicle Id Provided", 400));
  }
  res.json({ success: true, deleteDriver, message: "Driver Deleted" });
}
//delete driver
export async function getCustomers(req, res) {
  const customers = await Customer.find();
  res.json({ success: true, customers });
}

//pricing update
export async function pricing(req, res) {
  let { id } = req.params;
  

  try {
    let data = await Pricing.findById({ _id: id });


    data.pricing = req.body;


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

//pricing post

export async function addPricing(req, res) {
  
  let newData=req.body;
  console.log("fsdfhdsgf........",newData)
  const pricing = new Pricing(newData);
  const pricingNew = await pricing.save();
  res
    .status(201)
    .json({ success: true, pricingNew, message: "Succesfully Created" });
}


//register Admin
export async function registerAdmin(req, res) {
  const { name, email, phone, password, userType } = req.body;
  console.log("req.body", req.body);
  const checkMail = await Admin.find({ email });
  if (checkMail.length != 0) {
    return next(new AppError("Email Already Exists", 400));
  }
  if (!(email && password)) {
    return next(new AppError("Please Provide Email and Password"));
  }
  const hasedpassword = bcrypt.hashSync(password, 10);

  const newUser = new Admin({
    name,

    email,
    phone,
    password: hasedpassword,
    userType,
  });
  const user = await newUser.save();
  res.status(201).json({ success: true, user, message: "Succesfully Created" });
}


//login customer
export async function loginAdmin(req, res) {
  console.log("body=====", req.body);
  const { email, password } = req.body;

  try {
    let data = await Admin.findOne({ email: email });
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
//delete customer
export async function deleteCustomer(req, res) {
  const deleteCustomer = await Customer.findByIdAndRemove(req.params.id);
  if (!deleteDriver) {
    return next(new AppError("Invalid Vehicle Id Provided", 400));
  }
  res.json({ success: true, deleteCustomer, message: "Customer Deleted" });
}