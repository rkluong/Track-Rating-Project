import React, { Component } from 'react';
import {MenuItem, DropdownButton, Button} from 'react-bootstrap';


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      img: 'http://cartype.com/pics/108/full/toyota_trd-1.jpg'
    }
  }
  handleSelect(evt, evtkey){
    const id = evtkey.target.getAttribute('name');
    if(evt == 1){
        this.props.router.push("/track?id=" + id + "&mode=submit");
      }
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
                <div style={{position: 'absolute', left: '15%', top: '5%'}}>
                  <img className="Image" src={this.state.img}/>
                  </div>
                </div>
              <div className="Select Track Button">
                <div style={{position: 'absolute', left: "25%", top: '60%'}}>
                  <DropdownButton className="btn btn-primary btn-lg" style={{width:'205px'}} title={"Select Track"} onSelect={this.handleSelect.bind(this)}>
                    <MenuItem eventKey="1" className="btn btn-primary" name="Kentucky Speedway">"Kentucky Speedway"</MenuItem></DropdownButton>
                </div>
              </div>
              <div className="Select Track Button">
                <div style={{position: 'absolute', left: "60%", top: '60%'}}>
                  <Button className="btn btn-primary btn-lg" style={{width:'205px'}} onClick={()=>{this.props.router.push("/history")}}>
                    View Past Ratings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
}
export default Main;
