import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Rectangle from './Rectangle';
import WaffleChairs from './WaffleChairs';
import ChartjsColumnResult from './ChartjsColumnResult';
import general_results_per_mun from './../../general_results_per_mun';

import MapResultVC from './MapResultVC';
import MapComparer from './MapComparer';

import '../../cityDataStyle.css';
export default class ResultsPerList extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: 'general', checked: [true, false], transition: 0, randomColorsHere: [], keyy: 'a' }
    }

    handleRadioFilter(filter, e) {
        let checked = [false, false, false, false, false]
        let transition = this.state.transition + 1;
        checked[parseInt(e.target.value)] = true;
        this.setState({ filter, checked, transition });
    }
    getUsedColor(allData) {
        console.log(allData);
        this.setState({ randomColorsHere: allData, keyy: 'b' });
    }

    render() {
        const GENERAL = <Translate type='text' content='cityResultsList.general' />//general registration
        const PER_DIST = <Translate type='text' content='cityResultsList.perDist' />//registration per vc
        const VALID_VOTES = <Translate type='text' content='cityResultsList.validVotes' />;
        const SEATS = <Translate type='text' content='cityResultsList.seats' />;
        const LIST_NUMBER = <Translate type='text' content='cityResultsList.listNumber' />;
        const RESULTS_PER_LIST = <Translate type='text' content='cityData.partyresults' />;
        const SEATS_RESULTS = <Translate type='text' content='cityResultsList.seatsRes' />;

        return (
            <div className='' >
                <section className='container col-md-offset-1' style={{ zIndex: '0' }}  >
                    <div className="md-radio md-radio-inline">
                        <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'general')} checked={this.state.checked[0]} />
                        <label htmlFor="3">{GENERAL}</label>
                    </div>
                    <div className="md-radio md-radio-inline">
                        <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'per_dist')} checked={this.state.checked[1]} />
                        <label htmlFor="4">{PER_DIST}</label>
                    </div>
                </section>
                {this.state.filter === 'general' ?

                    <div className='container' >
                        <div style={{ marginTop: '5vh' }}>
                            <Rectangle value={general_results_per_mun[this.props.municipalityName].VALID_VOTES} title={VALID_VOTES} />
                            <Rectangle value={general_results_per_mun[this.props.municipalityName].SEATS} title={SEATS} />
                            <Rectangle value={general_results_per_mun[this.props.municipalityName].LIST_NUMBER} title={LIST_NUMBER} />
                        </div>

                        <div className="col-md-12" style={{ marginTop: '5vh' }}>
                            <h4 class="subheaderTitle" style={{ textAlign: 'center' }}><span type="text">{RESULTS_PER_LIST} </span></h4>
                            <ChartjsColumnResult data={this.props.resultsData} getUsedColor={this.getUsedColor.bind(this)} />
                        </div>

                        <div className="col-md-12" style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                            <h4 class="subheaderTitle" style={{ textAlign: 'center' }}><span type="text">{SEATS_RESULTS} </span></h4>
                            <WaffleChairs data={this.props.resultsData} randomColors={this.state.randomColorsHere} keyy={this.state.keyy} />

                        </div>
                        <div className="container col-md-12 ">
                            {
                                this.state.randomColorsHere.map(function (element, index) {
                                    return <div className='col-md-3 col-sm-4  legend' style={{ marginTop: '2vh',marginBottom: '2vh' }}><i style={{ background: element.color }}></i>{element.nom_liste_fr}</div>
                                })
                            }
                        </div>
                    </div>

                    :
                    <div >

                        <div className="col-md-12" style={{ marginTop: '2vh' }}>
                            <MapResultVC 
                                shape_sector={this.props.shape_sector} 
                                resultPerList={this.props.resultsData} 
                                municipalityName={this.props.municipalityName} 
                            />
                        </div>
                        <div className="col-md-12" style={{ marginTop: '5vh' }}>
                            <MapComparer 
                                shape_sector={this.props.shape_sector} 
                                resultPerList={this.props.resultsData} 
                                municipalityName={this.props.municipalityName} 
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

