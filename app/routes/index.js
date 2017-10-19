const shortcutRoutes = require('./shortcut.routes');
const auth = require('./auth.routes'); 
 	
module.exports = function( app , db) {
	
	app.all('/api/v1/account/*', [require('../middlewares/authMiddleware')]);
	shortcutRoutes(app,db);
	auth(app,db);

	app.get('/api/v1/account/test' , (req,res)=> {
		return res.send("Hello world");
	})
	// add other routes here 
}