var ObjectID = require('mongodb').ObjectID;


module.exports = function (app,db) {
	
	app.get('/shortcuts' , (req,res)=> {
		
		db.collection('shortcuts').find({}).toArray(function(error, items) {
			if (error) {
				res.send({'error' :`An error has occured while retreving the shortcuts `});
			} else {
				res.send(items);	
			}

		});

	})

	app.get('/shortcuts/:id' , (req,res)=> {
		const id = req.params.id;
		const details = {'_id' : new ObjectID(id) };
		db.collection('shortcuts').findOne(details, (err,item)=> {
			if(err) {
				res.send({'error' :`An error has occured while retreving the shortcut ${id} `});
			} else {
				res.send(item);
			}
		})

	})

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
					res.send({'error' : 'An error has occurred while inserting the shortcut '});
				} else {
					res.send(result.ops[0]);
				}

			})
		})

	app.delete('/shortcuts/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('shortcuts').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(`shortcut ${id} deleted!`);
			} 
		});
	});
};