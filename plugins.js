'use strict';

const config = require( './config' );

module.exports = [
	require( 'inert' ),
	require( 'vision' ),
	{
		'register' : require( 'hapi-swagger' ),
		'options'  : config.swagger.options
	},

  require( './apis/status' )
];
