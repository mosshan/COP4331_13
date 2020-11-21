import React from 'react';
import './CSS/spots.css';
import Rating from '@material-ui/lab/Rating';

const app_name = 'study-knights'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

class Spot extends React.Component
{
   constructor(props) {
      super(props);
      this.state = {
         id:props.id,
         value:props.rating,
         name: props.name,
         numRatings: props.numRatings,
         rated: false,
         disabled: true,
         ratingMessage: this.setInitMessage(),
         avgRating: props.rating,
      };
   }

   componentDidMount = () => {
      this.setDisabled();
   }

   setInitMessage = function() {
      let id;
      try {
         id = JSON.parse(localStorage.user).id;
      }
      catch(e)
      {
         id = 0;
      }

      if (id == -1) {
         return (<text>Log In to rate study spots!</text>);
      }
      else {
         return (<text>Click the stars to rate a study spot!</text>);
      }
   }

   setRatingMessage = function() {
      // If user not logged in show disabled message disable stars
      // Else If user already rated item show message disable stars
      // Else allow user to set rating and submit on click   
      if (this.state.rated) {
         this.setState({ratingMessage:<text>Rating Submitted!</text>})   
      }
      else if (this.state.disabled) {
         this.setState({ratingMessage:<text>Log In to rate study spots!</text>})   
      }
      else {
         this.setState({ratingMessage:<text>Click the stars to rate a study spot!</text>})
      }
   }


   setDisabled = function() {
      console.log(localStorage);
      try {
         let id = (JSON.parse(localStorage.user)).id;
         if (id != -1 && !this.state.rated) {
            this.setState({disabled: false});
         }
         else {
            this.setState({disabled: true});
         }
      }     
      catch(e) {
         console.log(e.toString());
         this.setState({disabled: true});
      }
   }

   submitRating = async (newValue) => {
      let id;
      try {
         id = JSON.parse(localStorage.user).id;
      }
      catch(e)
      {
         id = 0;
      }

      var obj = {spot_id: this.state.id, user_id: id, rating: newValue};
      var js = JSON.stringify(obj);

      console.log(js);
      console.log(localStorage);
      try
      {    
         const response = await fetch(buildPath('api/rate'),
               {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
         var res = JSON.parse(await response.text());
         
         console.log(res);
         if (res.error != '')
         {
               console.log(res.error);
               return false;
         }
         if (res.average != 'undefined')
         {
            this.setState({avgRating:res.average});
         }
         return true;

      }
      catch(e)
      {
         alert(e.toString());
         return false;
      } 
   }

  

   render() {
      return(
         <div >
            <div className="spot-item">
               <div className="spot-title-container">
                  <text id="name" className="spot-name" >{"Room " + this.state.name}</text>
                  <text className="spot-rating">{"Avg: " + this.state.avgRating.toFixed(2)}</text>
               </div>
               <div id="rating-container" className="rating-container">
               
                  <Rating id="rating-mech" className="rating-stars"
                     value={this.state.value}
                     onChange={(event, newValue) => {
                        this.setState({value: newValue});
                        console.log('hello world value of ' + this.state.name + ' is now ' + newValue);
                        this.setState({rated: true, disabled: true});
                        this.setState({ratingMessage:<text>Rating Submitted!</text>})
                        console.log(this.state.id);
                        this.submitRating(newValue);
                     }}
                     precision={0.5}
                     disabled={this.state.disabled}
                  />
                  {/* <text>{this.state.numRatings}</text> */}
               </div>
               {this.state.ratingMessage}
            </div>
            
            {/* {isOpen && <Popup name={props.name} rating={props.rating} handleClose={togglePopup} />} */}
            {/* <Popup name={props.name} rating={props.rating} handleClose={togglePopup} /> */}
            
         </div>
      );
      
   }
};

export default Spot;