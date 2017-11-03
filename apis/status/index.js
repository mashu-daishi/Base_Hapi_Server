'use strict';

exports.register = function initialize ( server, options, next ) {
	// Connect routes directory
	server.route( require( './handlers/check' ) );

	next();
};

exports.register.attributes = {
	'pkg' : {
		'name'    : 'status',
		'version' : '1.0'
	}
};
