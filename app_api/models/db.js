var mongoose = require( 'mongoose');

var dbURI = "mongodb://heroku_v06xwpd8:cav12iust3pj8ntd4d0u9nk4uv@ds047335.mongolab.com:47335/heroku_v06xwpd8";
//var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
	console.log("Mongoose connected to " + dbURI);
});

mongoose.connection.on('error', function(){
	console.log("Mongoose connection error " + err);
});

mongoose.connection.on('disconnected', function(){
	console.log("Mongoose disconnected");
});

var gracefulShutdown = function (msg, callback) {
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function (){
	gracefulShutdown('app termination', function (){
		process.exit(0);
	});
});

process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function ()  {
		process.exit(0);
	});
});

require('./locations');


//mongodb://heroku_v06xwpd8:cav12iust3pj8ntd4d0u9nk4uv@ds047335.mongolab.com:47335/heroku_v06xwpd8
// mongorestore -h ds047335.mongolab.com:47335 -d heroku_v06xwpd8 -u heroku_v06xwpd8 -p  cav12iust3pj8ntd4d0u9nk4uv ~/tmp/mongodump/Loc8r
