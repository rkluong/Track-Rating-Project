import React, { Component } from 'react';
import {Row, Col, Icon, Navbar, NavItem, Button, Grid} from 'react-bootstrap';
import * as sessionStorage from './utils/SessionStorage';
import axios from 'axios';
import config from './config'



const dfault = {
    "entry":{
        "rating": 0,
        "loose_or_tight": "null"
    },
    "center":{
        "rating": 0,
        "loose_or_tight": "null"
    },
    "exit":{
        "rating": 0,
        "loose_or_tight": "null"
    },
    "overall": 0

}


const dfaultEngine = {
    "engine": {
        "rating": 0
    }
}

class Track extends Component {
    constructor(props){
        super(props);
        this.sectionClick = this.sectionClick.bind(this);
    }

    componentWillMount(){
        const data = this.getData();
        console.log(data.corner3)
        this.setState({
            corner1: data.corner1 != null ? JSON.parse(data.corner1) : dfault,
            corner2: data.corner2 != null ? JSON.parse(data.corner2) : dfault,
            corner3: data.corner3 != null ? JSON.parse(data.corner3) : dfault,
            corner4: data.corner4 != null ? JSON.parse(data.corner4) : dfault,
            frontStretch: data.frontStretch != null ? JSON.parse(data.frontStretch) : dfaultEngine,
            backStretch: data.backStretch != null ? JSON.parse(data.backStretch) : dfaultEngine
        });
    }

    sectionClick(id){
      this.props.router.push('/corner?id='+id);
    }

    getData(){
        var corner1 = localStorage.getItem(1);
        var corner2 = localStorage.getItem(2);
        var corner3 = localStorage.getItem(3);
        var corner4 = localStorage.getItem(4);
        var backStretch = localStorage.getItem("backStretch");
        var frontStretch = localStorage.getItem("frontStretch");

        return {corner1: corner1,
                corner2: corner2,
                corner3: corner3,
                corner4: corner4,
                backStretch: backStretch,
                frontStretch: frontStretch}
    }

    routeToMain() {
      localStorage.clear();
      this.props.router.push("/main");
    }

    routeToHistory() {
      localStorage.clear();
      this.props.router.push("/history");
    }

    storeData() {
        const corners = {
            corner1: this.state.corner1,
            corner2: this.state.corner2,
            corner3: this.state.corner3,
            corner4: this.state.corner4,
            backStretch: this.state.backStretch,
            frontStretch: this.state.frontStretch
        }

        const _this = this;
        console.log("allcorners: ", corners);
        axios.post(config.apiAddr + 'api/rating', {
            data: corners
        })
        .then(function (response) {
            console.log("post: ", response);
            _this.routeToMain();
        })
        .catch(function (error) {
            console.log(error);
        });

    }



    render() {
        console.log(this.state.frontStretch)
        console.log(this.state.backStretch)
        return (
            <div className="App">
                <header>
                    <div className="container hide">
                        <Navbar brand='logo' right>
                            <NavItem href='get-started.html'>Getting started</NavItem>
                            <NavItem href='components.html'>Components</NavItem>
                        </Navbar>
                    </div>
                </header>
                <main>
                    <section className="background full">
                        <div className="container">
                            <Grid style={{minHeight: '100%', height: '100%'}}>
                                <Row className="full" xs={12} style={{marginLeft: 20, marginRight: 20}}>
                                    <Row xs={6} style={{minHeight: '50%', height: '50%'}}>
                                        <Col xs={4} name="3" onClick={() => this.sectionClick("3")} className="corner" style={{backgroundColor: 'rgba(66, 134, 244, .7)', padding: 20}}>
                                            <div>
                                                <p>
                                                    <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                        Corner 3<hr />
                                                    </p>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Entry</u> <br />
                                                            {this.state.corner3.entry.loose_or_tight == "loose" && <span>Loose: {this.state.corner3.entry.rating}<br /></span>}
                                                            {this.state.corner3.entry.loose_or_tight == "tight" && <span>Tight: {this.state.corner3.entry.rating}<br /></span>}
                                                            {this.state.corner3.entry.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Center</u> <br />
                                                            {this.state.corner3.center.loose_or_tight == "loose" && <span>Loose: {this.state.corner3.center.rating}<br /></span>}
                                                            {this.state.corner3.center.loose_or_tight == "tight" && <span>Tight: {this.state.corner3.center.rating}<br /></span>}
                                                            {this.state.corner3.center.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Exit</u> <br />
                                                            {this.state.corner3.exit.loose_or_tight == "loose" && <span>Loose: {this.state.corner3.exit.rating}<br /></span>}
                                                            {this.state.corner3.exit.loose_or_tight == "tight" && <span>Tight: {this.state.corner3.exit.rating}<br /></span>}
                                                            {this.state.corner3.exit.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <p>
                                                        {this.state.corner3.overall == "0" ? <span>Overall: N/A</span> : <span>{"Overall: " + this.state.corner3.overall}</span>}
                                                    </p>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={4} className="corner" style={{backgroundColor: 'rgba(244, 65, 119, .7)', padding: 20}}>
                                            <div name="frontStretch" className="corner" onClick={() => this.sectionClick("frontStretch")}>
                                                <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                    FRONT STRETCH<hr />
                                                </p>
                                                <p style={{fontWeight: 'bold', color: 'white'}}>
                                                    {this.state.frontStretch.engine.rating == "0" ? <span>Engine: N/A</span> : <span>{"Engine: " + this.state.frontStretch.engine.rating}</span>}
                                                    <br />
                                                    <br /><br /><br />
                                                    <br />
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={4}  name="2" onClick={() => this.sectionClick("2")} className="corner" style={{backgroundColor: 'rgba(17, 216, 47, .7)', padding: 20}}>
                                            <div>
                                                <p>
                                                    <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                        Corner 2<hr />
                                                    </p>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Entry</u> <br />
                                                            {this.state.corner2.entry.loose_or_tight == "loose" && <span>Loose: {this.state.corner2.entry.rating}<br /></span>}
                                                            {this.state.corner2.entry.loose_or_tight == "tight" && <span>Tight: {this.state.corner2.entry.rating}<br /></span>}
                                                            {this.state.corner2.entry.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Center</u> <br />
                                                            {this.state.corner2.center.loose_or_tight == "loose" && <span>Loose: {this.state.corner2.center.rating}<br /></span>}
                                                            {this.state.corner2.center.loose_or_tight == "tight" && <span>Tight: {this.state.corner2.center.rating}<br /></span>}
                                                            {this.state.corner2.center.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Exit</u> <br />
                                                            {this.state.corner2.exit.loose_or_tight == "loose" && <span>Loose: {this.state.corner2.exit.rating}<br /></span>}
                                                            {this.state.corner2.exit.loose_or_tight == "tight" && <span>Tight: {this.state.corner2.exit.rating}<br /></span>}
                                                            {this.state.corner2.exit.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <p>
                                                        {this.state.corner2.overall == "0" ? <span>Overall: N/A</span> : <span>{"Overall: " + this.state.corner2.overall}</span>}
                                                    </p>
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row xs={6} style={{minHeight: '50%', height: '50%'}}>
                                        <Col xs={4} name="4" onClick={() => this.sectionClick("4")} className="corner" style={{backgroundColor: 'rgba(17, 216, 47, .7)', padding: 20}}>
                                            <div>
                                                <p>
                                                    <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                        Corner 4<hr />
                                                    </p>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Entry</u> <br />
                                                            {this.state.corner4.entry.loose_or_tight == "loose" && <span>Loose: {this.state.corner4.entry.rating}<br /></span>}
                                                            {this.state.corner4.entry.loose_or_tight == "tight" && <span>Tight: {this.state.corner4.entry.rating}<br /></span>}
                                                            {this.state.corner4.entry.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Center</u> <br />
                                                            {this.state.corner4.center.loose_or_tight == "loose" && <span>Loose: {this.state.corner4.center.rating}<br /></span>}
                                                            {this.state.corner4.center.loose_or_tight == "tight" && <span>Tight: {this.state.corner4.center.rating}<br /></span>}
                                                            {this.state.corner4.center.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Exit</u> <br />
                                                            {this.state.corner4.exit.loose_or_tight == "loose" && <span>Loose: {this.state.corner4.exit.rating}<br /></span>}
                                                            {this.state.corner4.exit.loose_or_tight == "tight" && <span>Tight: {this.state.corner4.exit.rating}<br /></span>}
                                                            {this.state.corner4.exit.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <p>
                                                        {this.state.corner4.overall == "0" ? <span>Overall: N/A</span> : <span>{"Overall: " + this.state.corner4.overall}</span>}
                                                    </p>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={4} className="corner"  style={{backgroundColor: 'rgba(190, 41, 236, .7)', padding: 20}}>
                                            <div style={{height: '280'}} name="backStretch" className="corner" onClick={() => this.sectionClick("backStretch")}>
                                                <p style={{color: 'white'}}>
                                                    <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                        BACK STRETCH<hr />
                                                    </p>
                                                    {this.state.backStretch.engine.rating == "0" ? <span>Engine: N/A</span> : <span>{"Engine: " + this.state.backStretch.engine.rating}</span>}
                                                    <br />
                                                    <br /><br /><br />
                                                    <br />
                                                </p>
                                            </div>
                                            <Row >
                                                <center>
                                                    {
                                                      this.props.location.query.mode === "view" ?
                                                        <button type="button" style={{width:'205px'}} onClick={()=>this.routeToHistory()} className="btn btn-primary btn-round-lg btn-lg">Back</button>
                                                      :
                                                        <button type="button" style={{width:'205px', marginTop: -100}} onClick={this.storeData.bind(this)} className="btn btn-primary btn-round-lg btn-lg">Submit</button>
                                                    }
                                                </center>
                                            </Row>
                                        </Col>
                                        <Col xs={4} name="1" onClick={() => this.sectionClick("1")} className="corner" style={{backgroundColor: 'rgba(66, 134, 244, .7)', padding: 20}}>
                                            <div>
                                                <p>
                                                    <p style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginTop: 0}}>
                                                        Corner 1<hr />
                                                    </p>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Entry</u> <br />
                                                            {this.state.corner1.entry.loose_or_tight == "loose" && <span>Loose: {this.state.corner1.entry.rating}<br /></span>}
                                                            {this.state.corner1.entry.loose_or_tight == "tight" && <span>Tight: {this.state.corner1.entry.rating}<br /></span>}
                                                            {this.state.corner1.entry.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Center</u> <br />
                                                            {this.state.corner1.center.loose_or_tight == "loose" && <span>Loose: {this.state.corner1.center.rating}<br /></span>}
                                                            {this.state.corner1.center.loose_or_tight == "tight" && <span>Tight: {this.state.corner1.center.rating}<br /></span>}
                                                            {this.state.corner1.center.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <p>
                                                            <u>Exit</u> <br />
                                                            {this.state.corner1.exit.loose_or_tight == "loose" && <span>Loose: {this.state.corner1.exit.rating}<br /></span>}
                                                            {this.state.corner1.exit.loose_or_tight == "tight" && <span>Tight: {this.state.corner1.exit.rating}<br /></span>}
                                                            {this.state.corner1.exit.loose_or_tight == "null" && <span>Loose: N/A<br />Tight: N/A<br /></span>}
                                                        </p>
                                                    </Col>
                                                    <p>
                                                        {this.state.corner1.overall == "0" ? <span>Overall: N/A</span> : <span>{"Overall: " + this.state.corner1.overall}</span>}
                                                    </p>
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Row>
                            </Grid>
                        </div>
                    </section>
                </main>
                <footer>

                </footer>
            </div>
        );
    }
}

export default Track;
