import express from "express";
import {
  getRatebyRes,
  getRatebyUser,
  rateCreate,
} from "../controllers/rateController.js";

const rateRouter = express.Router();

rateRouter.post("/createRate", rateCreate);
rateRouter.get("/get-rate-by-user/:user_id", getRatebyUser);
rateRouter.get("/get-rate-by-restaurant/:res_id", getRatebyRes);

export default rateRouter;
