import React from 'react';
import ReactDOM from 'react-dom';
import ImageMapper from 'react-image-mapper';
import image from '../images/ucfMap.png';
import getSpots from './FetchSpots';
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
	},
	{
		name: "Psychology",
		coords: [933,138,985,138,985,173,933,173],
	},
	{
		name: "CSEL",
		coords: [1021,81,1071,81,1071,117,1021,117],
	},
	{
		name: "Alumni Center",
		coords: [1064,16,1124,16,1124,52,1064,52],
	},
	{
		name: "Engineering 1",
		coords: [1056,614,1115,614,1115,650,1056,650],
	},
	{
		name: "Engineering 2",
		coords: [1129,558,1198,558,1198,594,1129,594],
	},
	{
		name: "CREOL",
		coords: [1324,590,1390,590,1390,626,1324,626],
	},
	{
		name: "Harris Engineering Center",
		coords: [1229,679,1282,679,1282,715,1229,715],
	},
	{
		name: "Business Administration 1",
		coords: [992,641,1037,641,1037,678,992,678],
	},
	{
		name: "Business Administration 2",
		coords: [1106,686,1160,686,1160,724,1106,724],
	},
	{
		name: "Student Union",
		coords: [859,533,923,533,923,570,859,570],
	},
	{
		name: "College of Sciences",
		coords: [911,669,960,669,960,705,911,705],
	},
	{
		name: "Tech Commons 1",
		coords: [930,782,976,782,976,821,930,821],
	},
	{
		name: "Tech Commons 2",
		coords: [853,720,900,720,900,757,853,757],
	},
	{
		name: "Math and Science",
		coords: [825,830,879,830,879,867,825,867],
	},
	{
		name: "Chemistry",
		coords: [942,840,1011,840,1011,878,942,878],
	},
	{
		name: "Theatre",
		coords: [1003,734,1043,734,1043,772,1003,772],
	},
	{
		name: "Biology",
		coords: [1098,763,1142,763,1142,801,1098,801],
	},
	{
		name: "Arboretum",
		coords: [1448,727,1499,727,1499,763,1448,763],
	},
	{
		name: "Health Center",
		coords: [1047,873,1088,873,1088,909,1047,909],
	},
	{
		name: "Psychological Services",
		coords: [1109,866,1169,866,1169,902,1109,902],
	},
	{
		name: "Physical Sciences",
		coords: [1213,837,1260,837,1260,874,1213,874],
	},
	{
		name: "Libra Community Center",
		coords: [1066,952,1111,952,1111,988,1066,988],
	},
	{
		name: "Ferrell Commons",
		coords: [989,1055,1021,1055,1021,1092,989,1092],
	},
	{
		name: "John T. Washington Center",
		coords: [727,663,794,663,794,700,727,700],
	},
	{
		name: "Library",
		coords: [663,775,708,775,708,812,663,812],
	},
	{
		name: "Burnett Honors College",
		coords: [688,504,739,504,739,541,688,541],
	},
	{
		name: "Rehearsal Hall",
		coords: [678,600,721,600,721,636,678,636],
	},
	{
		name: "Howard Phillips Hall",
		coords: [543,788,598,788,598,824,543,824],
	},
	{
		name: "Millican Hall",
		coords: [596,925,639,925,639,962,596,962],
	},
	{
		name: "Trevor Colbourn Hall",
		coords: [494,654,549,654,549,691,494,691],
	},
	{
		name: "Teaching Academy",
		coords: [365,930,401,930,401,967,365,967],
	},
	{
		name: "Education Department",
		coords: [373,779,411,779,411,816,373,816],
	},
	{
		name: "Performing Arts Center",
		coords: [244,533,287,533,287,571,244,571],
	},
	{
		name: "Visual Arts Building",
		coords: [471,413,524,413,524,451,471,451],
	},
	{
		name: "Nicholson School of Communication",
		coords: [451,268,504,268,504,303,451,303],
	},
	{
		name: "Arts and Humanities",
		coords: [579,213,631,213,631,250,579,250],
	},
	]
};

function f() {
	let index = 0;
	MAP.areas.forEach(obj => {
		obj.shape = "poly";
		obj.preFillColor = "transparent";
		obj.strokeColor = "transparent";
		obj.fillColor = "rgb(255,255,0,0.3)";
		obj.id = index++;
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
		localStorage.locationId = area.id;
		// localStorage.currentSpots = getSpots(area.id);
		console.log(localStorage)
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
            <div className="map-style">
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
