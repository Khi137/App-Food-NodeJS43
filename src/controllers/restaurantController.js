import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const models = initModels(sequelize);

const getAllRestaurant = async (req, res) => {
    try {
        let data = await models.restaurant.findAll();
        res.status(200).send({ message: "Thành công !", restaurants: data });
    } catch (error) {
        console.error("Error in getAllRestaurant:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const likeRestaurant = async (req, res) => {
    const { user_id, res_id } = req.body;
    try {
        let checkLikedByUser = await models.like_res.findOne({
            where: { user_id, res_id }
        });

        if (!checkLikedByUser) {
            let newResLike = {
                user_id,
                res_id,
                date_like: new Date(),
            };
            let createdLike = await models.like_res.create(newResLike);
            res.status(200).send({ message: "Thành công !", like: createdLike });
        } else {
            res.status(400).send({ error: "User Already Liked !" });
        }
    } catch (error) {
        console.error("Error in likeRestaurant:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const unlikeByUser = async (req, res) => {
    const { user_id, res_id } = req.body;
    try {
        let checkLikedByUser = await models.like_res.findOne({
            where: { user_id, res_id }
        });

        if (!checkLikedByUser) {
            res.status(400).send({ error: "Like not found !" });
        } else {
            await models.like_res.destroy({
                where: { user_id, res_id }
            });
            res.status(200).send({ message: "Thành công !" });
        }
    } catch (error) {
        console.error("Error in unlikeByUser:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const getLikeByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        let likedByUser = await models.like_res.findAll({
            where: { user_id }
        });

        if (likedByUser.length === 0) {
            res.status(200).send({ message: "No likes found !" });
        } else {
            res.status(200).send({ message: "Success !", likes: likedByUser });
        }
    } catch (error) {
        console.error("Error in getLikeByUser:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const getResLikeByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        let reslikedByUser = await models.like_res.findAll({
            where: { user_id },
            include: [{
                model: models.restaurant,
                as: "re",
                attributes: ["res_name"],
            }],
        });

        if (reslikedByUser.length === 0) {
            res.status(200).send({ message: "No liked restaurants found !" });
        } else {
            res.status(200).send({ message: "Success !", likedRestaurants: reslikedByUser });
        }
    } catch (error) {
        console.error("Error in getResLikeByUser:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

const getLikeByRestaurant = async (req, res) => {
    const { res_id } = req.params;
    try {
        let likeOfRestaurant = await models.like_res.findAll({
            where: { res_id }
        });

        if (likeOfRestaurant.length === 0) {
            res.status(200).send({ message: "No one likes this restaurant !" });
        } else {
            res.status(200).send({ message: "Success !", likes: likeOfRestaurant });
        }
    } catch (error) {
        console.error("Error in getLikeByRestaurant:", error);
        res.status(500).send({ error: "Internal Server Error", details: error.message });
    }
};

export {
    getAllRestaurant,
    likeRestaurant,
    unlikeByUser,
    getLikeByUser,
    getResLikeByUser,
    getLikeByRestaurant
};