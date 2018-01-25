import React, { Component } from 'react';
import CityList from './Components/CityList.js'
import './App.css';
import utils from './Utils.js';



function sendForm (e) {
  e.preventDefault();
  setTimeout(function(){
    alert('отправлено')
  }, 500);
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      cityList: ['Novokuznetsk', 'Novosibirsk', 'Berminham', 'London', 'Berlin', 'Moscow', 'Warsaw', 'Prague', 'New York'],
      filteredCL: [],
    }
  }
  handleCityInput (input) {
    let val = input.target.value;
    let filteredCities = utils.arrSearch(this.state.cityList, val);
    this.setState({ filteredCL: filteredCities });
  }
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <span>header</span>
        </header>
        <div className="app-content">
          <input onInput={ this.handleCityInput.bind(this) } className="app-content__input" />
           <CityList cities={this.state.filteredCL} />
        </div>
        <button onClick={sendForm}>Btn</button>
      </div>
    );
  }
}

export default App;
