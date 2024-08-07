import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const models = initModels(sequelize);

const rateCreate = async (req, res) => {
    const { user_id, res_id, amount } = req.body;
    try {
        let checkRate = await models.rate_res.findOne({
            where: { user_id, res_id }
        });

        if (!checkRate) {
            let newRate = {
                user_id, 
                res_id,
                amount,
                date_rate: new Date(),
            };
            let createdRate = await models.rate_res.create(newRate);
            res.status(200).send({ message: "Thành công !", rate: createdRate });
        } else {
            res.status(400).send({ error: "User Already Rate!" });
        }
    } catch (error) {
        console.error("Error in rateCreate:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const getRatebyUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        let rateOfUser = await models.rate_res.findAll({
            where: { user_id }
        });

        if (rateOfUser.length === 0) {
            res.status(200).send({ message: "You did not rate any restaurant !" });
        } else {
            res.status(200).send({ message: "Success !", rates: rateOfUser });
        }
    } catch (error) {
        console.error("Error in getRatebyUser:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const getRatebyRes = async (req, res) => {
    const { res_id } = req.params;
    try {
        let rateOfRes = await models.rate_res.findAll({
            where: { res_id }
        });

        if (rateOfRes.length === 0) {
            res.status(200).send({ message: "No one rate your restaurant !" });
        } else {
            res.status(200).send({ message: "Success !", rates: rateOfRes });
        }
    } catch (error) {
        console.error("Error in getRatebyRes:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

export {
    rateCreate,
    getRatebyUser,
    getRatebyRes
};