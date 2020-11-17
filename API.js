
exports.setApp = function ( app, client )
{

  app.post('/api/testemail', async (req, res, next) =>
  {
    sendEmail();
    var error = '';
    var ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/register', async (req, res, next) =>
  {
      // incoming: userName, Password, Email, FirstName, LastName
      // outgoing: error
      const { userName, password, email /*firstName, lastName*/ } = req.body;
    
      //const newUser = {Card:card,UserId:userId};
      const newUser = {username:userName, password:password, email:email, /*firstName:firstName, lastName:lastName,*/ isVerified:false};
      var error = '';
    
      try
      {
        const db = client.db();
        const results = await db.collection('Users').find({username:userName}).toArray();

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
        

        var id = -1;
        var fn = '';
        var ln = '';
        var username = '';

        if( results.length > 0 )
        {
            id = results[0]._id;
            //fn = results[0].FirstName;
            //ln = results[0].LastName;
            username = results[0].username
        }

        var ret = { id:id, /*firstName: fn, lastName: ln,*/ username:username, error:''};
        res.status(200).json(ret);
    });

    app.post('/api/fetchSpots', async (req, res, next) => 
    {
      // incoming: place id
      // outgoing: results[], error
    
      var ObjectId = require('mongodb').ObjectId;
      var error = '';
    
      const {place_id} = req.body;
      
      
    
      
      const db = client.db();
      const results = await db.collection('StudySpots').find({place_id:place_id}).toArray();
      console.log(results);
      
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
        _ret.push( results[i] );
      }
      
      var ret = {results:_ret, error:error};
      res.status(200).json(ret);
    });

    app.post('/api/rate', async (req, res, next) => 
    {
      // incoming: spot_id, user_id, rating (1-5)
      // outgoing: error
    
      var ObjectId = require('mongodb').ObjectId;
      var error = '';
      var result = null;
    
      const {spot_id, user_id, rating} = req.body;
      var ospot_id = new ObjectId(spot_id);
      var ouser_id = new ObjectId(user_id);
    
      
      try
      {
        const db = client.db();
        
        //clean up the update fields
        var find = {user_id:ouser_id, spot_id:ospot_id};
        var update = {$set:{rating:rating}};
        //if no document found then create one
        var options = {upsert:true};
        
        result = await db.collection('Ratings').updateOne(find,update,options)
        //const results = await db.collection('Ratings').find({user_id:ouser_id, spot_id:ospot_id}).toArray();


      }
      catch(e)
      {
        error = e.toString();
      }

      //if we updated we have to update the new average
      if(result != null){
        try{
          const db = client.db();
          
          const results = await db.collection('Ratings').find({spot_id:ospot_id}).toArray();
          console.log(results);
          var ratingsSum = 0;
          for (i=0;i < results.length;i++){
            ratingsSum += results[i].rating;
          }
          ratingAverage = ratingsSum/results.length;
          db.collection('StudySpots').updateOne({_id:ospot_id},{$set:{spot_rating:ratingAverage}});
        }catch(e){
          error = e.toString();
        }
      }
      
      var ret = {error:error};
      res.status(200).json(ret);
    });
    
}

function sendEmail(){
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'kenneth.bicknell15@gmail.com', // Change to your recipient
    from: 'cop4331.group13@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

