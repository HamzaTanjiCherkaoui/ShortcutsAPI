const shortcutRoutes = require('./shortcut.routes');
const auth = require('./auth.routes'); 
 
module.exports = function( app , db) {
	
	shortcutRoutes(app,db);
	auth(app,db);
	// add other routes here 
}