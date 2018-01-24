import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import utils from './Utils.js';

const cityList = ['Novokuznetsk', 'Novosibirsk', 'Berminham', 'London', 'Berlin', 'Moscow', 'Warsaw', 'Prague', 'New York'];

function handleCityInput(input){
  let val = input.target.value;
  let filteredCities = utils.arrSearch(cityList, val);
  console.log(filteredCities)
}

function sendForm(e){
  e.preventDefault();
  console.log('sendingForm')
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <span>header</span>
        </header>
        <div className="app-content">
          <input onInput={handleCityInput} className="app-content__input" />
        </div>
        <button onClick={sendForm}>Btn</button>
      </div>
    );
  }
}

export default App;
