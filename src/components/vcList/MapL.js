import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Circle } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import { isEqual } from 'underscore';
import PollingCenter from './PollingCenter';
import PollingFilter from './PollingFilter';
//import RegSpotMarker from './RegSpotMarker' ;
import Translate from 'react-translate-component';
const _t = Translate.translate;
import config from '../config';
import ReactLoading from 'react-loading';

import { Link } from 'react-router-dom';


class MapL extends Component {
    constructor(props) {
        super(props);
        this.state = ({ center: [35.055360, 8.849795], shape: config.initShape, zoom: 7, polling: [], regSpot: [], oneIrie: [], munCoord: [], checkedPollingButton: true, checkedRegButton: false })
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.shape === 'string') {
            //console.log('changes');
            var shape = JSON.parse(nextProps.shape)
            //console.log(typeof(shape));
        } else {
            //console.log('render MpL object');
            var shape = nextProps.shape
        }
        //console.log('-------------------', nextProps.shape);
        if (isEqual(nextProps.markerpos, [0, 0])) {
            //console.log('00');
            //console.log(nextProps.shape);
            this.setState({ polling: nextProps.polling, shape, keymap: this.state.keyMap + 1 })
        } else {
            this.setState({ center: nextProps.markerpos, zoom: 13, polling: nextProps.polling, shape, keymap: this.state.keyMap + 1 });
        }
        //console.log('-----------',nextProps.center);
        let zoom;let center = nextProps.center;center[2]? zoom=7:zoom=9 
        this.setState({ center: [center[0], center[1]], zoom });
        window.scrollTo(0, 1010);


    }
    setZoom(value) {
        let center = value.split(";")
        this.setState({ center: [center[0], center[1]], zoom: 15 });
    }
    style(feature) {
        return {
            fillColor: '#cadfae',
            color: 'red', weight: 2,
        };
    }

    onEachFeature(feature, layer) {
        layer.bindTooltip(feature.properties.LABEL, { permanent: false, className: "tooltipnamear", direction: "center" })
    }
    
    render() {

        if (typeof this.props.shape === 'string') {
            //console.log('changes');
            var shape = JSON.parse(this.props.shape)
            //console.log(typeof(shape));
        } else {
            //console.log('render MpL object');
            var shape = this.props.shape
        }
        const pin = L.icon({ iconUrl: '/img/pin.svg', iconSize: [50, 50], iconAnchor: [40, 40] });

        var allreg = []
        allreg = this.state.oneIrie.concat(this.state.regSpot, this.state.munCoord)

        return (
            <div>
                <div className='col-md-12' style={{ zIndex: this.props.mapZIndex + 1 }}>
                    <div className='col-md-8 col-md-offset-2'>
                        <PollingFilter polling={this.props.polling} setZoom={this.setZoom.bind(this)} />
                    </div>
                </div>

                
                {(this.props.loading == false)?
                    <div className='col-md-12'>
                        <Map id='map' ref='map' maxZoom={23} flyTo={true} center={this.state.center} zoom={this.state.zoom} className="initialposition two " style={{ height: "80vh", position: "relative", zIndex: this.props.mapZIndex }}>
                            <TileLayer
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={this.props.markerpos} icon={pin} />
                            <GeoJSON
                                key={this.props.keymap}
                                data={this.state.shape}
                                style={this.style.bind(this)}
                                onEachFeature={this.onEachFeature.bind(this)}

                            />
                            <LayersControl position="topright" className="one">
                                <BaseLayer checked name="Light">
                                    <TileLayer
                                        attribution="mapbox"
                                        url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                    />
                                </BaseLayer>
                                <BaseLayer name="Leaflet">
                                    <TileLayer
                                        attribution="Leaflet"
                                        url="https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                    />
                                </BaseLayer>
                                <BaseLayer name="OpenStreetMap">
                                    <TileLayer
                                        attribution="OpenStreetMap"
                                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                    />
                                </BaseLayer>
                            </LayersControl>
                             {this.state.checkedPollingButton ?
                            <FeatureGroup color='purple'>
                                {this.state.polling.map(function (object, i) {
                                    return <PollingCenter lat={object.latitude} lon={object.longitude} title={object.center} key={i} />;
                                })}
                            </FeatureGroup> :
                            <div />}
                        </Map>
                    </div>
                    : <div className="col-md-12">
                        <div className="col-md-offset-5" style={{marginTop:'3vh'}} >
                        <h2>Loading</h2>
                        <ReactLoading type="bars" color="#444"  delay={0} />
                        </div>
                    </div>
                }
                </div>
                    );
                }
            }
            
export default MapL;