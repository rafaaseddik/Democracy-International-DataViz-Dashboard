import React, { Component } from 'react';
import './ShuffleBoxes.css'
import Box from './Box';
import dataSport from '../../../data/datasport';
import Translate from 'react-translate-component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

export default class ShuffleBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'citizen', checked: [true, false, false, false, false], dataSport: dataSport, transition: 0 }
  }

  handleRadioFilter(filter, e) {
    let checked = [false, false, false, false, false]
    let transition = this.state.transition + 1;
    checked[parseInt(e.target.value)] = true
    dataSport.sort(function (a, b) { return (parseInt(a[filter]) > parseInt(b[filter])) ? 1 : ((parseInt(b[filter]) > parseInt(a[filter])) ? -1 : 0); });

    this.setState({ filter, checked, transition });

  }

  render() {
    // console.log(dataSport);
    const CITIZEN = <Translate type='text' content='box.citizen' />//Citizens
    const COMPLEX = <Translate type='text' content='box.complex' />//Sports complex
    const FIELD = <Translate type='text' content='box.field' />//Sports fields
    const SALLE = <Translate type='text' content='box.salle' />//sports Hall
    const ATHLETISM = <Translate type='text' content='box.athletism' />//Athletics Track
    return (
      <div className='container'>
        <section className='row col-md-12' >
          <div className="md-radio md-radio-inline">
            <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'citizen')} checked={this.state.checked[0]} />
            <label htmlFor="3">{CITIZEN}</label>
          </div>
          <div className="md-radio md-radio-inline">
            <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'complex')} checked={this.state.checked[1]} />
            <label htmlFor="4">{COMPLEX}</label>
          </div>
          <div className="md-radio md-radio-inline">
            <input id="5" type="radio" name="g2" value={2} onClick={this.handleRadioFilter.bind(this, 'field')} checked={this.state.checked[2]} />
            <label htmlFor="5">{FIELD}</label>
          </div>
          <div className="md-radio md-radio-inline">
            <input id="6" type="radio" value={3} onClick={this.handleRadioFilter.bind(this, 'hall')} name="g2" checked={this.state.checked[3]} />
            <label htmlFor="6">{SALLE}</label>
          </div>
          <div className="md-radio md-radio-inline">
            <input id="7" type="radio" value={4} onClick={this.handleRadioFilter.bind(this, 'athletic')} name="g2" checked={this.state.checked[4]} />
            <label htmlFor="7">{ATHLETISM}</label>
          </div>
        </section>
        <div className="container">
        <ReactCSSTransitionGroup transitionName="example"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
        <div className="row col-md-12" key={this.state.transition}>

              {dataSport.map((object, i) => {
                return <Box filter={this.state.filter} citizen={object.citizen} complex={object.complex} field={object.field} hall={object.hall} athletic={object.athletic} color={object.color} name={object.nom_arrond_fr} key={i} />
              })
              }
          </div>
          </ReactCSSTransitionGroup>

        </div>

      </div>
    );
  }
}

