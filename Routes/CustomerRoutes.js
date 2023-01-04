import express from "express"
import{ registerCustomer,loginCustomer} from './../Controllers/CustomerController.js'
import { addVehicle } from "../Controllers/AdminController.js";
import multer from "multer";
const router = express.Router();
import { getPricing } from "./../Controllers/CustomerController.js";
import path from "path";
import { bookVehicle } from "./../Controllers/CustomerController.js";
import { getBooking } from "./../Controllers/CustomerController.js";
import { paymentFinal } from "./../Controllers/CustomerController.js";
import { myBookings } from "./../Controllers/CustomerController.js";

const storage = multer.diskStorage({
    destination: "./upload",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({
    storage: storage,
  });




router.post("/registerCustomer", registerCustomer);
router.post("/loginCustomer", loginCustomer);
router.get("/getPricing", getPricing);
router.post("/bookVehicle", bookVehicle);

router.get("/getBookings", getBooking);

router.get("/myBookings/:id", myBookings);
router.post("/payment", paymentFinal);




export default  router