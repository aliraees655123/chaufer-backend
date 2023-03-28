import express from "express"

import { addVehicle } from "../Controllers/AdminController.js";
import { updateVehicle } from "../Controllers/AdminController.js";
import { getVehicles } from "../Controllers/AdminController.js";
import { deleteVehicle } from "../Controllers/AdminController.js";
import { addDriver } from "../Controllers/AdminController.js";
import { updateDriver } from "../Controllers/AdminController.js";
import { getDrivers } from "../Controllers/AdminController.js";
import { deleteDriver } from "../Controllers/AdminController.js";
import { getCustomers } from "../Controllers/AdminController.js";
import { pricing } from "../Controllers/AdminController.js";
import { addPricing } from "../Controllers/AdminController.js";
import { registerAdmin } from "../Controllers/AdminController.js";
import { loginAdmin } from "../Controllers/AdminController.js";
import { deleteCustomer } from "../Controllers/AdminController.js";
import multer from "multer";
const router = express.Router();
import path from "path";


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




router.post("/addVehicle", upload.single("photo"), addVehicle);
router.put("/updateVehicle/:id", upload.single("photo"), updateVehicle);
router.get("/getVehicles",  getVehicles);
router.delete("/deleteVehicle/:id",  deleteVehicle);
router.post("/addDriver",  addDriver);
router.put("/updateDriver/:id",updateDriver);
router.get("/getDrivers",getDrivers);
router.delete("/deleteDriver/:id", deleteDriver);
router.delete("/deleteCustomer/:id", deleteCustomer);
router.get("/getCustomers", getCustomers);
router.put("/pricing/:id", pricing);
router.post("/addPricing", addPricing);
router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);





export default  router