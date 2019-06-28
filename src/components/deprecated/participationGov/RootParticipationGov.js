import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../menu/Menu';
import Control from 'react-leaflet-control';

import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl } from 'react-leaflet';
import ReactLoading from 'react-loading';
import MapKey from './MapKey';
import './MapTunisArrond.css'

import axios from 'axios';
import config from '../config'
import DataRectangle from './DataRectangle';


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
  handleRadioFilter(filter, e) {
    let checked = [false, false, false, false, false];
    checked[parseInt(e.target.value)] = true;
    let GRADES, keyTitle;
    if (filter == 'citizen') {
      GRADES = [0, 30000, 45000];
      keyTitle = <Translate type='text' content='mapKey.citizen' />
    } else if (filter == 'complex') {
      GRADES = [0, 1, 2];
      keyTitle = <Translate type='text' content='mapKey.complex' />
    } else if (filter == 'field') {
      GRADES = [0, 5, 9];
      keyTitle = <Translate type='text' content='mapKey.field' />
    } else if (filter == 'hall') {
      GRADES = [0, 1, 2];
      keyTitle = <Translate type='text' content='mapKey.hall' />
    } else if (filter == 'athletic') {
      GRADES = [0, 2, 4];
      keyTitle = <Translate type='text' content='mapKey.athletic' />
    }
    this.setState({ grades: GRADES, keyTitle, filter, checked });
  }

  getColorRegElg(d, c1, grades) {
    //console.log(d, c1, grades);
    if (d > grades[2]) { return (c1[3]); }
    else if (d > grades[1]) { return (c1[2]); }
    /* else if (d > grades[0]) { return (c1[1]); } */
    else { return (c1[0]); }
  }
  style(feature) {
    //console.log(feature.properties);
    let PROPERTY, GRADES;
    if (this.state.filter == 'citizen') {
      PROPERTY = parseInt(feature.properties.population_number);
      GRADES = [0, 30000, 45000];
    } else if (this.state.filter == 'complex') {
      PROPERTY = parseInt(feature.properties.complex);
      GRADES = [0, 1, 2];
    } else if (this.state.filter == 'field') {
      PROPERTY = parseInt(feature.properties.field);
      GRADES = [0, 5, 9];
    } else if (this.state.filter == 'hall') {
      PROPERTY = parseInt(feature.properties.salle);
      GRADES = [0, 1, 2];
    } else if (this.state.filter == 'athletic') {
      PROPERTY = parseInt(feature.properties.atheletic);
      GRADES = [0, 2, 4];
    }

    return {
      fillColor: this.getColorRegElg(PROPERTY, ["#ffffcc", "#c2e699", "#78c679", "#238443"], GRADES),
      weight: 2.5,
      opacity: 2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  highlightFeature(e) {
    const layer = e.target;
    const property = e.target.feature.properties;
    console.log(property);
    this.setState({
      destroy: false, nom: property.nom, population_number: property.population_number, field: property.field, salle: property.salle, atheletic: property.atheletic, complex: property.complex
    });
    return layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 1
    });
  }
  resetFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5
    });
    this.setState({ destroy: true });
  }
  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    const TITLE = <Translate type='text' content='turnout.title' />//Turnout per gov
    const HOVER = <Translate type='text' content='map.hover' />//Hover Over the map for more info

    return (
      <div>
        <section className={menuStyle}>
          <Menu activeViz='activeLink'
            activeAbout=''
            activeContact=''
            openMenu={this.openMenu.bind(this)}
            visibility={this.state.visibility}
          />

          <div className="site-content" style={{ height: '15vh' }}>
            <h1 className="site-content__headline">{TITLE}</h1>
          </div>

          <div className='container'>
            <Map maxZoom={9} center={[34.79, 12]} zoom={7} minZoom={7} style={{ height: "99vh", width: "81vw", position: "relative", zIndex: this.state.mapZIndex, backgroundColor: "white" }}>
              <TileLayer
                url='https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> '
              />

              <GeoJSON
                key={"a" + this.state.filter}
                data={G_TURNOUT_GOV}
                onEachFeature={
                  (feature, layer) => {
                    //sending shapes center to marker component
                    //layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:"tooltipnamear",direction:"right" })
                    /* layer.on({ mouseover: this.highlightFeature.bind(this) });
                    layer.on({ mouseout: this.resetFeature.bind(this) }); */
                  }
                }
              >
                <Tooltip direction="bottom" className="leafletTooltip" sticky={true} >
                  <div>
                    <h3>{this.state.nom}</h3>
                    {this.state.filter == 'citizen' ?
                      <h4>{this.state.population_number} {CITIZEN}</h4>
                      : (this.state.filter == 'field' ? <h4>{this.state.field} {FIELD}</h4> :
                        (this.state.filter == 'hall' ? <h4>{this.state.salle} {SALLE}</h4> :
                          (this.state.filter == 'athletic' ? <h4>{this.state.atheletic} {ATHLETISM}</h4> :
                            (this.state.filter == 'complex' ? <h4>{this.state.complex} {COMPLEX}</h4> : null)
                          )))
                    }
                  </div>
                </Tooltip>

              </GeoJSON>

              <Control position="topright" >
                <div className='col-md-6 col-md-offset-6'>
                  <p>{HOVER}</p>
                  <DataRectangle />
                </div>
              </Control>
              <Control position="bottomright" >
                <MapKey grades={this.state.grades} colorSet={["#ffffcc", "#c2e699", "#78c679", "#238443"]} keyTitle={this.state.keyTitle} key={this.state.filter} />
              </Control>

            </Map>
          </div>

        </section>
      </div>
    );
  }
}
