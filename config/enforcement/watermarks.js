'use strict';

var thresholds = require( './thresholds' );

module.exports = {
	'branches'   : [ thresholds.each.branches, Math.round( Math.min( 100, thresholds.each.branches * 1.1 ) * 100 ) / 100 ],
	'functions'  : [ thresholds.each.functions, Math.round( Math.min( 100, thresholds.each.functions * 1.1 ) * 100 ) / 100 ],
	'lines'      : [ thresholds.each.lines, Math.round( Math.min( 100, thresholds.each.lines * 1.1 ) * 100 ) / 100 ],
	'statements' : [ thresholds.each.statements, Math.round( Math.min( 100, thresholds.each.statements * 1.1 ) * 100 ) / 100 ]
};
