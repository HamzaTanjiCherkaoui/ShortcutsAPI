var jwt = require('jwt-simple');
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {

  app.post('/sign-up' ,(req,res) => {

    var username = req.body.username || '';
    var password = req.body.password || '';
    var email = req.body.email || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "no credentials where posted "
      });
      return;
    }

    var user = { username : username ,password : password , email : email , active : false };

    // check if there is already the user

    db.collection('users').insert(user , (err,result)=> {
      if(err) {
        res.send({'error' : 'An error has occurred while inserting the user '});
      } else {
        res.send(result.ops[0]);
      }

    });

  });
  app.post('/login' ,(req,res)=>{

    var username = req.body.username || '';
    var password = req.body.password || '';
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = validate(username, password);

    db.collection('users').findOne({username : username , password}, (err,user)=> {
      if(err) {
        res.send({'error' :`An error has occured while getting the user `});
      } else {
        if(!user) {

          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
          return;

        }
        else {

          res.json(genToken(user));

        }
      }
    })

  });


};

function validate (username, password) {

    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };

    return dbUserObj;
  }
  function validateUser (username) {
    // spoofing the DB response for simplicity
    
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };

    return dbUserObj;
  }

  function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
