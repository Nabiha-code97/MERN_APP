//define in point of the application and map them to specific controller method

import express from "express";
import { create } from "../controller/userController.js";
import { getAllUsers } from "../controller/userController.js";
import { getUserById } from "../controller/userController.js";
import { updateUser, deleteUser } from "../controller/userController.js";

const route = express.Router();

route.post("/user",create);
route.get("/allUsers",getAllUsers);
route.get("/getUser/:id",getUserById);
route.put("/updateUser/user/:id",updateUser);
route.delete("/delete/user/:id",deleteUser);

export default route;