module.exports = function (app,db) {

	app.post('/shortcuts' , (req,res) => {
		const shortcut = {
			buttons : ["chtr" , "A"] ,
			description : "description " ,
			maker : "lorem ipsum" , 
			rates : 2,
			views : 12,
			gif : "/test.gif" };
			db.collection('shortcuts').insert(shortcut , (err,result)=> {
				if(err) {
					res.send({'error' : 'An error has occurred'});
				} else {
					res.send(result.ops[0]);
				}

			})
		})

	app.get('/shortcuts' , (req,res)=> {
		res.send('Hello');
	})
};