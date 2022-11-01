'use strict';

const feedbackModel = require('../models/feedbackModel');




async function feedback(req, res) {

    try {



        await feedbackModel.collection.insertOne(req.body);
        return res.status(200).json({
            success: true,
            message: "Thank you for your feed back",
        });




    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            message: "error in feed back  API",
        });
    }

}



module.exports = {
    feedback
};