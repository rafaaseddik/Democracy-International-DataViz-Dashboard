import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../menu/Menu';

import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import MapKey from './MapKey';
import './MapTunisArrond.css'

import axios from 'axios';
import config from '../config'



export default class RootParticipationGov extends Component {
  constructor(props) {
    super(props);
    this.state = { menuStyle: true, mapZIndex: 150, visibility: 'hidden' }
  }
  openMenu() {
    //this is trigered wheen the user clicks the menu icon
    let visibility = this.state.visibility;
    visibility == 'hidden' ? this.setState({ visibility: 'visible' }) : this.setState({ visibility: 'hidden' })
    let menuStyle = !this.state.menuStyle
    let mapZIndex;
    menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
    this.setState({ menuStyle, mapZIndex });
  }

  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    const TITLE = <Translate type='text' content='turnout.title' />//Turnout per gov

    return (
      <div>
        <section className={menuStyle}>
          <Menu activeViz='activeLink'
            activeAbout=''
            activeContact=''
            openMenu={this.openMenu.bind(this)}
            visibility={this.state.visibility}
          />

          <div className="site-content">
            <h1 className="site-content__headline">{TITLE}</h1>
          </div>

          <div className='container'>
          </div>

        </section>
      </div>
    );
  }
}
