import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const model = initModels(sequelize);
const orderCreate = async(req, res) => {
    const {user_id, food_id, amount, code, arr_sub_id} = req.body;
    try {
        let checkFoodId = await model.food.findOne({ 
            where: { food_id } 
        });
        
        if (checkFoodId) {
            let newOrder = { 
                user_id, 
                food_id, 
                amount, 
                code, 
                arr_sub_id 
            };
            let createdOrder = await model.order.create(newOrder);
            res.status(200).send({ message: "Thành công !", order: createdOrder });
        } else {
            res.status(400).send({ error: "No food existed !" });
        }
    } catch (error) {
        console.error("Error in orderCreate:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};
export { orderCreate };