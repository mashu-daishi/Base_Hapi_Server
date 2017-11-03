'use strict';

// Load third-party modules
const Hapi   = require( 'hapi' );
const config = require( './config' );
const server = new Hapi.Server();

server.connection( config.api.connection );

module.exports = new Promise( function ( resolve ) {
	let options = config.api.options;

	// Register all plugins
	server.register( require( './plugins' ), options, function ( registerError ) {
		if ( registerError ) {
			return setTimeout( function () {
				throw registerError;
			} );
		}
		// Start the server
		server.start( function ( startError ) {
			if ( startError ) {
				return setTimeout( function () {
					throw startError;
				} );
			}
			resolve( server );
		} );
	} );
} );
