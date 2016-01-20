var mongoose = require('mongoose');
var Loc = mongoose.model('Location');



var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}


module.exports.reviewsCreate = function(req, res) {
	sendJSONresponse(res, 200, {"status": "success"});
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          console.log(location);
          var response, review;
          if (!location) {
            sendJSONresponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
          	if (location.reviews.length > 1){
          		review = location.reviews.id(req.params.reviewid);
          	} else {
          		review = location.reviews;
          	}
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
  }
};

module.exports.reviewsReadTwo = function(req, res) {
	if(req.params && req.params.locationid && req.params.reviewid) {
		Loc.findById(req.params.locationid)
		.select('name reviews')
		.exec(function(err, location){
			var response, review;
			console.log("line 17");
			if(!location){
				console.log("line 24");
				sendJsonResponse(res, 404, {"message" : "That locationid was not found."});
				return;
			} else if (err) {
				console.log("line 28");
				sendJsonResponse(res, 404, err); 
				return;
			}
			if (location.reviews && location.reviews.length > 0) {
				console.info("reviews are " + location.reviews);
				if (location.reviews.length > 1){
					review = location.reviews.id(req.params.reviewid);
				} else {
					review = location.reviews;
				}
				
				if (!review){
					console.log("line 34");
					sendJsonResponse(res, 404, {"message" : "That review not found."});
				} else {
					response = {
						location : { name: location.name, id: req.params.locationid },
						review: review
						};
						console.info("Hey trying to respond!!");
						sendJsonResponse(res, 200, response);
				}//else  
				
			} else {
			sendJsonResponse(res, 404, {"message" : "No reviews found."	});
		}; //finish exec
	});	
  }
  sendJsonResponse(res, 404, {"message" : "No location or reviewid." });
};

module.exports.reviewsUpdateOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.reviewsDeleteOne = function(req, res) {
	sendJsonResponse(res, 200, {"status": "success"});
};