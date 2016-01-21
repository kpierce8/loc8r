/* get locations pages */
var request = require('request');

var apiOptions = {
	server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://....herokuapp.com";
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



module.exports.homeList = function(req, res){
	var requestOptions, path;
	path = '/api/locations';

	requestOptions = {
		url : apiOptions.server + path,
		method: 'GET',
		json: {},
		qs : {
			lng: -122,
			lat: 47.000001,
			maxDistance: 20000
		    }
	    };
	request(
		requestOptions, function(err, response, body){
			renderHomepage(req, res, body);
		});
};



module.exports.locationInfo = function(req, res){
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
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			};
			renderDetailPage(req, res, data);
		});
};

module.exports.addReview = function(req, res){
	res.render('location-review-form', { title: 'Add review' });
}

