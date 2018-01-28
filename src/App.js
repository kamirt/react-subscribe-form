import React, { Component } from 'react';
import DropList from './Components/DropList.js'
import './App.css';
import utils from './Utils.js';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      profList: [
       'Парикмахер',
       'Водитель',
       'Бармен',
       'Повар',
       'Программист',
       'Репетитор',
       'Строитель',
       'Кондитер',
       'Медсестра',
      ],
      filteredCL: [],
      profession: '',
      // maybe its not great, but in this case
      country: null,
      countryList: [
        {flag: 'https://' + window.location.host + '/static/img/russia.jpg', code: '+7', mask: '000 000000'},
        {flag: 'https://' + window.location.host + '/static/img/germany.jpg', code: '+49', mask: '000 000000'},
        {flag: 'https://' + window.location.host + '/static/img/armenia.jpg', code: '+374', mask: '000 000000'}
      ],
      showCountry: false,
      phone: '',
    }
  }

  componentWillMount () {
    this.setState({country: this.state.countryList[0]});
    this.setState({phone: this.state.countryList[0].code});
  }

  handleCityInput (input) {
    // filters list of professions
    let val = input.target.value;
    let filteredProfs = utils.arrSearch(this.state.profList, val);
    this.setState({ filteredCL: filteredProfs });
    this.setState({profession: val});
  }

  sendForm (e) {
    // submit form listener, sends data to the server
    e.preventDefault();
    setTimeout(function(){
      alert('отправлено');
    }, 500);
  }

  onProfChoice (choice) {
    this.setState({profession: choice});
    this.setState({filteredCL: []});
  }

  toggleCountry (i) {
    let country = this.state.countryList[i];
    this.setState({country: country});
    if(this.state.showCountry){
      this.setState({phone: country.code});
    }
    this.setState({showCountry: !this.state.showCountry});
  }

  handlePhoneInput (e) {
    function checkMask(mask, value) {
      let result = [];
      let val = value.split('');
      val.forEach(function(letter, i){
        if(!isNaN(letter)){
          if(mask.split('')[i] !== ' '){
            result.push(letter)
          } else {
            if (val[i] !== ' ' && val[i-1] !== ' ') {
              result.push(' ');
            }
            result.push(letter);
          }
        }
      });

      return result;
    }
    let code = this.state.country.code;
    let val = e.target.value.replace(code, '').replace(' ', '');
    let phoneBody = checkMask(this.state.country.mask, val).join('');
    let complete = code + ' ' + phoneBody;

    complete = complete.slice(0, code.length + this.state.country.mask.length+1);

    this.setState({phone: complete})
  }

  render() {
    let me = this;
    return (
      <section className="registration">
        <p className="registration__text">
          <strong>Зарегистрируйтесь</strong> и начните продавать услуги через интернет сегодня
        </p>
        <form action="/" className="registration__form">
        <label className="registration__label">
          <span className="registration__label__span">ИМЯ</span>
          <input className="registration__input" name="first_name" autoFocus />
        </label>
        <label className="registration__label">
          <span className="registration__label__span">ФАМИЛИЯ</span>
          <input className="registration__input" name="last_name" />
        </label>
        <label className="registration__label">
          <span className="registration__label__span">ПРОФЕССИЯ</span>
          <input className="registration__input" value={this.state.profession} name="profession" autocomplete="off" onInput={ this.handleCityInput.bind(this) } />
          <DropList
            professions={this.state.filteredCL}
            profInput={this.state.profession}
            choiceCallback={this.onProfChoice.bind(this)} />
        </label>
         <label className="registration__label" style={{zIndex: 1, marginTop: '72px'}}>
           <span className="registration__label__span">ТЕЛЕФОН</span>
           <ul className="registration__input drop-list_country">
           { this.state.showCountry ?
                this.state.countryList.map(function(el, i) {
                  return <li onClick={me.toggleCountry.bind(me, i)}
                          className="drop-list__item drop-list__item_country"
                          key={i}>
                         <img alt='country' className="drop-list_country__image" src={el.flag} /></li>
                })
              :  <li onClick={this.toggleCountry.bind(this, 0)} className="drop-list__item drop-list__item_country">
                  <img alt='country' className="drop-list_country__image drop-list_country__image_selected" src={me.state.country.flag}/>
                  <span className="drop-list_country__arrow">&#751;</span>
                  </li>
           }

           </ul>
           <input
              autocomplete="off"
              value={this.state.phone}
              onChange={this.handlePhoneInput.bind(this)}
              className="registration__input registration__input_country"
              name="phone" />
         </label>
         <div className="registration__footer">
            <button className="registration__footer__btn" type="submit" onClick={this.sendForm.bind(this)}>
                Зарегистрироваться
            </button>
         </div>
        </form>
        &nbsp;
      </section>
    );
  }
}

export default App;
