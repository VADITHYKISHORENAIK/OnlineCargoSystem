'use strict';

const cargoModel = require('../models/cargoModel');




async function slots(req, res) {

    try {
        const params = {
            From: req.body.From,
            To: req.body.To,
            Date: req.body.Date
        }

        const data = await cargoModel.collection.find(params).toArray();
        if (data.length < 4) {
            return res.status(200).json({
                success: true,
                message: "slots are available",
            });

        } else {
            return res.status(200).json({
                success: false,
                message: "slots are booked for the day",
            });
        }




    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            message: "error in slots  API",
        });
    }

}
async function booking(req, res) {

    try {
        const params = {
            From: req.body.From,
            To: req.body.To,
            Date: req.body.Date,
            Name: req.body.Name,
            Email: req.body.Email,
            Phone: req.body.Phone
        }

        const data = await cargoModel.collection.findOne(params);
        console.log("data,", data);
        if (data != null) {
            return res.status(200).json({
                success: false,
                message: "You have already booked slot for existing date",
            });

        } else {
            await cargoModel.collection.insertOne(params);
            return res.status(200).json({
                success: true,
                message: "Thank you for booking",
            });
        }




    } catch (err) {
        console.log("err", err);
        return res.status(500).json({
            success: false,
            message: "error in booking  API",
        });
    }

}


module.exports = {
    slots,
    booking
};