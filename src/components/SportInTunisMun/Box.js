import React, { Component } from 'react';
import './box.css'
import Translate from 'react-translate-component';

export default class Box extends Component {
  render() {
    const CITIZEN = <Translate type='text' content='box.citizen' />//Citizens
    const COMPLEX = <Translate type='text' content='box.complex' />//Sports complex
    const FIELD = <Translate type='text' content='box.field' />//Sports fields
    const SALLE = <Translate type='text' content='box.salle' />//sports Hall
    const ATHLETISM = <Translate type='text' content='box.athletism' />//Athletics Track
    //const colors =["#c7c1b6", "#bebaaf", "#b5b3a8", "#acaca1", "#a4a59b", "#9b9f95", "#93988e", "#8b9188", "#838a82", "#7b837c", "#737d77", "#6c7671", "#656f6b", "#5e6966", "#576260"]

    let info;
    switch (this.props.filter) {
      case 'citizen':
        info =
          <div className='card-block'>
            <h4 className=" textCenter text-right"><i className="fa fa-cart-plus f-left"></i><span>{this.props.name}</span></h4>
            <div>
              <b><h5 className="m-b-.1 textColorRed mainTextSizeBox">{CITIZEN}<span className="f-right">{this.props.citizen}</span></h5></b>
              <h6 className="m-b-.1">{COMPLEX}<span className="f-right">{this.props.complex}</span></h6>
              <h6 className="m-b-.1">{FIELD}<span className="f-right">{this.props.field}</span></h6>
              <h6 className="m-b-.1">{SALLE}<span className="f-right">{this.props.hall}</span></h6>
              <h6 className="m-b-.1">{ATHLETISM}<span className="f-right">{this.props.athletic}</span></h6>
            </div>
          </div>
        break;
      case 'complex':
        info =
          <div className='card-block'>
            <h4 className=" textCenter text-right"><i className="fa fa-cart-plus f-left"></i><span>{this.props.name}</span></h4>
            <div>
            <h5 className="m-b-.1 textColorRed mainTextSizeBox">{COMPLEX}<span className="f-right">{this.props.complex}</span></h5>
              <h6 className="m-b-.1">{CITIZEN}<span className="f-right">{this.props.citizen}</span></h6>
              <h6 className="m-b-.1">{FIELD}<span className="f-right">{this.props.field}</span></h6>
              <h6 className="m-b-.1">{SALLE}<span className="f-right">{this.props.hall}</span></h6>
              <h6 className="m-b-.1">{ATHLETISM}<span className="f-right">{this.props.athletic}</span></h6>
            </div>
          </div>
        break;
      case 'field':
        info =
          <div className='card-block'>
            <h4 className=" textCenter text-right"><i className="fa fa-cart-plus f-left"></i><span>{this.props.name}</span></h4>
            <div>
            <h5 className="m-b-.1 textColorRed mainTextSizeBox">{FIELD}<span className="f-right">{this.props.field}</span></h5>
              <h6 className="m-b-.1">{CITIZEN}<span className="f-right">{this.props.citizen}</span></h6>
              <h6 className="m-b-.1">{COMPLEX}<span className="f-right">{this.props.complex}</span></h6>
              <h6 className="m-b-.1">{SALLE}<span className="f-right">{this.props.hall}</span></h6>
              <h6 className="m-b-.1">{ATHLETISM}<span className="f-right">{this.props.athletic}</span></h6>
            </div>
          </div>
        break;
      case 'hall':
        info =
          <div className='card-block'>
            <h4 className=" textCenter text-right"><i className="fa fa-cart-plus f-left"></i><span>{this.props.name}</span></h4>
            <div>
            <h5 className="m-b-.1 textColorRed mainTextSizeBox">{SALLE}<span className="f-right">{this.props.hall}</span></h5>
              <h6 className="m-b-.1">{CITIZEN}<span className="f-right">{this.props.citizen}</span></h6>
              <h6 className="m-b-.1">{COMPLEX}<span className="f-right">{this.props.complex}</span></h6>
              <h6 className="m-b-.1">{FIELD}<span className="f-right">{this.props.field}</span></h6>
              <h6 className="m-b-.1">{ATHLETISM}<span className="f-right">{this.props.athletic}</span></h6>
            </div>
          </div>
        break;
      case 'athletic':
        info =
          <div className='card-block'>
            <h4 className=" textCenter text-right"><i className="fa fa-cart-plus f-left"></i><span>{this.props.name}</span></h4>
            <div>
            <h5 className="m-b-.1 textColorRed mainTextSizeBox">{ATHLETISM}<span className="f-right">{this.props.athletic}</span></h5>
              <h6 className="m-b-.1">{CITIZEN}<span className="f-right">{this.props.citizen}</span></h6>
              <h6 className="m-b-.1">{COMPLEX}<span className="f-right">{this.props.complex}</span></h6>
              <h6 className="m-b-.1">{FIELD}<span className="f-right">{this.props.field}</span></h6>
              <h6 className="m-b-.1">{SALLE}<span className="f-right">{this.props.hall}</span></h6>
            </div>
          </div>
        break;
      default:
        break;
    }
    return (
      <div className="col-md-3 col-xl-3" >
        <div className="card order-card" style={{background:this.props.color}}>
          {info}
        </div>
      </div>
    );
  }
}

