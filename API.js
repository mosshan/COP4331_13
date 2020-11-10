
exports.setApp = function ( app, client )
{

    app.post('/api/addcard', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, card } = req.body;
    
      const newCard = {Card:card,UserId:userId};
      var error = '';
    
      try
      {
        const db = client.db();
        const result = db.collection('Cards').insertOne(newCard);
      }
      catch(e)
      {
        error = e.toString();
      }
    
      cardList.push( card );
    
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
        console.log(ret);
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
    
}