/* get locations pages */
var request = require('request');

var apiOptions = {
	server: "https://agile-gorge-9222.herokuapp.com"
	//server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://agile-gorge-9222.herokuapp.com";
}

var renderHomepage = function(req, res, responseBody){
	res.render('locations-list', {

		title: 'loc8r and a bunch of title text',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to leach bandwidth'
		},
		sidebar: "looking for some stuff, here's a bunch of text about stuff.",
		locations: responseBody
	});
};

var renderDetailPage = function(req, res, locDetail){
	res.render('location-info', {

		title: locDetail.name,
		pageHeader: {
			title: locDetail.name },
		sidebar: {context: "looking for some stuff, here's a bunch of text about stuff.",
					callToAction: "leave a review!!"},
		location: locDetail
	});
};

var renderReviewForm = function(req, res, locDetail) {
	console.log(locDetail);
	res.render('location-review-form', {
		title: "Review " + locDetail.name + " on Loc8r",
		pageHeader: {title : "Review " + locDetail.name}
		}
	);
};


var _formatDistance = function( distance) {
	var numDistance, unit;
	if (distance > 1) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
	} else {
		numDistance = parseInt(distance * 1000, 10).toFixed(1);
		unit = 'm';
	};
	return numDistance + unit;
};



var _showError = function(req, res, status){
	var title, content;
	if (status === 404) {
		title: "404, not the page your looking for";
		content: "go look for a better page";
	} else {
		title: status + ", somethings not right";
		content: "go look for a better page";
	}
	res.status(status);
	res.render('generic-text', {
		title: title,
		content: content
	});
};

var getLocationInfo = function(req, res, callback){
	var requestOptions, path;
	path = '/api/locations/' + req.params.locationid;

	requestOptions = {
		url : apiOptions.server + path,
		method: 'GET',
		json: {},
	    };
		request(
		requestOptions, function(err, response, body){
			var data = body;
			if (response.statusCode ===200) {
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};
			callback(req, res, data);
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};


module.exports.homeList = function(req, res){
	var requestOptions, path;
	path = '/api/locations';

	requestOptions = {
		url : apiOptions.server + path,
		method: 'GET',
		json: {},
		qs : {
			lng: -122.5,
			lat: 47.2000001,
			//maxDistance: 20000
		    }
	    };
	request(
		requestOptions, function(err, response, body){
			var i, data;
			data = body;
			if (response.statusCode === 200 && data.length) {
					for (i=0; i<data.length; i++){
				data[i].distance = _formatDistance(data[i].distance);
			}

			}					
			renderHomepage(req, res, data);
		});
};



module.exports.locationInfo = function(req, res){
		getLocationInfo(req, res, 
			function(req, res, responseData) {
				renderDetailPage(req, res, responseData);
		});
};

module.exports.addReview = function(req, res){
	getLocationInfo(req, res, 
			function(req, res, responseData) {
				renderReviewForm(req, res, responseData);
		});
}

module.exports.doAddReview = function(req, res){
	var requestOptions, path, locationid, postdata;
	
	locationid = req.params.locationid;

	path = '/api/locations/' + locationid + '/reviews';

	postdata = {	
			author: req.body.name,
			rating: parseInt(req.body.rating, 10),
			reviewText: req.body.reviewText
		}

	requestOptions = {
		url : apiOptions.server + path,
		method: 'POST',
		json: postdata 
	    };
		request(
		requestOptions, function(err, response, body){
			var data = body;
			if (response.statusCode ===201) {
			res.redirect('/location/' + locationid);
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};
