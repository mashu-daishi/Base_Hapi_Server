'use strict';

// Get server
const config = require( './config' );
const server = require( './boot' );

const handleError = error => {
	if ( error ) {
		console.log( ( error.stack || error ).replace( /\n/g, '\\n' ) );
	} else {
		console.log( 'Unknown error' );
	}
};

process.on( 'uncaughtException', function ( error ) {
	handleError( error );
	/* eslint no-process-exit:0 */
	process.exit( 1 );
} );

// Errors inside promises that was not caught
process.on( 'unhandledRejection', function ( error ) {
	handleError( error );
	/* eslint no-process-exit:0 */
	process.exit( 1 );
} );

server
	.then( function ( instantiatedServer ) {
		console.log( 'Server running at:' + instantiatedServer.info.uri );
	} )
	.catch( function ( error ) {
		throw error;
	} );
