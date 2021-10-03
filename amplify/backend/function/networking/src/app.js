'use strict';

const
    express                        = require( 'express' ),
    bodyParser                     = require( 'body-parser' ),
    awsServerlessExpressMiddleware = require( 'aws-serverless-express/middleware' );

const app = express();

app.use( bodyParser.json() );
app.use( awsServerlessExpressMiddleware.eventContext( {
    reqPropKey: 'event'
} ) );

app.use( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Headers', '*' );
    next();
} );

app.get( '/networking', function( req, res ) {
    // Add your code here
    return res
        .status( 200 )
        .json( { message: req.event.requestContext.identity.sourceIp } );
} );

app.get( '/networking/*', function( req, res ) {
    // Add your code here
    res.json( { success: 'get call succeed!', url: req.url } );
} );

/****************************
 * Example post method *
 ****************************/

app.post( '/networking', function( req, res ) {
    // Add your code here
    res.json( { success: 'post call succeed!', url: req.url, body: req.body } );
} );

app.post( '/networking/*', function( req, res ) {
    // Add your code here
    res.json( { success: 'post call succeed!', url: req.url, body: req.body } );
} );

/****************************
 * Example put method *
 ****************************/

app.put( '/networking', function( req, res ) {
    // Add your code here
    res.json( { success: 'put call succeed!', url: req.url, body: req.body } );
} );

app.put( '/networking/*', function( req, res ) {
    // Add your code here
    res.json( { success: 'put call succeed!', url: req.url, body: req.body } );
} );

/****************************
 * Example delete method *
 ****************************/

app.delete( '/networking', function( req, res ) {
    // Add your code here
    res.json( { success: 'delete call succeed!', url: req.url } );
} );

app.delete( '/networking/*', function( req, res ) {
    // Add your code here
    res.json( { success: 'delete call succeed!', url: req.url } );
} );

app.listen( 3000, function() {
    console.log( 'App started' );
} );

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
