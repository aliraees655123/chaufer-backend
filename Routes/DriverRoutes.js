import express from "express"

const router = express.Router();

import { loginDriver } from "../Controllers/DriverController.js";
import { driverVehicle } from "../Controllers/DriverController.js";



router.get("/driverVehicle/:id", driverVehicle);
router.post("/loginDriver", loginDriver);




export default  router