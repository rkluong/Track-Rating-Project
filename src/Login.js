import React, { Component } from 'react';
import {Row, Col, Icon, Navbar, NavItem} from 'react-materialize';
import './mystyle.css'


class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
		img: 'http://www.trdusa.com/images/engineering/trdpro/fullsize/TRDPRO_wallpaper_02.jpg',
		//'https://s3-us-west-2.amazonaws.com/trd-images/aerial_track/NASCAR/Kentucky+Speedway+-+Sparta%2C+KY.jpg'
		username: '',
		psw :''
		};

		this.updateusername = this.updateusername.bind(this);
		this.updatepasscode = this.updatepasscode.bind(this);

	}

	buttonOnClick(e){

		console.log("hello");
		e.preventDefault();
		this.props.router.push('/main');
  }
	updateusername(e){
		e.preventDefault();
		this.setState({username: e.target.value});
		console.log(this.state.username);
	}

	updatepasscode(e){
		e.preventDefault();
		this.setState({passcode: e.target.value});
		console.log(this.state.psw);
	}


	render() {
		var mystyle = {
		  fontSize: 50,
		  color: '#FF0000',
		  fontWeight: 'bold',
		  textAlign: 'center',
		  top: '50%',
		  left: '50%',
		  marginTop: 500,
		  marginLeft: 600,
		  width: 100,
		  height: 100,
		  display: 'inline-block',
		  padding: 10,
		  zIndex: 100,
		  position: 'absolute'
		}

		return (
		<div>
			<div className="container">

				<div style={{
					display: 'block',
					position: 'absolute',
					backgroundImage: `url(${this.state.img})`,
					backgroundSize: "100% 100%",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                    margin: 'auto',
					top: '0%',
					left: '0%',

				}}>
				</div>
				<center>

					<div style={{position: 'absolute', top: '82%', left: '30%'}}>
						<input type="text" value = {this.state.username} placeholder="Enter Username" name="uname" required onChange = {this.updateusername}  ></input>
						<input type="password" value = {this.state.passcode} placeholder="Enter Password" name="psw" required onChange={this.updatepasscode}></input>

					</div>

					<div style={{position: 'absolute', top: '87%', left: '70%'}}>
						<button type="submit" onClick={this.buttonOnClick.bind(this)}>Login</button>

					</div>
				</center>

			</div>

		</div>
		);
	};
}
export default Login;
