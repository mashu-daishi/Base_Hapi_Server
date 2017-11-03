'use strict';

module.exports = {
  'method' : 'GET',
	'path'   : '/v1/status',
  'config' : {
    'auth'        : false,
  	'description' : 'Simple check to see if gateway is up and running',
  	'tags'        : [ 'api', 'system', 'status' ],
  	'validate'    : {},

  	'handler' : ( request, reply ) => {
  		reply().code( 204 );
  	}
  }
};
