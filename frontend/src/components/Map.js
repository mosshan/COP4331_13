import React from 'react';
import ReactDOM from 'react-dom';
import ImageMapper from 'react-image-mapper';
import image from '../images/ucfMap.png';
import './CSS/map.css';

var MAP = {
	name: "my-map",
	areas: [
	// 	{
	// 		name: "NSC",
	// 		shape: "poly",
	// 		coords: [452,270,580,213,631,213,631,403,452,403],
    //   preFillColor: "transparent",
    //   strokeColor: "transparent",
	// 		fillColor: "rgb(255,00,255,0.3)"
	// 	},
	// 	{
	// 		name: "VAB",
	// 		shape: "poly",
	// 		coords: [382,440,654,436,654,517,382,517],
    //   preFillColor: "transparent",
    //   strokeColor: "transparent",
    //   fillColor: "rgb(255,00,255,0.3)"
    // },
    {
			name: "CB1_Tag",
			shape: "poly",
			coords: [838,284,887,284,887,320,838,320],
      preFillColor: "transparent",
      strokeColor: "transparent",
      fillColor: "rgb(255,00,255,0.3)"
    },
    {
			name: "CB2_Tag",
			shape: "poly",
			coords: [910,218,958,218,958,253,910,253],
      preFillColor: "transparent",
      strokeColor: "transparent",
      fillColor: "rgb(255,00,255,0.3)"
    },
    {
			name: "HPA1_Tag",
			shape: "poly",
			coords: [1181,453,1238,453,1238,488,1181,488],
      preFillColor: "transparent",
      strokeColor: "transparent",
      fillColor: "rgb(255,00,255,0.3)"
    },
    {
			name: "HPA2_Tag",
			shape: "poly",
			coords: [1170,307,1235,307,1235,342,1170,342],
      preFillColor: "transparent",
      strokeColor: "transparent",
      fillColor: "rgb(255,00,255,0.3)"
		},
		// {
		// 	name: "3",
		// 	shape: "poly",
		// 	coords: [381, 241, 383, 94, 462, 53, 457, 282],
		// 	preFillColor: "yellow", // this is mandatory for stroke color to work
		// 	lineWidth: 10,
		// 	strokeColor: "#6afd09"
		// },
		// {
		// 	name: "4",
		// 	shape: "poly",
		// 	coords: [245, 285, 290, 285, 274, 239, 249, 238],
		// 	preFillColor: "rgb(255,255,255,0.3)"
		// },
		// {
		// 	name: "5",
		// 	shape: "circle",
		// 	coords: [170, 100, 25],
		// 	preFillColor: "rgb(255,255,255,0.3)",
		// 	lineWidth: 2
		// },
		// {
		// 	name: "6",
		// 	shape: "rect",
		// 	coords: [270, 100, 200, 50],
		// 	lineWidth: 2,
		// 	preFillColor: "rgba(255, 255, 255, 0.3)",
		// 	strokeColor: "#6afd09"
		// }
	]
};

// var URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";


// const App = () => {

//   return (
//     <div>
//       <h1>Hello World!</h1>
//       <ImageMapper src={image} width="500" />
//     </div>
//   )
// }


// ReactDOM.render(<App />, document.getElementById('root'))

class Map extends React.Component
{
	getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	};
	load() {
		this.setState({ msg: "Interact with image !" });
	};
	clicked(area) {
		this.setState({
			msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	};
	clickedOutside(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
		});
	};
	moveOnImage(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
		});
	};
	enterArea(area) {
		this.setState({
			hoveredArea: area,
			msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	};
	leaveArea(area) {
		this.setState({
			hoveredArea: null,
			msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	};
	moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on ${area.shape} ${
				area.name
			} at coords ${JSON.stringify(coords)} !`
		});
	};

	getTipPosition(area) {
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
	};

	render() {
		return (
            <div class="map-style">
                <div className="grid">
                    <div className="presenter">
                        <div style={{ position: "relative" }}>
                            <ImageMapper
                                src={image}
                                map={MAP}
                width={1000}
                imgWidth={1688}
                                onLoad={() => this.load()}
                                onClick={area => this.clicked(area)}
                                onMouseEnter={area => this.enterArea(area)}
                                onMouseLeave={area => this.leaveArea(area)}
                                onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                                onImageClick={evt => this.clickedOutside(evt)}
                                onImageMouseMove={evt => this.moveOnImage(evt)}
                                lineWidth={4}
                                strokeColor={"white"}
                            />
                            {/* {this.state.hoveredArea && (
                                <span
                                    className="tooltip"
                                    style={{ ...this.getTipPosition(this.state.hoveredArea) }}
                                >
                                    {this.state.hoveredArea && this.state.hoveredArea.name}
                                </span>
                            )} */}
                        </div>
                        <pre className="message">
                            {/* {this.state.msg ? this.state.msg : null} */}
                        </pre>
                        {/* <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre> */}
                    </div>
                </div>
            </div>
		);
	}
};

export default Map;