var ObjectID = require('mongodb').ObjectID;


module.exports = function (app,db) {
	
	app.get('/api/v1/shortcuts' , (req,res)=> {
		
		db.collection('shortcuts').find({}).toArray(function(error, items) {
			if (error) {
				res.send({'error' :`An error has occured while retreving the shortcuts `});
			} else {
				res.send(items);	
			}

		});

	})

	app.get('/api/v1/shortcuts/:id' , (req,res)=> {
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

	app.post('/api/v1/account/shortcuts' , (req,res) => {
		const shortcut = {
			buttons : req.body.buttons,
			description : req.body.description,
			maker : req.body.maker, 
			rates : req.body.rates,
			views : req.body.views,
			gif : req.body.gif
		};

		db.collection('shortcuts').insert(shortcut , (err,result)=> {
			if(err) {
				res.send({'error' : 'An error has occurred while inserting the shortcut '});
			} else {
				res.send(result.ops[0]);
			}

		})
	})

	app.put('/api/v1/account/shortcuts/:id' , (req,res) => {
		const shortcut = {
			buttons : req.body.buttons,
			description : req.body.description,
			maker : req.body.maker, 
			rates : req.body.rates,
			views : req.body.views,
			gif : req.body.gif
		};
		const id = req.params.id;
		const _id = {'_id' : new ObjectID(id) };

		db.collection('shortcuts').updateOne(  _id ,shortcut ,  (err,result)=> {
			if(err) {
				res.send({'error' : 'An error has occurred while updating the shortcut '});
			} else {
				res.send(Object.assign({} , shortcut , {_id : id }));
			}

		})
	})

	app.delete('/api/v1/account/shortcuts/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('shortcuts').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.json({
					"status": 200,
					"message": `shortcut ${id} deleted!`
				});
				
			} 
		});
	});
};