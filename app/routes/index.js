const shortcutRoutes = require('./shortcut.routes');
const auth = require('./auth.routes'); 
 	
module.exports = function( app , db) {
	
	app.all('/api/v1/account/*', [require('../middlewares/authMiddleware')]);
	shortcutRoutes(app,db);
	auth(app,db);

	// add other routes here 
}