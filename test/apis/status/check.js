'use strict';

const helper = require( '../../helper' );
const _      = require( 'lodash' );

require( 'should' );

describe( 'Get all status: /api/v1/status', function () {
	let response;

	before( function ( done ) {
		let options = {
			'method' : 'GET',
			'url'    : '/api/v1/status'
		};

		helper.fetch( options, function ( reply ) {
			response = reply;
			done();
		} );
	} );

	it( '-- should return 204', function () {
		response.statusCode.should.equal( 204 );
	} );
} );
