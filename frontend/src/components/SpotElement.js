import React from 'react';
import './CSS/spots.css';
import Rating from '@material-ui/lab/Rating';


class Spot extends React.Component
{
   constructor(props) {
      super(props);
      this.state = {
         value:props.rating,
         name: props.name
      };
    }

   // const [value, setValue] = React.useState(props.rating);
   // const [isOpen, setIsOpen] = React.useState(false);
   // const togglePopup = () => {
   //    setIsOpen(!isOpen);
   // }

   render() {
      return(
         <div >
            <button class="spot-item" >
               <text class="spot-name">{this.state.name}</text>
               <Rating
                  value={this.state.value}
                  onChange={(event, newValue) => {
                     this.setState({value: newValue});
                  }}
                  precision={0.5}
               />
               {/* {this.state.rating} */}
            </button>
            {/* {isOpen && <Popup name={props.name} rating={props.rating} handleClose={togglePopup} />} */}
            {/* <Popup name={props.name} rating={props.rating} handleClose={togglePopup} /> */}
            
         </div>
      );
      
   }
};

export default Spot;