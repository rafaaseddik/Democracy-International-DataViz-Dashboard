import React, { Component } from 'react';
import { Popup, Circle, Marker } from 'react-leaflet';
const polling = L.icon({ iconUrl: '/img/voting.svg', iconSize: [25, 25], iconAnchor: [20, 20] });
import ColumnAgeReg from './ColumnAgeReg';

class PollingCenter extends Component {

    render() {
        return (
            <div>

                <Marker position={[this.props.lat, this.props.lon]} icon={polling} >
                    <Popup minWidth={350} minHeight={250}>
                        <div>
                            <h4 style={{ textAlign: 'center' }}>{this.props.title}</h4>
                            <h5 style={{ textAlign: 'center' }}>{this.props.data.sum} registered</h5>

                            <div style={{ height: '350px' }}>
                                <ColumnAgeReg data={[this.props.data]} title={this.props.title} />
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </div>
        );
    }
}

export default PollingCenter;