import express from "express"

const router = express.Router();



import { forgetPassword } from "../Controllers/UserController.js";
import { resetPassword } from "../Controllers/UserController.js";
import { editProfile } from "../Controllers/UserController.js";


router.post("/forgotPassword", forgetPassword);
router.put("/resetPassword", resetPassword);
router.put("/editProfile", resetPassword);






export default  router