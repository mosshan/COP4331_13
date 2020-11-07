import React from 'react';
import './CSS/spots.css';
import Rating from '@material-ui/lab/Rating';

let disabled = true;

function setDisabled() {
   try {
      let id = (JSON.parse(localStorage.user)).id;
      if (id > 0) {
         disabled = false;
         return disabled;
      }
      else {
         disabled = true;
         return disabled; // Disabled
      }
   }     
   catch(e) {
      console.log(e.toString());
      return disabled; // disabled
   }
}

function ratingMessage() {
   // If user not logged in show disabled message disable stars
   // Else If user already rated item show message disable stars
   // Else allow user to set rating and submit on click   
   console.log('Woohoo');
   if (disabled) {
      return (<text>Log In to rate study spots!</text>)      
   }
   else {
      return (<text>Click the stars to rate a study spot!</text>)
   }
}


class Spot extends React.Component
{
   constructor(props) {
      super(props);
      this.state = {
         value:props.rating,
         name: props.name
      };
    }


   submitRating = function() {
      // Call API,
      // Overwrite rating if user has already rated it 
      console.log('submitting value '+ this.state.value + ' stars');
      // Reset state to the new average value
      this.setState({value: 5});
   }

   

   render() {
      return(
         <div >
            <div className="spot-item" >
               <text id="name" className="spot-name" >{this.state.name}</text>
               <div id="rating-container" className="rating-container">
               
                  <Rating id="rating-mech" className="rating-stars"
                     value={this.state.value}
                     onChange={(event, newValue) => {
                        this.setState({value: newValue});
                        console.log('hello world value of ' + this.state.name + ' is now ' + newValue);
                     }}
                     precision={0.5}
                     disabled={setDisabled()}
                  />
                  <text>(47)</text>
               </div>
               {ratingMessage()}
            </div>
            
            {/* {isOpen && <Popup name={props.name} rating={props.rating} handleClose={togglePopup} />} */}
            {/* <Popup name={props.name} rating={props.rating} handleClose={togglePopup} /> */}
            
         </div>
      );
      
   }
};

export default Spot;