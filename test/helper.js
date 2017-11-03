'use strict';

const config  = require( process.cwd() + '/config' ).test;
const request = require( 'request' );

// Configurations
const server = config.server;

let session;

function executeRequest ( options, callback ) {
	options.json = true;
	options.url  = [ [ server.host, server.port ].join( ':' ), options.url ].join( '' );

	request( options, function ( error, response, body ) {
		let data = {};

		data.statusCode = response.statusCode;
		data.payload    = body;
		data.error      = error;

		callback( data );
	} );
}

function fetch ( options, credentialsInput, callback ) {
	options.headers = {
		'user-agent' : 'testUserAgent'
	};

	if ( typeof credentialsInput === 'function' && !callback ) {
		callback = credentialsInput;
	}

	// set keep-alive true
	options.forever = true;

  executeRequest( options, callback );
}

module.exports = { fetch };
