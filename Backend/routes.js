const express = require("express");


const routes = require("./source/api/apiRoutes");


const apiRouter = express.Router();

module.exports = () =>
	apiRouter
		.use("/assignment",routes())
	
		
		