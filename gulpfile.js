'use strict';

/* eslint no-process-exit:0 */
const del          = require( 'del' );
const gulp         = require( 'gulp' );
const mocha        = require( 'gulp-mocha' );
const istanbul     = require( 'gulp-istanbul' );
const childprocess = require( 'child_process' );
const npmi         = require( 'npmi' );
const path         = require( 'path' );
const argv         = require( 'yargs' ).argv;

const enforcement  = require( './config/enforcement' );

let mochaOptions = {
	'ui'       : 'bdd',
	'reporter' : 'spec',
	'bail'     : true,
	'timeout'  : 5000,

	'globals' : {
		'should' : require( 'should' )
	}
};

let paths = {
	/**
	* For unit tests
	*/
	'test'     : [ 'test/**/*.js' ],
	'coverage' : 'instrumented',
	'cover'    : [
		'apis/**/*.js'
	],
};

gulp.task( 'clean-coverage', function () {
	del( [ paths.coverage ] );
} );

gulp.task( 'test', [ 'clean-coverage' ], function () {
	process.env.TEST_ENV = 1;

	let integrationPath = paths.test;

	if ( argv.service ) {
		integrationPath = paths.test + argv.service + '/**/*.js';
	}

	let integrationThresholds = {
		'global' : {
			'branches'   : 50,
			'functions'  : 80,
			'lines'      : 70,
			'statements' : 70
		},

		'each' : {
			'branches'  : 50,
			'functions' : 50
		}
	};

	gulp.src( paths.cover, { 'read' : true } )

		.pipe( istanbul( { 'includeUntested' : true } ) )
		.pipe( istanbul.hookRequire() )

		.on( 'finish', function () {
			let server = require( './boot' );

			server
				.then( function () {
					gulp
						.src( integrationPath, { 'read' : false } )
						.pipe(
							mocha( mochaOptions )
								.on( 'error', function ( mochaError ) {
									console.log( 'mocha error ' + mochaError.stack );
									process.exit( 1 );
								}
						) )
						.pipe( istanbul.writeReports( {
							'dir'       : paths.coverage,
							'reporters' : enforcement.reporters,

							'reportOpts' : {
								'dir'        : paths.coverage,
								'watermarks' : enforcement.watermarks
							}
						} ) )

						.pipe( istanbul.enforceThresholds( { 'thresholds' : integrationThresholds } )
							.on( 'error', function () {
								console.log( 'error - coverage enforcer' );
								enforcement.log();

								process.exit( 1 );
							} ) )

						.once( 'error', function () {
							process.exit( 1 );
						} )
						.once( 'end', function () {
							enforcement.log();
							process.exit( 0 );
						} );
				} )
				.catch( function ( error ) {
					throw error;
				} );
		} );
} );
