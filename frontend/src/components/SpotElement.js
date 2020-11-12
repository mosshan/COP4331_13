import React from 'react';
import './CSS/spots.css';
import Rating from '@material-ui/lab/Rating';

class Spot extends React.Component
{
   constructor(props) {
      super(props);
      this.state = {
         value:props.rating,
         name: props.name,
         rated: false,
         disabled: this.setDisabled(),
         ratingMessage: this.setInitMessage(),
      };
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
      try {
         let id = (JSON.parse(localStorage.user)).id;
         if (id != -1 || !this.state.rated) {
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

   

   render() {
      return(
         <div >
            <div className="spot-item" onLoad={this.setDisabled}>
               <text id="name" className="spot-name" >{this.state.name}</text>
               <div id="rating-container" className="rating-container">
               
                  <Rating id="rating-mech" className="rating-stars"
                     value={this.state.value}
                     onChange={(event, newValue) => {
                        this.setState({value: newValue});
                        console.log('hello world value of ' + this.state.name + ' is now ' + newValue);
                        this.setState({rated: true, disabled: true});
                        this.setState({ratingMessage:<text>Rating Submitted!</text>})
                        // Call API
                        // Increment number of ratings and disable stars
                     }}
                     precision={0.5}
                     disabled={this.state.disabled}
                  />
                  <text>(47)</text>
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