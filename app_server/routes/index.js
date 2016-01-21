var express = require('express');
var router = express.Router();



var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');



/*Locations pages*/
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/*Other page*/
router.get('/about', ctrlOthers.about);



module.exports = router;
