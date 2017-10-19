const shortcutRoutes = require('./shortcut.routes');
const auth = require('./auth.routes'); 
 
module.exports = function( app , db) {
	shortcutRoutes(app,db);
	app.post('/login',auth.login);
	// add other routes here 
}