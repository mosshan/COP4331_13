
exports.setApp = function ( app, client)
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
      const bcrypt = require('bcrypt');
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, async function(err, hash) {
        const newUser = {username:userName, password:hash, email:email, /*firstName:firstName, lastName:lastName,*/ isVerified:false};
        var error = '';
        try
        {
          const db = client.db();
          const results = await db.collection('Users').find({username:userName}).toArray();

          if (results.length > 0){
            error = "Username already taken.";
          } else {
            const result = db.collection('Users').insertOne(newUser);
            const user = {username:userName, email:email};
            sendVerificationEmail(user);
          }
        }
        catch(e)
        {
          error = e.toString();
        }

        var ret = { error: error };
        res.status(200).json(ret);
      });
      
    });
    
    app.post('/api/login', async (req, res, next) => 
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
      const bcrypt = require('bcrypt');
      const { login, password } = req.body;

        

      var error = '';
      var id = -1;
      var fn = '';
      var ln = '';
      var username = '';
      var isVerified = false;

      try{
        const db = client.db();
        const results = await db.collection('Users').find({username:login}).toArray();

        if (results.length > 0){
          var hash = results[0].password;
          const match = await bcrypt.compare(password, hash);
          if (match){
            id = results[0]._id;
            username = results[0].username;
            isVerified = results[0].isVerified;
          } else {
            error = "invalid username or password";
          }

        }else {
          error = "invalid username or password";
        }
        }catch (e){
          error = e.toString;
        }

        var ret = { id:id, /*firstName: fn, lastName: ln,*/ username:username, isVerified:isVerified, error:error};
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
      var ratingAverage = 0
      if(result != null){
        try{
          const db = client.db();
          
          const results = await db.collection('Ratings').find({spot_id:ospot_id}).toArray();
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
      
      var ret = {error:error, average:ratingAverage};
      res.status(200).json(ret);
    });

    app.get('/api/verify/:token', async (req, res, next) => 
    {
      jwt = require('jsonwebtoken');
      const db = client.db();
      const EMAIL_KEY = process.env.EMAIL_KEY;
      var error = ''
      try{
        const {username, email} = jwt.verify(req.params.token, EMAIL_KEY)
        await db.collection('Users').updateOne({username:username, email:email},{$set:{isVerified:true}});
        console.log('email verified');
      }catch (e){
        error = e.toString();
      }
      res.redirect('https://study-knights.herokuapp.com/login');
    });

    app.post('/api/sendVerification', async (req, res, next) => 
    {
      db = client.db();
      var error = '';
      const {username, email} = req.body;
      var results = null;
      try{
        results = await db.collection('Users').find({username:username,email:email}).toArray();
        if (results.length > 0){
          const user = {username:username,email:email};
          sendVerificationEmail(user);
        } else {
          error = "username or email not found"
        }
      } catch (e){
        error = e.toString();
      }
      
      var ret = {error:error};
      res.status(200).json(ret);
    });
    
    app.post('/api/requestReset', async (req, res, next) => 
    {
      db = client.db();
      var error = '';
      const {username, email} = req.body;
      var results = null;
      try{
        results = await db.collection('Users').find({username:username,email:email}).toArray();
        if (results.length > 0){
          const user = {username:username,email:email};
          sendResetEmail(user);
        } else {
          error = "username or email not found"
        }
      } catch (e){
        error = e.toString();
      }
      
      var ret = {error:error};
      res.status(200).json(ret);
    });

    app.post('/api/passwordReset', async (req, res, next) => 
    {
      db = client.db();
      jwt = require('jsonwebtoken');
      bcrypt = require('bcrypt');

      var error = '';
      const {token, password} = req.body
      const EMAIL_KEY = process.env.EMAIL_KEY;
      const hash = await bcrypt.hash(password, 10);

      var results = null;
      try{
        const {username, email} = jwt.verify(token, EMAIL_KEY)
        await db.collection('Users').updateOne({username:username, email:email},{$set:{password:hash}});
      } catch (e){
        error = e.toString();
      }
      
      var ret = {error:error};
      res.status(200).json(ret);
    });
}

function sendVerificationEmail(user){
  const jwt = require('jsonwebtoken');
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const EMAIL_KEY = process.env.EMAIL_KEY;

  const token = jwt.sign(user, EMAIL_KEY, {expiresIn: '1d'});

  const userurl = `https://study-knights.herokuapp.com/api/verify/${token}`;
  
  const msg = {
    to: user.email,
    from: 'cop4331.group13@gmail.com', 
    subject: 'Please verify your email',
    html: `Please click this email to confirm your email: <a href="${userurl}">${userurl}</a>`
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

function sendResetEmail(user){
  const jwt = require('jsonwebtoken');
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const EMAIL_KEY = process.env.EMAIL_KEY;

  const token = jwt.sign(user, EMAIL_KEY, {expiresIn: '1d'});

  const userurl = `https://study-knights.herokuapp.com/reset/${token}`;
  
  const msg = {
    to: user.email,
    from: 'cop4331.group13@gmail.com', 
    subject: 'Password Reset Request',
    html: `Please click this link to reset your password: <a href="${userurl}">${userurl}</a>`
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

