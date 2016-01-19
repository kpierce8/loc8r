/* get locations pages */


module.exports.homeList = function(req, res){
	res.render('locations-list', { 

		title: 'loc8r and a bunch of title text',
		pageHeader: {
			title: 'Loc8r',
			strapline: 'Find places to leach bandwidth'
		},
		locations: [{
			name: 'Olympia Cards and Comics',
			address: 'near that circle in Lacey',
			rating: 5,
			facilities: ['Magic Cards', 'Superhero Stuff', 'Sci-Fi memorabilia'],
			distance: 'close'
		}, {
			name: 'Barnes & Noble',
			address: 'in Olympia next to Trader Joes',
			rating: 3,
			facilities: ['Magic Cards', 'Books', 'Coffee'],
			distance: '10 km'
		}, {
			name: '5 Guys',
			address: 'in front of Sport"s Authority',
			rating: 4,
			facilities: ['Snorkel Stuff', 'Iron', 'Shoes'],
			distance: 'close'
		    }
		] 
	});
}

module.exports.locationInfo = function(req, res){
	res.render('location-info', { title: 'Location Info' });
}

module.exports.addReview = function(req, res){
	res.render('location-review-form', { title: 'Add review' });
}

