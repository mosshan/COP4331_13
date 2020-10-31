import React from 'react';
import ReactDOM from 'react-dom';
import ImageMapper from 'react-image-mapper';
import image from '../images/ucfMap.png';
import './CSS/map.css';

var MAP = {
	name: "my-map",
	areas: [
    {
		name: "Classroom Building 1",
		coords: [838,284,887,284,887,320,838,320],
    },
    {
		name: "Classroom Building 2",
		coords: [910,218,958,218,958,253,910,253],
    },
    {
		name: "Health and Public Affairs",
		coords: [1181,453,1238,453,1238,488,1181,488],
    },
    {
		name: "Health and Public Affairs 2",
		coords: [1170,307,1235,307,1235,342,1170,342],
	}
	]
};

function f() {
	MAP.areas.forEach(obj => {
		obj.shape = "poly";
		obj.preFillColor = "transparent";
		obj.strokeColor = "transparent";
		obj.fillColor = "rgb(255,255,0,0.3)";
	});
};
f();

class Map extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			hoveredArea: null,
			msg: null,
			moveMsg: null,
		};

	}


	getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	};
	load() {
		this.setState({ msg: "Interact with image !" });
	};
	clicked(area) {
		this.setState({
			msg: `You clicked on ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
		localStorage.location = area.name;
		window.location.href = '/study';
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
			msg: `You left ${area.shape} ${area.name} at coords ${JSON.stringify(
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
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

export default Map;