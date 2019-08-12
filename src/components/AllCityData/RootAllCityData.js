import React, {Component} from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/menu/Menu';
import ZigzagMunicipalityMenu from '../shared/menu/ZigzagMunicipalityMenu';
import CityRegistration from './registration/_CityRegistration';
import ResultsPerList from './result/perList/_ResultsPerList';
import CityTurnout from './turnout/_CityTurnout';
import CouncilDetail from './result/councilDetail/_CouncilDetail';
import axios from 'axios';
import config from '../config'
import general_results_per_mun from "./general_results_per_mun";

export default class RootHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuStyle: true, mapZIndex: 150, visibility: 'hidden', chosenViz: 'registration', municipalityName: '',
            shape_sector: config.initShape, registrationData: [], resultsData: [],general_results:{
                "gov_fr": "",
                "mun_name1": "",
                "lon": 0,
                "lat": 0,
                "desks": 0,
                "REG_NUMBER": 0,
                "MALE_REG": 0,
                "FEMALE_REG": 0,
                "map_names_ar": "",
                "mun_fr": "",
                "gov_ar": "",
                "VALID_VOTES": 0,
                "total_vote": 0,
                "Invalid_votes": 0,
                "SEATS": 0,
                "LIST_NUMBER": 0,
                "TURNOUT": 0,
            }
        }
    }

    componentWillMount() {
        //get  the city from domain name
        let municipalityName = (this.props.match.params.munName);
        //Load the shapefile
        let qString2 = `${config.localApiUrl}/api/shape/sectors?municipalityName=${municipalityName}`;
        //let qString = `${config.apiUrl}/api/shape/${municipalityName}_sectors`;
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
                console.debug('_sectors', response.data.data);
                this.setState({shape_sector: response.data.data});
            })
            .catch(function (error) {
                console.error('error 1');
            });

        //load the registration data
        let qString3 = `${config.localApiUrl}/api/registration/pollingData?municipalityName=${municipalityName}`;
        //let qString2 = `${config.apiUrl}/api/shape/${municipalityName}_d_reg_data`;
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
                console.debug('_d_reg_data----', response.data.data.pollingData);
                this.setState({registrationData: response.data.data.pollingData});
            })
            .catch(function (error) {

            });

        //load the results
        let qString4 = `${config.localApiUrl}/api/results/resultsData?municipalityName=${municipalityName}`;
        //let qString3 = `${config.apiUrl}/api/shape/${municipalityName}_results per list`;
        axios({
            method: 'get',
            url: qString4,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

        })
            .then(response => {
                console.debug('resultsData------', response.data.data);
                this.setState({resultsData: response.data.data});
            })
            .catch(function (error) {
                console.error('error results per list');
            });
        this.setState({municipalityName});
    }

    openMenu() {
        //this is trigered wheen the user clicks the menu icon
        let menuStyle = !this.state.menuStyle;

        let mapZIndex, visibility;
        menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
        this.state.visibility == 'hidden' ? visibility = 'visible' : visibility = 'hidden';
        this.setState({menuStyle, mapZIndex, visibility});
    }

    getVizType(e) {
        console.debug('[Viz Type]', e);
        this.setState({chosenViz: e})
    }

    render() {
        let menuStyle = '';
        this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active';

        let {chosenViz} = this.state;

        const TITLE = <Translate type='text' content='cityData.title'/>;

        return (
            <section className={menuStyle}>
                <Menu activeViz='activeLink'
                      activeAbout=''
                      activeContact=''
                      openMenu={this.openMenu.bind(this)}
                      visibility={this.state.visibility}
                />
                <div className="site-content" style={{height: '12vh', marginBottom: '2vh'}}>
                    <h1 className="site-content__headline">{`Municipality of ${(this.state.municipalityName).charAt(0).toUpperCase() + (this.state.municipalityName).slice(1)}`}  </h1>
                </div>
                <ZigzagMunicipalityMenu getVizType={this.getVizType.bind(this)}/>

                {chosenViz == 'registration' ? <CityRegistration
                        shape_sector={this.state.shape_sector}
                        municipalityName={this.state.municipalityName}
                        registrationData={this.state.registrationData}
                        general_results={this.state.general_results}
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
