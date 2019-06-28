import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Circle, CircleMarker } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import Translate from 'react-translate-component';
import Control from 'react-leaflet-control';
import Select from 'react-select';
import _ from 'lodash';
import general_results_per_mun from './../../general_results_per_mun';

export default class MapComparer extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            center: [general_results_per_mun[this.props.municipalityName].lat,general_results_per_mun[this.props.municipalityName].lon], zoom: 11, markerpos: [], VcCheckbox: true,
            districtName: '', pollingCenterNumber: 0, votes_Number: 0, votes_Per1: 0, votes_Per2: 0, total_votes: 0, votesDifference: 0,
            partySelected: '',
            partySelected1: null, partySelected2: null,
            option1: [], option2: [], allOption: []


        })
    }

    componentDidMount() {
        //create Option for Select component
        let allOption = []; let objectt = {}
        for (let i = 0; i < this.props.resultPerList.length; i++) {
            let element = this.props.resultPerList[i];
            objectt.value = element.nom_liste_fr;
            objectt.label = element.nom_liste_fr;
            allOption.push(objectt);
            objectt = {};
        }

        //set the checklist for each radio
        let checked = []
        for (let i = 0; i < this.props.resultPerList.length; i++) {
            if (i === 0)
                checked[i] = true;
            else
                checked[i] = false;
        }

        this.setState({ allOption: allOption, option1: allOption, option2: allOption, checked, partySelected: this.props.resultPerList[0].nom_liste_fr });
    }

    getColorRegElg(d, c1, grades) {
        if (d > grades[3]) { return (c1[3]); }
        else if (d > grades[2]) { return (c1[2]); }
        else if (d > grades[1]) { return (c1[1]); }
        else if (d > grades[0]) { return (c1[0]); }
        else { return '#F2F2F0' }
    }

    style(feature) {
        if (this.state.partySelected1 !== null && this.state.partySelected2 !== null) {
            const property = feature.properties;
            let color;
            (parseInt(property[this.state.partySelected1.value]) > parseInt(property[this.state.partySelected2.value])) ? color = '#D3EEE7' :
                ((parseInt(property[this.state.partySelected1.value]) < parseInt(property[this.state.partySelected2.value])) ? color = "#FD6B54" :
                    color = '#CAD2D3'
                )

            return {
                fillColor: color,
                weight: 1.2,
                opacity: 0.9,
                color: 'grey',
                dashArray: '1',
                fillOpacity: 0.9
            };
        }

    }

    handle_VC_Checkbox() {
        this.setState({ VcCheckbox: !this.state.VcCheckbox });
    }

    highlightFeature(e) {
        const layer = e.target;
        const property = e.target.feature.properties;
        let votes_Per1 = (parseInt(property[(this.state.partySelected1).value]) * 100 / parseInt(property.totalVotes)).toFixed(2);
        let votes_Per2 = (parseInt(property[(this.state.partySelected2).value]) * 100 / parseInt(property.totalVotes)).toFixed(2);
        isNaN(votes_Per1) ? votes_Per1 = 0 : null
        isNaN(votes_Per2) ? votes_Per2 = 0 : null
        this.setState({
            districtName: property.name_fr,
            votes_Per1,
            votes_Per2,
            total_votes: property.totalVotes,
            votesDifference: Math.abs(parseInt(property[(this.state.partySelected1).value]) - parseInt(property[(this.state.partySelected2).value])),
            pollingCenterNumber: property.num_polling,
            votes_Number: property[this.state.partySelected],
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
        //console.log('aaaaaaaaa', filter);
        let checked = []
        for (let i = 0; i < this.props.resultPerList.length; i++) {
            checked[i] = false
        }
        checked[parseInt(e.target.value)] = true
        this.setState({ partySelected: filter, checked });
    }
    handleP1Select(partySelected1) {
        this.setState({ partySelected1, option1: this.state.allOption, option2: _.filter(this.state.allOption, function (o) { return o.value != [partySelected1.value]; }) });
    }
    handleP2Select(partySelected2) {
        //the option 1 should not contain the selected party here
        this.setState({ partySelected2, option2: this.state.allOption, option1: _.filter(this.state.allOption, function (o) { return o.value != [partySelected2.value]; }) });
    }

    render() {
        const MAP_Compare = <Translate type='text' content='cityResultsList.MAP_Compare' />
        const MAP_KEY = <Translate type='text' content='cityResultsList.votes_share' />//registration shares
        const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo' />//hover info
        const Polling_Number = <Translate type='text' content='cityData.Polling_Number' />//registration shares
        const total_votes = <Translate type='text' content='cityResultsList.total_votes' />
        const votes_Number = <Translate type='text' content='cityResultsList.votes_Number' />
        const votes_Per = <Translate type='text' content='cityResultsList.votesPer' />
        const selectP1 = <Translate type='text' content='cityResultsList.selectP1' />
        const selectP2 = <Translate type='text' content='cityResultsList.selectP2' />
        const WINS = <Translate type='text' content='cityResultsList.wins' />
        const EQUALS = <Translate type='text' content='cityResultsList.equals' />
        const SELECT_2_PARTIES = <Translate type='text' content='cityResultsList.SELECT_2_PARTIES' />


        let { partySelected2, partySelected1, option1, option2 } = this.state
        return (
            <div className='col-md-12' style={{ marginTop: '2vh' }}>
                <div className='col-md-3 card' style={{ marginTop: '7vh', padding: '5vh' }}>
                    {(this.state.partySelected1 !== null && this.state.partySelected2 !== null) ? <h6>{HOVER_INFO} </h6> : null}
                    <div style={{ marginTop: '5vh' }}>
                        <h6>{selectP1} </h6>
                        <Select
                            onChange={this.handleP1Select.bind(this)}
                            value={partySelected1}
                            options={option1}
                        />
                    </div>
                    <div style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                        <h6>{selectP2} </h6>
                        <Select
                            onChange={this.handleP2Select.bind(this)}
                            value={partySelected2}
                            options={option2}
                        />
                    </div>
                </div>

                <h4 className="subheaderTitle" style={{ textAlign: 'center', marginBottom: '3vh' }}><span type="text">{MAP_Compare} </span></h4>

                <div className='col-md-9'>
                    {(this.state.partySelected1 !== null && this.state.partySelected2 !== null) ? <Map
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
                                    <h5>{(this.state.partySelected1).value} {votes_Per} <b>{numberWithCommas(this.state.votes_Per1)}</b> % </h5>
                                    <h5>{(this.state.partySelected2).value} {votes_Per} <b>{numberWithCommas(this.state.votes_Per2)}</b> % </h5>
                                    <h5>{total_votes}<b>{numberWithCommas(this.state.total_votes)}</b> </h5>
                                    {/*  <h5>Votes difference<b>{numberWithCommas(this.state.votesDifference)}</b> </h5> */}

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
                                <div><i style={{ background: '#D3EEE7' }}></i><b>{partySelected1.value}</b> {WINS}<br /></div>
                                <div><i style={{ background: '#FD6B54' }}></i><b>{partySelected2.value}</b> {WINS}<br /></div>
                                <div><i style={{ background: '#CAD2D3' }}></i> {EQUALS}<br /></div>
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
                    </Map> : <h5 style={{ textAlign: 'center', marginTop: '20vh' }}>{SELECT_2_PARTIES}</h5>}
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