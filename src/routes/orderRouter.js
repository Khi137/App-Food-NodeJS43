import express from "express";
import { orderCreate } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/orderCreate", orderCreate)





export default orderRouter