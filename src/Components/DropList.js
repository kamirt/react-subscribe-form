import React, { Component } from 'react';

export default class CityList extends Component {

  constructor(props){
    super(props)
    this.state = {
      profList: []
    }
  }

  componentWillReceiveProps (props) {
    // "selects" text by bolder font
    let profInput = props.profInput;
    let profList = props.professions;
    let re = new RegExp(profInput, 'i');
    let stateProfList = [];
    profList.forEach(function(prof, i){
        let newProf = prof.replace(re, '<b>$&</b>');
        stateProfList.push(newProf);
    });
    this.setState({profList: stateProfList});
  }

  choosen (i) {
    this.props.choiceCallback(this.props.professions[i]);
  }

  render(){
    let me = this;
    return (
      this.props.professions.length
      ? <ul className="registration__input drop-list">
          { this.state.profList.map(function(el, i) {
            function createMarkup(item) { return {__html: item}};
            return <li onClick={me.choosen.bind(me, i)}
                      className="drop-list__item"
                      key={i}
                      dangerouslySetInnerHTML={createMarkup(el)} />
            })
          }
        </ul>
      : null
    );
  };
}
