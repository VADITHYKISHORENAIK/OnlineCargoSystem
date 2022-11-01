"use strict";

const mongoose = require("mongoose");

const config = require("./config/db");
const logger = require("./config/logger");
const tracer = require("dd-trace").init();
// enable and configure postgresql integration
tracer.use('mongodb-core', {
	enabled: true
})

mongoose.Promise = global.Promise;
const mongooseOptions = {
	useNewUrlParser: true,
	// useCreateIndex: true,
	// useFindAndModify: false,
	// useUnifiedTopology: true
};

mongoose.connect(config.db, mongooseOptions);
const db = mongoose.connection;
const PORT = process.env.PORT;

db.on("error", err => {
	logger.info("Mongoose error", err);
});

db.once("open", async () => {
	mongoose.dataBase = await db.useDb("assignment");
    

	// const configAxios = require("./config/axiosConfig");
	// configAxios();

	const setupExpress = require("./config/express");
	const app = setupExpress();

	app.listen(PORT, () => {
		logger.info(`Server started on PORT: ${PORT}`);
	});
});

