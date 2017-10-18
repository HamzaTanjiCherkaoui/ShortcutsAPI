const shortcutRoutes = require('./shortcut.routes');
 
module.exports = function( app , db) {
	shortcutRoutes(app,db);
	// add other routes here 
}