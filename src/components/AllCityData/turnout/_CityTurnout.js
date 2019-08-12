import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Rectangle from './Rectangle';
import MapTurnout from './MapTurnout' ;
import general_results_per_mun from './../general_results_per_mun';
export default class CityTurnout extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: 'general', checked: [true, false], transition: 0 }
    }

    handleRadioFilter(filter, e) {
        let checked = [false, false, false, false, false]
        let transition = this.state.transition + 1;
        checked[parseInt(e.target.value)] = true;
        this.setState({ filter, checked, transition });
    }
    render() {
        const TURNOUT = <Translate type='text' content='cityTurnoutList.turnout' />//
        const VALID_VOTES = <Translate type='text' content='cityResultsList.validVotes' />//c
        const REG_NUMBER = <Translate type='text' content='cityData.regnumber' />//
        const Invalid_votes = <Translate type='text' content='cityTurnoutList.Invalid_votes' />//
        console.log(this.props.m)
        return (
            <div >
                
                    <div style={{ marginTop: '5vh' }}>
                        <div className='container' >
                            <div className="col-md-12">
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].REG_NUMBER} title={REG_NUMBER} />
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].VALID_VOTES} title={VALID_VOTES} />
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].Invalid_votes}  title={Invalid_votes} />
                                <Rectangle value={(Math.floor(100 * general_results_per_mun[this.props.municipalityName].total_vote / general_results_per_mun[this.props.municipalityName].REG_NUMBER)).toString()+"%"}  title={TURNOUT} />
                            </div>
                        </div>
                        <MapTurnout
                             registrationData={this.props.registrationData}
                             shape_sector={this.props.shape_sector}
                             municipalityName={this.props.municipalityName}
                        />
                    
                    </div>
                   
            </div>
        );
    }
}

