var ObjectID = require('mongodb').ObjectID;

const API_BASE = '/api/v1';

module.exports = function (app,db) {
	
	app.get(`${API_BASE}/shortcuts` , (req,res)=> {
		
		db.collection('shortcuts').find({},{buttons : 1 }).toArray(function(error, items) {
			if (error) {
				res.send({'error' :`An error has occured while retreving the shortcuts `});
			} else {
				res.send(items);	
			}
		});
	})

	app.get(`${API_BASE}/shortcuts/:id` , (req,res)=> {
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
	app.post(`${API_BASE}/account/shortcuts` , (req,res) => {
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

	app.put(`${API_BASE}/account/shortcuts/:id` , (req,res) => {
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

	app.delete(`${API_BASE}/account/shortcuts/:id`, (req, res) => {
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