import express from 'express'
import orderRouter from './orderRouter.js'
import rateRouter from './rateRouter.js'
import restaurantRouter from './restaurantRouter.js'


const rootRouter = express.Router()
rootRouter.use("/order",orderRouter)
rootRouter.use("/rate",rateRouter)
rootRouter.use("/restaurant",restaurantRouter)



export default rootRouter