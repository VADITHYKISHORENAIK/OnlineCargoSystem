'use strict';

const countryModel = require('../models/countryModel');


async function country(req, res) {

  try {
    const data = await countryModel.find({});



    return res.status(200).json({
      success: true,
      countries: data,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: "error in country list API",
    });
  }

}

async function countryInsert(req, res) {
  const newCountry = req.body.country;
  try {
    const data = await countryModel.findOne({
      country: newCountry
    });

    if (data != null) {
      return res.status(500).json({
        success: false,
        message: "Country Already exists in system",
      });
    } else {
      await countryModel.collection.insertOne({
        country: newCountry
      });
      return res.status(200).json({
        success: true,
        message: "Country Added to the List",
      });
    }



  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      message: "error in country Insert list API",
    });
  }

}

async function countryDelete(req, res) {
  const newCountry = req.body.country;
  try {
    const data = await countryModel.findOne({
      country: newCountry
    });

    if (data != null) {
      await countryModel.collection.remove({
        country: newCountry
      });
      return res.status(200).json({
        success: true,
        message: "Country Removed from the List",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Country Does Not  exists in system",
      });
    }



  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      success: false,
      message: "error in country Remove from  list API",
    });
  }

}

module.exports = {
  country,
  countryInsert,
  countryDelete
};