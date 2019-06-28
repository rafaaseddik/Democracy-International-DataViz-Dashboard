import React, { Component } from 'react';
import {Popup,Circle,Marker } from 'react-leaflet';
const polling = L.icon({iconUrl: '/img/voting.svg',iconSize: [25, 25],iconAnchor: [20, 20]});

class PollingCenter extends Component {
    render() {
        return (
            <div>
                
                <Marker position={[this.props.lat, this.props.lon]} icon={polling} >
                <Popup>
                <h5 >{this.props.title}</h5>
                </Popup>
                </Marker>
            </div>
        );
    }
}

export default PollingCenter;