const Router = require('express-promise-router');


const  {country} = require('./countryController');
const {countryInsert} = require('./countryController');
const {countryDelete} = require('./countryController');
const {feedback} = require('./feedbackController');
const {slots} = require('./bookingController');
const {booking} = require('./bookingController');




const routes = () => {
   
    const router = Router({ mergeParams: true });

    router.route('/countries').get(country);
    router.route('/insertCountries').post(countryInsert);
    router.route('/deleteCountries').post(countryDelete);
    router.route('/feedback').post(feedback);
    router.route('/slots').post(slots);
    router.route('/booking').post(booking);
    
     
   
   
    return router;
}

module.exports = routes;