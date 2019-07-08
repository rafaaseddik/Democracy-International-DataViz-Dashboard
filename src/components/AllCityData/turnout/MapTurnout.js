import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Circle, CircleMarker } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import Translate from 'react-translate-component';
import Control from 'react-leaflet-control';
const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo' />//hover info
import general_results_per_mun from './../general_results_per_mun';

export default class MapTurnout extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            center: [general_results_per_mun[this.props.municipalityName].lat, general_results_per_mun[this.props.municipalityName].lon], zoom: 11, markerpos: [], totalRegistration: 0, VcCheckbox: true,
            districtName: '', turnout: 0, registrationNumber: 0, validVotes: 0,
        })
    }

    componentWillMount() {
        //this could be done in the xls file
        let reg18_24 = 0; let reg25_35 = 0; let reg36_50 = 0; let regp51 = 0; let totalRegistration = 0;
        (this.props.registrationData).map((element) => {
            reg18_24 += parseInt(element.m_18_21) + parseInt(element.f_18_21) + parseInt(element.m_22_24) + parseInt(element.f_22_24);
            reg25_35 += parseInt(element.m_25_35) + parseInt(element.f_25_35);
            reg36_50 += parseInt(element.m_36_50) + parseInt(element.f_36_50);
            regp51 += parseInt(element.m_p51) + parseInt(element.f_p51);
        })
        totalRegistration = reg18_24 + reg25_35 + reg36_50 + regp51;
        this.setState({ totalRegistration });
    }

    getColorRegElg(d, c1, grades) {
        if (d > grades[3]) { return (c1[3]); }
        else if (d > grades[2]) { return (c1[2]); }
        else if (d > grades[1]) { return (c1[1]); }
        else if (d > grades[0]) { return (c1[0]); }
        else { return '#F2F2F0' }
    }

    style(feature) {
        const property = feature.properties;
        let PROPERTY = parseInt(property.totalVotes) * 100 / parseInt(property.registered_sum);
        console.debug(PROPERTY);
        return {
            fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], [0, 15, 20, 30]),
            weight: 1.2,
            opacity: 0.9,
            color: 'grey',
            dashArray: '1',
            fillOpacity: 0.9
        };
    }

    highlightFeature(e) {
        const layer = e.target;
        const property = e.target.feature.properties;
        let turnout = ( parseInt(property.totalVotes) * 100 / parseInt(property.registered_sum)).toFixed(2);
        this.setState({
            districtName: property.name_fr,
            registrationNumber: property.registered_sum,
            validVotes: property.totalVotes,
            turnout
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
            weight: 1
        });
    }

    resetMap() {
        const map = this.refs.map.leafletElement
        map.setView([general_results_per_mun[this.props.municipalityName].lat, general_results_per_mun[this.props.municipalityName].lon], 11, { animate: false })
        this.setState({ zoom: 11 });

    }


    render() {
        const MAP_Turnout = <Translate type='text' content='cityTurnoutList.MAP_Turnout' />//registration shares
        const MAP_KEY = <Translate type='text' content='cityData.mapKey' />//registration shares
        const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo' />//hover info
        const turnout_info = <Translate type='text' content='cityTurnoutList.turnout_info' />//click info
        const Polling_Number = <Translate type='text' content='cityData.Polling_Number' />//registration shares
        const validVotes = <Translate type='text' content='cityResultsList.validVotes'/>//registration shares
        const Reg_Number = <Translate type='text' content='cityData.Reg_Number' />
        const TURNOUT = <Translate type='text' content='cityTurnoutList.turnout' />//


        return (
            <div className='col-md-12' style={{ marginTop: '2vh',marginBottom: '3vh' }}>

                <h4 className="subheaderTitle" style={{ textAlign: 'center', marginBottom: '3vh' }}><span type="text">{MAP_Turnout} </span></h4>

                <div className='col-md-12'>
                <h6>{HOVER_INFO} </h6>
                <h6>{turnout_info} </h6>

                    <Map
                        id='map'
                        ref='map'
                        maxZoom={23}
                        flyTo={true}
                        keyboard={false}
                        scrollWheelZoom={false}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        className="initialposition two "
                        onZoom={
                            (e) => {
                                this.setState({ zoom: e.target._animateToZoom });
                            }
                        }
                        style={{ width: '100%', height: "80vh", position: "relative", zIndex: 0 }}>
                        <TileLayer
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {/* <Marker position={this.props.markerpos} icon={pin} />  */}
                        <GeoJSON
                            //key={this.props.keymap}
                            data={this.props.shape_sector}
                            style={this.style.bind(this)}
                            onEachFeature={
                                (feature, layer) => {
                                    layer.on({ mouseover: this.highlightFeature.bind(this) });
                                    layer.on({ mouseout: this.resetFeature.bind(this) });
                                }
                            }
                        >
                            <Tooltip>
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>{this.state.districtName}</h4>
                                    <h5>{TURNOUT} <b>{numberWithCommas(this.state.turnout)}</b> % </h5>
                                    <h5>{Reg_Number} <b>{numberWithCommas(this.state.registrationNumber)}</b> </h5>
                                    <h5>{validVotes}: <b>{numberWithCommas(this.state.validVotes)}</b> </h5>
                                </div>
                            </Tooltip>
                        </GeoJSON>
                        <LayersControl position="topright" className="one">
                            <BaseLayer checked name="Light">
                                <TileLayer
                                    attribution="mapbox"
                                    url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                            </BaseLayer>
                            <BaseLayer name="OpenStreetMap">
                                <TileLayer
                                    attribution="OpenStreetMap"
                                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                />
                            </BaseLayer>
                        </LayersControl>
                        

                        <Control position="bottomright" >
                            <div className="info legend">
                                <p style={{ marginLeft: "10px" }}>{TURNOUT}</p>
                                <div><i style={{ background: '#ffff9c' }}></i>0% - 15%<br /></div>
                                <div><i style={{ background: '#c2e699' }}></i>15% - 20%<br /></div>
                                <div><i style={{ background: '#78c679' }}></i>20% - 30%<br /></div>
                                <div><i style={{ background: '#238443' }}></i>+30%<br /></div>
                            </div>
                        </Control>
                        <Control>
                            <div>
                                <h5>Zoom: <b> {this.state.zoom}</b></h5>
                                <button
                                    className='simpleButton'
                                    onClick={this.resetMap.bind(this)}
                                >
                                    Reset
                                </button>
                            </div>
                        </Control>
                    </Map>
                </div>

            </div >
        );
    }
}
const numberWithCommas = (x) => {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}


//top 5 crowded VC
//least 5 
//VC with highest 18-24 percentage
//VC with highest p51 percentage
