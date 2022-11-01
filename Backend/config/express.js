const express = require('express');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const logger = require("./logger");
const routes = require("../routes");

module.exports = () => {
	const app = express();

	app.disable("x-powered-by");
	app.use(cookie());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan("combined", {
		stream: logger.stream
	}));

	// Security headers -- HELMET
	app.use(helmet.hsts({
		maxAge: 63072000,
		preload: true,
	  }));
	app.use(helmet.contentSecurityPolicy());
	app.use(helmet.noSniff());
	app.use(helmet.frameguard({
		action: "sameorigin",
	  }));

    // CORS Request
    app.all('*', (req, res, next) => {
        if (!req.get('Origin')) return next();
        // use '*' here to access any origin
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'PUT');
        res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Compete, Reference-Id, Authorization, Clientid, Redirect-Url, signedlogintoken, X-Access-Token, Student-Url, Profile-Id");
		    res.set("Access-Control-Expose-Headers", "Assess, Compete, Reference-Id, Redirect-Url, X-Access-Token, Student-Url, Profile-Id");

		if ("OPTIONS" == req.method) return res.sendStatus(200);
		next();
	});

    app.use('/api', routes());
    return app;
};

