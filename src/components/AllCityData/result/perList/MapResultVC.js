import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Circle, CircleMarker } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import Translate from 'react-translate-component';
import Control from 'react-leaflet-control';
import counterpart from 'counterpart';
import general_results_per_mun from './../../general_results_per_mun';

export default class MapResultVC extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            center: [general_results_per_mun[this.props.municipalityName].lat,general_results_per_mun[this.props.municipalityName].lon], zoom: 11, markerpos: [], totalRegistration: 0, VcCheckbox: true,
            districtName: '', pollingCenterNumber: 0, votes_Number: 0, votes_Per: 0, total_votes: 0,
            filter: 'allVC', partySelected: ''

        })
    }

    componentWillMount() {
        //set the checklist for each radio
        let checked = []
        for (let i = 0; i < this.props.resultPerList.length; i++) {
            if (i === 0)
                checked[i] = true;
            else
                checked[i] = false;
        }

        this.setState({ checked, partySelected: this.props.resultPerList[0].nom_liste_fr });
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
        let PROPERTY = parseInt(property[this.state.partySelected]) * 100 / parseInt(property.totalVotes);
        return {
            fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], [0, 5, 20, 40]),
            weight: 1.2,
            opacity: 0.9,
            color: 'grey',
            dashArray: '1',
            fillOpacity: 0.9
        };
    }

    handle_VC_Checkbox() {
        this.setState({ VcCheckbox: !this.state.VcCheckbox });
    }

    highlightFeature(e) {
        const layer = e.target;
        const property = e.target.feature.properties;
        let votes_Per = (parseInt(property[this.state.partySelected]) * 100 / parseInt(property.totalVotes)).toFixed(2);
        isNaN(votes_Per) ? votes_Per = 0 : null
        console.log('---------------------',this.state.partySelected);
        this.setState({
            districtName: property.name_fr,
            pollingCenterNumber: property.num_polling,
            registrationNumber: property.registered_sum,
            votes_Number: property[this.state.partySelected],
            votes_Per: votes_Per,
            total_votes: property.totalVotes,
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
        map.setView([general_results_per_mun[this.props.municipalityName].lat,general_results_per_mun[this.props.municipalityName].lon], 11, { animate: false })
        this.setState({ zoom: 11 });
    }
    handlePartyFilter(filter, e) {
        console.log('aaaaaaaaa', filter);
        let checked = []
        for (let i = 0; i < this.props.resultPerList.length; i++) {
            checked[i] = false
        }
        checked[parseInt(e.target.value)] = true
        this.setState({ partySelected: filter, checked });
    }

    render() {
        const MAP_TITLE = <Translate type='text' content='cityResultsList.MAP_TITLE' />
        const MAP_KEY = <Translate type='text' content='cityResultsList.votes_share' />//registration shares
        const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo' />//hover info
        const Polling_Number = <Translate type='text' content='cityData.Polling_Number' />//registration shares
        const total_votes = <Translate type='text' content='cityResultsList.total_votes' />
        const votes_Number = <Translate type='text' content='cityResultsList.votes_Number' />
        const votes_Per = <Translate type='text' content='cityResultsList.votesPer' />
        const selectParty = <Translate type='text' content='cityResultsList.selectParty' />

        return (
            <div className='col-md-12' style={{ marginTop: '2vh' }}>
                <div className='col-md-3 card' style={{ marginTop: '7vh', padding: '5vh' }}>
                <h6 style={{ marginBottom: '5vh'}}>{HOVER_INFO} </h6>
                <h6 style={{ marginBottom: '1vh'}}>{selectParty} </h6>
                {
                        this.props.resultPerList.map(function (element, index) {
                            return <div className="md-radio ">
                                <input id={element.nom_liste_fr} type="radio" name="VC" value={index} onClick={this.handlePartyFilter.bind(this, element.nom_liste_fr)} checked={this.state.checked[index]} />
                                <label htmlFor={element.nom_liste_fr}>{element.nom_liste_fr}</label>
                            </div>
                        }, this)
                    }

                </div>
                <h4 className="subheaderTitle" style={{ textAlign: 'center', marginBottom: '3vh' }}><span type="text">{MAP_TITLE} </span></h4>
                <div className='col-md-9'>
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
                                    <h5>{votes_Per}<b>{numberWithCommas(this.state.votes_Per)}</b> % </h5>
                                    <h5>{votes_Number} <b>{numberWithCommas(this.state.votes_Number)}</b> </h5>
                                    <h5>{total_votes}<b>{numberWithCommas(this.state.total_votes)}</b> </h5>
                                    <h5>{Polling_Number} <b>{numberWithCommas(this.state.pollingCenterNumber)}</b> </h5>

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
                        {/* Rendering of VC */}


                        <Control position="bottomright" >
                            <div className="info legend">
                                <p style={{ marginLeft: "10px" }}>{MAP_KEY}</p>
                                <div><i style={{ background: '#ffff9c' }}></i>0% - 5%<br /></div>
                                <div><i style={{ background: '#c2e699' }}></i>5% - 20%<br /></div>
                                <div><i style={{ background: '#78c679' }}></i>20% - 40%<br /></div>
                                <div><i style={{ background: '#238443' }}></i>+40%<br /></div>
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
