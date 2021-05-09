import logo from './logo.svg';
import React, { Component } from 'react';
import { Modal, Button, Header } from 'react-bootstrap'
import axios from 'axios';
import RemoveIcon from '@material-ui/icons/Remove';
import './App.css';


const schemaarr = ['Lastname', 'Gender', 'Age', 'City', 'State']

class App extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      segmentname: "",
      dropdowns: [],
      addsegmentvalue: "",
      segmentarr: [],
      show: false
    };
  }

  setShow = () => {
    this.setState({ show: !this.state.show })

  }

  // To save new segment and submit to server

  saveSegment = (e) => {
    e.preventDefault();
    console.log(this.state.segmentname);
    var schemas = this.state.dropdowns;
    schemas.unshift('firstname');
    schemas.unshift('accountname');
   
    var schemaarr=[]
const schema = schemas.reduce((obj, val) => {
  obj[val] = val;
  //schemaarr.push({`${obj[val]}`:val});
  return obj;
}, {});
    
const obj = {
  'segment name': this.state.segmentname,
  'schemas': schema
}
   
    const testURL = "https://webhook.site/f98cb979-dfd7-4293-9342-95bed89426a4";
    const myInit = {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({obj})
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ obj })
    };

   
     const myRequest = new Request(testURL, myInit);

    fetch(myRequest).then(function (response) {
      alert("New Segment Created");
      return response;
    }).then(function (response) {
      console.log(response);
    }).catch(function (e) {
      console.log(e);
    });

    //axios.post("https://webhook.site/f98cb979-dfd7-4293-9342-95bed89426a4", obj)
      // .then((res) => {
      //   console.log(res);
      //   alert('successfully submitted')
      // }).catch(err => {
      //   console.log(err)
      


  }
  // Remove schema

  delete = (index) => {
    var temp = this.state.dropdowns
    var value = temp[index];
    temp.splice(index, 1);
    var temp2 = this.state.segmentarr
    temp2.push(value)

    this.setState({ dropdowns: temp, segmentarr: temp2 })
  }


  componentDidMount = () => {
    this.setState({ segmentarr: schemaarr })
  }

  // To add new schema
  addSchema = (e) => {

    if (this.state.addsegmentvalue == "") {
      alert('please select a schema to add')
      return;
    }

    var updatedDropDowns = this.state.dropdowns
    var removedArr = this.state.segmentarr

    var index = removedArr.indexOf(this.state.addsegmentvalue)
    removedArr.splice(index, 1);
    this.setState({ dropdowns: [...updatedDropDowns, this.state.addsegmentvalue], segmentarr: removedArr })

  }

  render() {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Button class="btn-flip" data-back="Back" data-front="Front" onClick={() => this.setShow()}>
            Save Segment
      </Button>
        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.setShow()}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >

          <Modal.Title id="example-custom-modal-styling-title">

          </Modal.Title>

          <Modal.Body className="scroll">

            < section >
              < div className="imgBx" >
              </div >
              <div className="contentBx">

                <div className="formBx">
                  <div className='nav'> <h2>Save Segment</h2></div>
                  <form>
                    <div className='inputBx'>
                      <p>Enter the Name of the Segmaent:</p>
                      <input type='text' placeholder="Name of the Segment" onChange={(e) => this.setState({ segmentname: e.target.value })} name=''>
                      </input>
                    </div>
                    <div className='inputBx'>
                      <p>To save your segment, you need to add the schemas <br></br>to build the query</p>
                    </div>
                    <div className='blueBx'>
                      <div className='inputBx'>
                        <select onChange={(e) => this.setState({ firstname: e.target.value })}>
                          <option selected value="First Name">First Name</option>
                        </select><RemoveIcon onClick={() => alert("Madatory Field")} />
                      </div>
                      <div className='inputBx'>
                        <select onChange={(e) => this.setState({ accountname: e.target.value })}>
                          <option selected value="Account Name">Account Name</option>
                        </select>
                        <RemoveIcon onClick={() => alert("Madatory Field")} />
                      </div>
                      <div>
                        {this.state.dropdowns.map((item, index) =>
                          <div className='inputBx' key={index}>
                            <select >
                              <option selected value={item} >{item}</option>

                            </select> <RemoveIcon onClick={() => this.delete(index)} />
                          </div>
                        )
                        }
                      </div>
                    </div>

                    <div className='inputBx'>
                      <select onChange={(e) => this.setState({ addsegmentvalue: e.target.value })}>
                        <option selected value="Add Schema to Segment">Add Schema to Segment</option>
                        {this.state.segmentarr.map((item) =>
                          <option value={item}>{item}</option>
                        )}
                      </select>
                    </div>
                    <div className='inputbutton'>

                      <input type='button' onClick={() => this.addSchema()} value="+Add new schema" name=''>
                      </input>
                    </div>

                    <div className='inputBx'>
                      <div className='buttonBx'>
                        <span> <input type='Submit' onClick={this.saveSegment}
                          value="Save the segment" name=''></input></span>
                        <span> <input type='Submit' value="Cancel" name='' style={{ color: 'red' }, { backgroundColor: 'white' }, { border: "2px white solid" }}>
                        </input></span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </section >
          </Modal.Body>
        </Modal>

      </>


    );
  }
}


export default App;
