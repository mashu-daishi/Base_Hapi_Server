'use strict';

const env     = process.env;
const _       = require( 'lodash' );
const pkgjson = require( '../package.json' );

let config = {
	'environment' : env.LOCAL_ENV || 'development',

	'api' : {
		'connection' : {
			'port' : 4000,

			'routes' : {
				'cors' : {
					'origin'  : [ '*' ],
					'headers' : [ 'Authorization', 'Content-Type', 'If-None-Match', 'x-engine-id', 'x-engine-secret', 'accept' ]
				}
			}
		},

		'options' : {
			'routes' : {
				'prefix' : '/api'
			}
		}
	},

	'swagger' : {
		'options' : {
			'pathPrefixSize' : 3
		}
	},

	'test' : {
		'server' : {
			'host' : env.TEST_HOST || 'http://localhost',
			'port' : env.TEST_HOST_PORT || 4000
		}
	}
};

module.exports = config;
