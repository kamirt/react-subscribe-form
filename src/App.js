import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import utils from './Utils.js';

const cityList = ['Novokuznetsk', 'Novosibirsk', 'Berminham', 'London', 'Berlin', 'Moscow', 'Warsaw', 'Prague', 'New York'];
let cityChanged = [];
let showCityTips = false;

function handleCityInput (input) {
  let val = input.target.value;

  let filteredCities = utils.arrSearch(cityList, val);
  cityChanged = filteredCities;
}

function sendForm (e) {
  e.preventDefault();
  setTimeout(function(){
    alert('отправлено')
  }, 500);
}

function CityTips (props) {
  let cities = props.cities;
  console.log(cities)
  return <ul style={{listStyle: 'none'}}>
    { cities.map(function(el, i){ return <li key={i}>{el}</li> }) }
  </ul>
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
           <CityTips cities={ cityChanged }/>
        </div>
        <button onClick={sendForm}>Btn</button>
      </div>
    );
  }
}

export default App;
