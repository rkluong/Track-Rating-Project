import React, { Component } from 'react';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';
import config from './config';

class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      img: 'http://cartype.com/pics/108/full/toyota_trd-1.jpg',
      record_list: []
    }
  }

  componentDidMount() {
    axios.get(config.apiAddr + 'api/rating')
      .then(
        function (response) {
            this.setState({record_list: response.data});
        }.bind(this))
      .catch(function (error) {
          console.log(error);
      });
  }

  handleClickRecord(record_data) {
    localStorage.setItem(1, JSON.stringify(record_data.data.corner1));
    localStorage.setItem(2, JSON.stringify(record_data.data.corner2));
    localStorage.setItem(3, JSON.stringify(record_data.data.corner3));
    localStorage.setItem(4, JSON.stringify(record_data.data.corner4));
    localStorage.setItem("backStretch", JSON.stringify(record_data.data.backStretch));
    localStorage.setItem("frontStretch", JSON.stringify(record_data.data.frontStretch));

    this.props.router.push("/track?id=" + record_data.track.trackName + "&mode=view")
  }

  render(){
    return (
      <main>
        <section>
          <div className="Main">
            <div className="container">
              <div className="overlay" style={{
                display: 'block',
                position: 'absolute',
                backgroundColor:'white',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '140%',
                maxWidth: '100%',
                maxHeight: '140%',
                margin: 'auto'
                }}>
                </div>
              <div className="logo">
                <div style={{position: 'absolute', top: '2%', left: '35%'}}>
                  <img className="Image" alt="TRD logo" src={this.state.img} width="50%" height="50%" onClick={()=>{this.props.router.push("/main")}}/>
                </div>
              </div>
              <div className="History View" style={{position: 'absolute', top: '25%', left: '32%'}}>
                <ListGroup>
                  {this.state.record_list.sort((x, y) => (Date.parse(y.createdAt) - Date.parse(x.createdAt))).map(x =>
                    <ListGroupItem onClick={()=>this.handleClickRecord(x)}>
                      Track: { x.track.trackName }. Rating at:  {
                        (function() {
                          var time_str = new Date(Date.parse(x.createdAt)).toString();
                          return time_str.substring(0, time_str.length - 15);
                        })()
                      }
                    </ListGroupItem>)}
                </ListGroup>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
}
export default History;
