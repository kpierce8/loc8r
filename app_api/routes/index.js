var express = require('express');
var router = express.Router();

var locations = require('../controllers/locations');
var reviews = require('../controllers/reviews');

/*Locations */
router.get('/locations', locations.locationsListByDistance);
router.post('/locations', locations.locationCreate);
router.get('/locations/:locationid', locations.locationsReadOne);
router.put('/locations/:locationid', locations.locationsUpdateOne);
router.delete('/locations/:locationid', locations.locationsDeleteOne);

/*Reviews */
router.post('/locations/:locationid/reviews', reviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', reviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', reviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', reviews.reviewsDeleteOne);


module.exports = router;