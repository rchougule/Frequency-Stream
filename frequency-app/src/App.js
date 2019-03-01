import React, { Component } from 'react';
import './App.css';
import getFrequencyWords from './services/fetchData';

class App extends Component {

  constructor() {
    super();
    this.state = {
      wordsFreq: [],
      inputVal: '',
      dataAvailable: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getFrequencyWords(10)
    .then((result) => {
      this.setState({
        wordsFreq: result,
        dataAvailable: true
      })
    })
    .catch((result) => {
      this.setState({
        wordsFreq: result,
        dataAvailable: true
      })
    })
  }

  handleSubmit = () => {
    
    const { inputVal } = this.state;

    this.setState({
      wordsFreq: [],
      dataAvailable: false
    })

    getFrequencyWords(inputVal)
    .then((result) => {
      console.log(result);
      this.setState({
        wordsFreq: result,
        dataAvailable: true
      })
    })
    .catch((result) => {
      this.setState({
        wordsFreq: result,
        dataAvailable: true
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      inputVal: event.target.value
    })
  }



  render() {

    const { inputVal, wordsFreq, dataAvailable } = this.state;

    const allData = wordsFreq.map((wordObject, index) => {
      return (
        <li key={index} className="singleRow">
          <div className="floatLeft">{wordObject.word}</div>
          <div className="floatRight">{wordObject.count}</div>
        </li>
      )
    })

    return (
      <div className="container">
        <div className="pageHeader">
          <div className="titleHeader">Frequency Manza!</div>
        </div>
        <div className="inputSection">
          <input type="number" id="countInput" value={inputVal} onChange={this.handleChange}></input>
          <button id="submitButton" onClick={this.handleSubmit}>Fetch!</button>
        </div>
        <div className="frequencyBoard">
            <ul className="tabularData">
              <li className="singleRow">
                <div className="floatLeft">WORDS</div>
                <div className="floatRight">COUNT</div>
              </li>
              {!dataAvailable ? (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>) : (dataAvailable && !allData.length) ? (
                  <div>NO DATA AVAILABLE</div>
                ) : allData}
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
