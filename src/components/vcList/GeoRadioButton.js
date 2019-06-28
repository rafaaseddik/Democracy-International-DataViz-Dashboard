import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class GeoRadioButton extends Component {
    render() {
        return (
            <RadioButtonGroup onChange={this.props.handleGeocoderOption} className='col-md-12' name="Geocoding" defaultSelected="Google" style={{display: 'flex'}} >
              <RadioButton
                value="Google"
                label="Google"
                style={{width: '10%'}}
              />
              <RadioButton
                value="OSM"
                label="OpenStreet Map"
                style={{width: '15%'}}
              />
            </RadioButtonGroup>
        );
    }
}

export default GeoRadioButton;