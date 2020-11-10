
exports.setApp = function ( app, client )
{

    app.post('/api/register', async (req, res, next) =>
    {
      // incoming: userName, Password, Email, FirstName, LastName
      // outgoing: error
      console.log(req.body);  
      const { userName, password, email, firstName, lastName } = req.body;
      console.log(req.body);
    
      //const newUser = {Card:card,UserId:userId};
      const newUser = {userName:userName, password:password, email:email, firstName:firstName, lastName:lastName, isVerified:0};
      var error = '';
      console.log(newUser);
    
      try
      {
        const db = client.db();
        const results = await db.collection('Users').find({userName:userName}).toArray();
        console.log(results);

        if (results.length > 0){
          error = "Username already taken.";
        } else {
          const result = db.collection('Users').insertOne(newUser);
        }
      }
      catch(e)
      {
        error = e.toString();
      }
    
      
    
      var ret = { error: error };
      res.status(200).json(ret);
    });
    
    app.post('/api/login', async (req, res, next) => 
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error

        

        var error = '';

        const { login, password } = req.body;

        const db = client.db();
        const results = await db.collection('Users').find({username:login,password:password}).toArray();

        console.log(results);
        

        var id = -1;
        var fn = '';
        var ln = '';
        var username = '';

        if( results.length > 0 )
        {
            id = results[0]._id;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            username = results[0].username
        }

        var ret = { id:id, firstName: fn, lastName: ln, username:username, error:''};
        res.status(200).json(ret);
    });
    
    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error
    
      var error = '';
    
      const { userId, search } = req.body;
    
      var _search = search.trim();
      
      const db = client.db();
      const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
      
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i].Card );
      }
      
      var ret = {results:_ret, error:error};
      res.status(200).json(ret);
    });

    app.post('/api/fetchSpots', async (req, res, next) => 
    {
      // incoming: place id
      // outgoing: results[], error
    
      var ObjectId = require('mongodb').ObjectId;
      var error = '';
    
      const {place_id} = req.body;
      console.log(place_id);
      var object_id = new ObjectId(place_id);
      console.log(object_id);
    
      
      const db = client.db();
      const results = await db.collection('StudySpots').find({place_id:object_id}).toArray();
      console.log(results);
      
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i] );
      }
      
      var ret = {results:_ret, error:error};
      res.status(200).json(ret);
    });
    
}