import React, { Component } from 'react';

export default class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  };
  componentWillReceiveProps(props){
    // copy props to independent state
    this.setState({cities: props.cities});
  }
  render(){
    return ( <ul style={{listStyle: 'none'}}>
      { this.state.cities.map(function(el, i){ return <li key={i}>{el}</li> }) }
    </ul> );
  };
}
