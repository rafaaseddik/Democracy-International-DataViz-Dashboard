import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Rectangle from './Rectangle';
import ColumnGenderReg from './ColumnGenderReg';
import ColumnAgeReg from './ColumnAgeReg';
import general_results_per_mun from './../general_results_per_mun'; // load general registration data, general registration per gender....
import HistogramVoterProfile from './HistogramVoterProfile';
import MapRegistrationVC from './MapRegistrationVC';
import '../cityDataStyle.css';
export default class CityRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: 'general', checked: [true, false], transition: 0 }
    }

    handleRadioFilter(filter, e) {
        let checked = [false, false, false, false, false];
        let transition = this.state.transition + 1;
        checked[parseInt(e.target.value)] = true;
        this.setState({ filter, checked, transition });
    }
    render() {
        const GENERAL = <Translate type='text' content='cityData.general' />; //general registration
        const PERVC = <Translate type='text' content='cityData.pervc' />; //registration per vc
        const REG_NUMBER = <Translate type='text' content='cityData.regnumber' />; //registration number
        const MALE_REG = <Translate type='text' content='cityData.maleReg' />; //registration number
        const FEMALE_REG = <Translate type='text' content='cityData.femaleReg' />; //registration number
        const REGISTERED_PER_GENDER = <Translate type='text' content='cityData.reg_per_gender' />; //registration number
        const REGISTERED_PER_AGE = <Translate type='text' content='cityData.reg_per_age' />; //registration number

        return (
            <div >
                <section className='container col-md-offset-1' style={{ zIndex: '0' }}  >
                    <div className="md-radio md-radio-inline">
                        <input id="3" type="radio" name="g2" value={0} onClick={this.handleRadioFilter.bind(this, 'general')} checked={this.state.checked[0]} />
                        <label htmlFor="3">{GENERAL}</label>
                    </div>
                    <div className="md-radio md-radio-inline">
                        <input id="4" type="radio" name="g2" value={1} onClick={this.handleRadioFilter.bind(this, 'pervc')} checked={this.state.checked[1]} />
                        <label htmlFor="4">{PERVC}</label>
                    </div>
                </section>
                {this.state.filter === 'general' ?
                    <div style={{ marginTop: '5vh' }}>
                        <div className='container' >
                            <div className="col-md-5">
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].REG_NUMBER} title={REG_NUMBER} />
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].MALE_REG} title={MALE_REG} />
                                <Rectangle value={general_results_per_mun[this.props.municipalityName].FEMALE_REG} title={FEMALE_REG} />
                            </div>
                            <div className="col-md-7">
                                <h4 className="subheaderTitle" style={{ textAlign: 'center' }}><span type="text">{REGISTERED_PER_GENDER} </span></h4>
                                <ColumnGenderReg
                                    registeredFemale={general_results_per_mun[this.props.municipalityName].FEMALE_REG}
                                    registeredMale={general_results_per_mun[this.props.municipalityName].MALE_REG} />
                            </div>
                        </div>

                        <div className='container'>
                            <h4 className="subheaderTitle" style={{ textAlign: 'center', marginTop: '5vh' }}><span type="text">{REGISTERED_PER_AGE} </span></h4>
                            <div className='col-md-6'>
                                <ColumnAgeReg key={this.props.registrationData[0]+'a'} data={this.props.registrationData} />
                            </div>
                            <div className='col-md-6'>
                                <HistogramVoterProfile key={this.props.registrationData[0]+'a'} data={this.props.registrationData} />
                            </div>
                        </div>
                    </div>
                    :
                    <MapRegistrationVC
                        shape_sector={this.props.shape_sector}
                        municipalityName={this.props.municipalityName}
                        registrationData={this.props.registrationData}     
                    />
                }
            </div>
        );
    }
}

