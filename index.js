import express from "express"
import cors from "cors"
import mongoose from "mongoose"

// const customerRouter =require("./Routes/CustomerRoutes");

import customerRouter from "./Routes/CustomerRoutes.js"
import adminRouter from "./Routes/AdminRoutes.js"
import userRouter from "./Routes/UserRoutes.js"
import driverRouter from "./Routes/DriverRoutes.js"

const app= express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/profile", express.static("upload"));
app.use("/api",customerRouter);
app.use("/api",adminRouter);
app.use("/api",userRouter);
app.use("/api",driverRouter);


//////////
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
///////////
mongoose.set("strictQuery", false);

mongoose
  .connect('mongodb+srv://aliraees:aliraees@cluster0.xt29hi7.mongodb.net/?retryWrites=true&w=majority')
  .then((response) => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database is not connected");
  });






const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);

})

// app.listen(5000,()=>{
//   console.log(`listening on port 5000`);

// })


