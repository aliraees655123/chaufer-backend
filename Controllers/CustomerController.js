import bcrypt from "bcryptjs";
import Customer from "./../models/Customer.js";
import Pricing from "../models/Pricing.js";
import Booking from "../models/Booking.js";
import jwt from "jsonwebtoken";
import  Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LNEcMGMEfjxrtQoRM6dLKwZgG3sfwLGoV92bqaz229MUPdj4ygQNkBCyIsmrOnTHf69ZIncMkHjcSjsh0HQgxth00HrgmhF3Z');
import { v4 as uuidv4 } from 'uuid';
// import Booking from "../models/Booking.js";
//register customer
export async function registerCustomer(req, res) {
  const { name, email, phone, password, userType } = req.body;
  console.log("req.body=========register", req.body);
  const checkMail = await Customer.find({ email });
  if (checkMail.length != 0) {
    // return next(new AppError("Email Already Exists", 400));
  }
  if (!(email && password)) {
    // return next(new AppError("Please Provide Email and Password"));
  }
  const hasedpassword = bcrypt.hashSync(password, 10);

  const newUser = new Customer({
    name,
    email,
    phone,
    password: hasedpassword,
    userType,
  });
  const user = await newUser.save();
  console.log("user",user)
  res.status(201).json({ success: true, user, message: "Succesfully Created" });
}
//login customer
export async function loginCustomer(req, res) {
  console.log("body=====", req.body);
  const { email, password } = req.body;

  try {
    let data = await Customer.findOne({ email: email });

    if(!data)
    {
      res.status(401).json({
        message: "No User Exist with Email",
        status: false,
      });
    }
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
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error_Message: error,
      status: false,
    });
  }
}

//get booking
export async function getBooking(req, res) {
  const bookings = await Booking.find();
  res.json({ success: true, bookings });
}
//get prices
export async function getPricing(req, res) {
  const pricing = await Pricing.find();
  res.json({ success: true, pricing });
}

//booking
export async function bookVehicle(req, res) {
  const {
 
    pickUpDate,
    bookingAmount,
    pickUpLocation,
    userId,
    arrivalLocation,
    pickUpTime,
    returnPickUpTime,
    returnPickUpDate,
    hourlyDuration
  } = req.body;
  let booking=null;
  if(userId)
  {
    console.log("usidExist");
     booking = new Booking({

  
      bookingAmount,
  
      pickUpLocation,
      pickUpDate,
  
      arrivalLocation,
      pickUpTime,
      returnPickUpTime,
      returnPickUpDate,
      hourlyDuration,
      userId,
    });
  }
  else{
    console.log("userId not exist");
    booking = new Booking({

  
      bookingAmount,
  
      pickUpLocation,
      pickUpDate,
  
      arrivalLocation,
      pickUpTime,
      returnPickUpTime,
      returnPickUpDate,
      hourlyDuration

    });

  }




  const bookingNew = await booking.save();
  res
    .status(201)
    .json({ success: true, bookingNew, message: "Booked succussfully" });
}
//booking withouyLogin
export async function bookVehicleGuest(req, res) {
  const {
    passenger,
    pickUpDate,
    bookingAmount,
    pickUpLocation,
 
    arrivalLocation,
    pickUpTime,
    returnPickUpTime,
    returnPickUpDate,
  } = req.body;

  const booking = new Booking({
    passenger,

    bookingAmount,

    pickUpLocation,
    pickUpDate,

    arrivalLocation,
    pickUpTime,
    returnPickUpTime,
    returnPickUpDate,
  
  });
  const bookingNew = await booking.save();
  res
    .status(201)
    .json({ success: true, bookingNew, message: "Booked succussfully" });
}

//my bookings
export async function myBookings(req, res) {
  let { id } = req.params;

  console.log("req.body===", id);
  let bookings = null;
  if (id) {
    bookings = await Booking.find({ userId: id });
  }

  console.log("Bookings....", bookings);
  res.json({ success: true, bookings });
}


//my bookings
export async function paymentFinal(req, res) {
  const{product,token}=req.body;
  console.log("PRODUCT",product);
  console.log("PRICE",product.price);

  const idempotencyKey=uuidv4();

  return stripe.customers.create({
      email:token.email,
      source:token.id,
  }).then(customer=>{
      stripe.charges.create({
          amount:product.price *100,
          currency:'usd',
          customer:customer.id,
          receipt_email:token.email,
          description:`purchase ${product.name}`,
          shipping:{
              name:token.card.name,
              address:{
                  country:token.card.address_country,
              }
          }
      },{idempotencyKey})
  }).then(result=>res.status(201).json(result))
  .catch(err=>console.log(err))
}
