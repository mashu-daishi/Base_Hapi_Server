'use strict';

var Table  = require( 'cli-table' );

require( 'colors' );

var watermarks = require( './watermarks' );

module.exports = function log () {
	var table = new Table( {
		'head' : [ 'Metric'.white.bold, 'Warning'.yellow.bold, 'Error'.red.bold ]
	} );

	table.push( [ 'Branches', watermarks.branches[ 1 ].toString().yellow, watermarks.branches[ 0 ].toString().red ] );
	table.push( [ 'Functions', watermarks.functions[ 1 ].toString().yellow, watermarks.functions[ 0 ].toString().red ] );
	table.push( [ 'Lines', watermarks.lines[ 1 ].toString().yellow, watermarks.lines[ 0 ].toString().red ] );
	table.push( [ 'Statements', watermarks.statements[ 1 ].toString().yellow, watermarks.statements[ 0 ].toString().red ] );

	console.log( 'Coverage thresholds'.white.bold );
	console.log( table.toString() );
};
