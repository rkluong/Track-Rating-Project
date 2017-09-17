import React, { Component } from 'react';
import {Grid, Row, Col, Glyphicon, FormGroup, Radio, Button} from 'react-bootstrap';
import Slider from 'react-rangeslider';
import * as sessionStorage from './utils/SessionStorage';
import 'react-rangeslider/lib/index.css';
import './mystyle.css';

class Corner extends Component {
	constructor(props){
		super(props);
		this.clearClick = this.clearClick.bind(this);
		let text = "Corner";
		const query = props.location.query;
		let cornerMode = true;
		var rating = {
			overall: 0,
			entry: {
				rating: 0,
				loose_or_tight: "null"
			},
			center: {
				rating: 0,
				loose_or_tight: "null"
			},
			exit: {
				rating: 0,
				loose_or_tight: "null"
			}
		};
		if (query.id === 'frontStretch') {
			text = "Front-Stretch";
			cornerMode = false;
			rating = {
				engine: {
					rating: 0
				}
			}
		}
		else if(query.id === 'backStretch') {
			text = "Back-Stretch";
			cornerMode = false;
			rating = {
				engine: {
					rating: 0
				}
			}
		}
		else{
			text += " " + query.id;
		}
		rating = sessionStorage.getCorner(query.id) || rating;

		this.state = {
			text: text,
			cornerMode: cornerMode,
			query: query,
			rating: rating,
			overall: 0
		};
	};

	clearClick(name) {
		let newState = this.state.rating;
		if (name === "overall") {
			newState.overall = 0;
		}
		else if (name === "engine") {
			newState.engine.rating = 0;
		}
		else {
			newState[name].loose_or_tight = "null";
			newState[name].rating = 0;
		}
		this.setState({rating: newState});
	}

	handleRadioChange = (e) => {
		const name = e.target.name;
		const val = e.target.value;
		let newState = this.state.rating;
		newState[name]['loose_or_tight'] = val;
		this.setState({rating: newState});
		// console.log(this.state.rating);
	}

	handleOnChange = (name, value) =>{
		if (name === "overall") {
			let newState = this.state.rating;
			newState["overall"] = value;
			this.setState({rating: newState});
		}
		else {
			let newState = this.state.rating;
			newState[name]['rating'] = value;
			this.setState({rating: newState});
		}
	}

	goHome(){
		sessionStorage.saveCorner(this.state.query.id, this.state.rating);
		this.props.router.push('/track');
	}

	render(){

		return(
			<div className="App">
				<div className="container">
					<main>
						<section>
							<Grid>
								<Row>
									<center>
										<h3>{this.state.text}</h3>
									</center>
									<br />
									<br />
								</Row>
								{ /* -------- below is the corner section --------*/ }
								{this.state.cornerMode ? <div>
									<Row>
									<Col xs={3}>
										<FormGroup>
											<h3><span className="label label-success">Entry</span></h3>
										</FormGroup>
									</Col>
									<Col xs={1}>
										<h4 style={{marginTop: 35}}>{(x => x == 0 ? "N/A" : x)(this.state.rating.entry.rating)}</h4>
									</Col>
									<Col xs={7}>
										<Radio
											name="entry"
											value="loose"
											onChange={(value) => this.handleRadioChange(value)}
											checked={this.state.rating.entry.loose_or_tight === 'loose'}
											style={{marginLeft: "16em"}}
											inline>
											Loose
										</Radio>
										<Radio name="entry" value="tight" onChange={(value) => this.handleRadioChange(value)} checked={this.state.rating.entry.loose_or_tight === 'tight'} inline>
											Tight
										</Radio>
										<Slider
											min={0}
											max={10}
											value={this.state.rating.entry.rating}
											tooltip={true}
											onChange={(value) => this.handleOnChange('entry', value)}
										/>
									</Col>
									<Col xs={1}>
        						<Button inline onClick={() => this.clearClick("entry")} style={{marginTop: 22}}><Glyphicon glyph="trash" title="Clear Entry" /></Button>
									</Col>
								</Row>
								<br />
								<br />
								<Row>
									<Col xs={3}>
										<FormGroup>
											<h3><span className="label label-primary">Center</span></h3>
										</FormGroup>
									</Col>
									<Col xs={1}>
										<h4 style={{marginTop: 35}}>{(x => x == 0 ? "N/A" : x)(this.state.rating.center.rating)}</h4>
									</Col>
									<Col xs={7}>
										<Radio
											name="center"
											value="loose"
											onChange={(value) => this.handleRadioChange(value)}
											checked={this.state.rating.center.loose_or_tight === 'loose'}
											style={{marginLeft: "16em"}}
											inline>
											Loose
										</Radio>
										<Radio name="center" value="tight" onChange={(value) => this.handleRadioChange(value)}  checked={this.state.rating.center.loose_or_tight === 'tight'} inline>
											Tight
										</Radio>
										<Slider
											min={0}
											max={10}
											value={this.state.rating.center.rating}
											tooltip={true}
											onChange={(value) => this.handleOnChange('center', value)}
											style={{backgroundColor: 'blue'}}
										/>
									</Col>
									<Col xs={1}>
        						<Button inline onClick={() => this.clearClick("center")} style={{marginTop: 22}}><Glyphicon glyph="trash" title="Clear Center" /></Button>
									</Col>
								</Row>
								<br />
								<br />
								<Row>
									<Col xs={3}>
										<FormGroup>
											<h3><span className="label label-danger">Exit</span></h3>
										</FormGroup>
									</Col>
									<Col xs={1}>
										<h4 style={{marginTop: 35}}>{(x => x == 0 ? "N/A" : x)(this.state.rating.exit.rating)}</h4>
									</Col>
									<Col xs={7}>
										<Radio
											name="exit"
											value="loose"
											onChange={(value) => this.handleRadioChange(value)}
											checked={this.state.rating.exit.loose_or_tight === 'loose'}
											style={{marginLeft: "16em"}}
											inline>
											Loose
										</Radio>
										<Radio name="exit" value="tight" onChange={(value) => this.handleRadioChange(value)} checked={this.state.rating.exit.loose_or_tight === 'tight'} inline>
											Tight
										</Radio>
										<Slider
											min={0}
											max={10}
											value={this.state.rating.exit.rating}
											tooltip={true}
											onChange={(value) => this.handleOnChange('exit', value)}
										/>
									</Col>
									<Col xs={1}>
        						<Button inline onClick={() => this.clearClick("exit")} style={{marginTop: 22}}><Glyphicon glyph="trash" title="Clear Exit" /></Button>
									</Col>
								</Row>
								<br />
								<br />
								<Row>
									<Col xs={3}>
										<FormGroup>
											<h3><span className="label label-default">Overall</span></h3>
										</FormGroup>
									</Col>
									<Col xs={1}>
										<h4 style={{marginTop: 35}}>{(x => x == 0 ? "N/A" : x)(this.state.rating.overall)}</h4>
									</Col>
									<Col xs={7}>
										<span>&nbsp;</span>
										<Slider
											min={0}
											max={10}
											value={this.state.rating.overall}
											tooltip={true}
											onChange={(value) => this.handleOnChange('overall', value)}
										/>
									</Col>
									<Col xs={1}>
        						<Button inline onClick={() => this.clearClick("overall")} style={{marginTop: 22}}><Glyphicon glyph="trash" title="Clear Overall" /></Button>
									</Col>
								</Row>
							</div>
							:
							<div>
							 <Row>
								<Col xs={3}>
									<FormGroup>
										<h3><span className="label label-success">Engine</span></h3>
									</FormGroup>
								</Col>
								<Col xs={1}>
									<h4 style={{marginTop: 35}}>{(x => x == 0 ? "N/A" : x)(this.state.rating.engine.rating)}</h4>
								</Col>
								<Col xs={7}>
									<span>&nbsp;</span>
									<Slider
										min={0}
										max={10}
										value={this.state.rating.engine.rating}
										tooltip={true}
										onChange={(value) => this.handleOnChange('engine', value)}
									/>
								</Col>
								<Col xs={1}>
									<Button inline onClick={() => this.clearClick("engine")} style={{marginTop: 22}}><Glyphicon glyph="trash" title="Clear Engine" /></Button>
								</Col>
							</Row>
							</div>
						}
						<Row>
							<center>
								<Button bsStyle="primary" onClick={this.goHome.bind(this)}>Go Home</Button>
							</center>
						</Row>
							</Grid>
						</section>
					</main>
			</div>
		</div>
	);
}
}


export default Corner;
