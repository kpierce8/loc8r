var mongoose = require('mongoose');
var Loc = mongoose.model('Location');



var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

var theEarth = (function(){
	var earthRadius = 6371;
	var getDistanceFromRads = function(rads){
		return parseFloat(rads * earthRadius);
	};

	var getRadsFromDistance = function(distance) {
 		return parseFloat(distance / earthRadius);
	};

	return {
		getRadsFromDistance: getRadsFromDistance,
		getDistanceFromRads: getDistanceFromRads
	};

}) ();


module.exports.locationsListByDistance = function(req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.getRadsFromDistance(2000.0),
		num: 10 //max objects returned
	};
	if (!lng || !lat) {
		sendJsonResponse(res, 404, {"message" : "Need lat and lng."});
		return;
	}
	console.log(geoOptions);
	console.log(point);
	Loc.geoNear(point, geoOptions, function(err, results, stats){
		var locations = [];
		console.log(results);
		if (err) {
			sendJsonResponse(res, 404, err);
		} else {
		results.forEach(function(doc){
			locations.push({
				distance: theEarth.getDistanceFromRads(doc.dis),
				name: doc.obj.name,
				address: doc.obj.address,
				rating: doc.obj.rating,
				facilities: doc.obj.facilities,
				_id: doc.obj._id
			});
		});
	sendJsonResponse(res, 200, locations);
}
	});

};

module.exports.locationCreate = function(req, res) {

	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1
		}, 
		{
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2
		}]
	}, function(err, location) {
		if (err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, location);
	}
	});
};

module.exports.locationsReadOne = function(req, res) {
	if(req.params && req.params.locationid) {
		Loc.findById(req.params.locationid)
		.exec(function(err, location){
			if(!location){
				sendJsonResponse(res, 404, {"message" : "That locationid was not found."});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err); 
				return;
			} 
			sendJsonResponse(res, 200, location);
		});
	} else {
		sendJsonResponse(res, 404, {"message" : "No locationid in request."
	});
	}
};

module.exports.locationsUpdateOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.locationsDeleteOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success"});
};