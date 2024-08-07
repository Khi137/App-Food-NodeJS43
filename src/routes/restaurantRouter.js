import express from "express";
import {
  getAllRestaurant,
  getLikeByRestaurant,
  getLikeByUser,
  getResLikeByUser,
  likeRestaurant,
  unlikeByUser,
} from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/all", getAllRestaurant);

restaurantRouter.post("/like", likeRestaurant);

restaurantRouter.post("/unlike", unlikeByUser);

restaurantRouter.get("/get-like-by-user/:user_id", getLikeByUser);

restaurantRouter.get("/get-restaurant-like-by-user/:user_id", getResLikeByUser);

restaurantRouter.get("/get-like-by-res/:res_id", getLikeByRestaurant);

export default restaurantRouter;
