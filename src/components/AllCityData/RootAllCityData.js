import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/menu/Menu';
import ZigzagMunicipalityMenu from '../shared/menu/ZigzagMunicipalityMenu';
import CityRegistration from './registration/_CityRegistration';
import ResultsPerList from './result/perList/_ResultsPerList';
import CityTurnout from './turnout/_CityTurnout';
import CouncilDetail from './result/councilDetail/_CouncilDetail';
import axios from 'axios';
import config from '../config'

export default class RootHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuStyle: true, mapZIndex: 150, visibility: 'hidden', chosenViz: 'registration', municipalityName: '',
      shape_sector: config.initShape, registrationData: [], resultsData: []
    }
  }

  componentWillMount() {
    //get  the city from domain name
    //console.log((this.props.location.pathname).substring(1));
    let municipalityName = (this.props.location.pathname).substring(1)
    //Load the shapefile
    let qString = `${config.apiUrl}/api/shape/${municipalityName}_sectors`;
    axios({
      method: 'get',
      url: qString,
      headers: {
        'name': 'Isie',
        'password': 'Isie@ndDi',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then(response => {
        console.log('_sectors',response.data.data);
        this.setState({ shape_sector: JSON.parse(response.data.data) });
      })
      .catch(function (error) {
        console.log('error 1');
      });
    //load the registration data
    let qString2 = `${config.apiUrl}/api/shape/${municipalityName}_d_reg_data`;
    console.log(qString2);
    axios({
      method: 'get',
      url: qString2,
      headers: {
        'name': 'Isie',
        'password': 'Isie@ndDi',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then(response => {
        console.log('_d_reg_data----',response.data.data);
        this.setState({ registrationData: JSON.parse(response.data.data) });
      })
      .catch(function (error) {
        console.log('hhhhh2');
      });
    //load the results
    let qString3 = `${config.apiUrl}/api/shape/${municipalityName}_results per list`;
    axios({
      method: 'get',
      url: qString3,
      headers: {
        'name': 'Isie',
        'password': 'Isie@ndDi',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },

    })
      .then(response => {
        console.log('resultsData------',response.data.data);
        this.setState({ resultsData: JSON.parse(response.data.data) });
      })
      .catch(function (error) {
        console.log('error results per list');
      });
    this.setState({ municipalityName });
  }

  openMenu() {
    //this is trigered wheen the user clicks the menu icon
    let menuStyle = !this.state.menuStyle

    let mapZIndex, visibility;
    menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
    this.state.visibility == 'hidden' ? visibility = 'visible' : visibility = 'hidden'
    this.setState({ menuStyle, mapZIndex, visibility });
  }

  getVizType(e) {
    console.log('dddd', e);
    this.setState({ chosenViz: e })
  }
  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    let { chosenViz } = this.state;
    const TITLE = <Translate type='text' content='cityData.title' />

    return (
      <section className={menuStyle} >
        <Menu activeViz='activeLink'
          activeAbout=''
          activeContact=''
          openMenu={this.openMenu.bind(this)}
          visibility={this.state.visibility}
        />
        <div className="site-content" style={{ height: '12vh', marginBottom: '2vh' }}>
          <h1 className="site-content__headline">{`Municipality of ${(this.state.municipalityName).charAt(0).toUpperCase()+ (this.state.municipalityName).slice(1)}`}  </h1>
        </div>
        <ZigzagMunicipalityMenu getVizType={this.getVizType.bind(this)} />

        {chosenViz == 'registration' ? <CityRegistration 
                                          shape_sector={this.state.shape_sector} 
                                          municipalityName={this.state.municipalityName} 
                                          registrationData={this.state.registrationData} 
                                        /> :
          (chosenViz == 'turnout' ? <CityTurnout 
                                        shape_sector={this.state.shape_sector} 
                                        municipalityName={this.state.municipalityName}
                                        registrationData={this.state.registrationData}  
                                    /> :
            (chosenViz == 'listResults' ? <ResultsPerList 
                                              shape_sector={this.state.shape_sector} 
                                              municipalityName={this.state.municipalityName} 
                                              resultsData={this.state.resultsData}  
                                          /> :
              (chosenViz == 'electedCouncil' ? <CouncilDetail
                                                   municipalityName={this.state.municipalityName} 
                                                /> :
                null
              )))
        }

      </section>
    );
  }
}
