import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip, LayersControl, Circle, CircleMarker } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import PollingCenter from './PollingCenter';
import Translate from 'react-translate-component';
import Control from 'react-leaflet-control';
import counterpart from 'counterpart';
import general_results_per_mun from './../general_results_per_mun';

export default class MapRegistrationVC extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            center: [general_results_per_mun[this.props.municipalityName].lat, general_results_per_mun[this.props.municipalityName].lon],
            zoom: 11, markerpos: [], totalRegistration: 0, VcCheckbox: true,
            districtName: '', pollingCenterNumber: 0, registrationShare: 0, registrationNumber: 0,
            checked: [true, false, false, false, false], filter: 'allVC'

        })
    }

    componentWillMount() {
        console.log(this.props);
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
        let PROPERTY = parseInt(property.registered_sum) * 100 / parseInt(this.state.totalRegistration);
        return {
            fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], [0, 2, 10, 15]),
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
        let registrationShare = (parseInt(property.registered_sum) * 100 / parseInt(this.state.totalRegistration)).toFixed(2);
        this.setState({
            districtName: property.name_fr,
            pollingCenterNumber: property.num_polling,
            registrationNumber: property.registered_sum,
            registrationShare
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
    handleVCFilter(filter, e) {
        let checked = [false, false, false, false, false]
        checked[parseInt(e.target.value)] = true
        this.setState({ filter, checked });
    }
    vcFilter(state) {
        return (
            <div>
                {(() => {
                    switch (state) {
                        case 'allVC':
                            return <FeatureGroup color='purple'>
                                {
                                    (this.props.registrationData).map(function (object, i) {
                                        return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />;
                                    })
                                }
                            </FeatureGroup>
                        case 'crowdedVC':
                            let filteredCrowded = (this.props.registrationData).sort((a, b) => (parseInt(a.sum) < parseInt(b.sum)) ? 1 : ((parseInt(b.sum) < parseInt(a.sum)) ? -1 : 0));
                            let filteredCrowded2 = filteredCrowded.slice(0, 5)
                            return <FeatureGroup color='purple'>
                                {
                                    filteredCrowded2.map(function (object, i) {
                                        return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />;
                                    })
                                }
                            </FeatureGroup>
                        case 'emptyVC':
                            let filteredEmpty = (this.props.registrationData).sort((a, b) => (parseInt(a.sum) > parseInt(b.sum)) ? 1 : ((parseInt(b.sum) > parseInt(a.sum)) ? -1 : 0));
                            let filteredEmpty2 = filteredEmpty.slice(0, 5)
                            return <FeatureGroup color='purple'>{filteredEmpty2.map(function (object, i) { return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />; })} </FeatureGroup>

                        case 'youthVC':
                            let filteredYouth = (this.props.registrationData).sort((a, b) => (((parseInt(a.f_18_21) + parseInt(a.m_18_21)) / parseInt(a.sum)) < ((parseInt(b.f_18_21) + parseInt(b.m_18_21)) / parseInt(b.sum))) ? 1 : ((((parseInt(b.f_18_21) + parseInt(b.m_18_21)) / parseInt(b.sum)) < ((parseInt(a.f_18_21) + parseInt(a.m_18_21)) / parseInt(a.sum))) ? -1 : 0));
                            let filteredYouth2 = filteredYouth.slice(0, 5)
                            return <FeatureGroup color='purple'>{filteredYouth2.map(function (object, i) { return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />; })} </FeatureGroup>

                        case 'lessYouthVC':
                            let filteredLessYouth = (this.props.registrationData).sort((a, b) => (((parseInt(a.f_18_21) + parseInt(a.m_18_21)) / parseInt(a.sum)) > ((parseInt(b.f_18_21) + parseInt(b.m_18_21)) / parseInt(b.sum))) ? 1 : ((((parseInt(b.f_18_21) + parseInt(b.m_18_21)) / parseInt(b.sum)) > ((parseInt(a.f_18_21) + parseInt(a.m_18_21)) / parseInt(a.sum))) ? -1 : 0));
                            let filteredLessYouth2 = filteredLessYouth.slice(0, 5)
                            return <FeatureGroup color='purple'>{filteredLessYouth2.map(function (object, i) { return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />; })} </FeatureGroup>

                        case 'moreFemale':
                            let filteredMoreFemale = (this.props.registrationData).sort((a, b) => (((parseInt(a.f_p51) + parseInt(a.f_36_50) + parseInt(a.f_25_35) + parseInt(a.f_22_24) + parseInt(a.f_18_21)) / parseInt(a.sum)) < (((parseInt(b.f_p51) + parseInt(b.f_36_50) + parseInt(b.f_25_35) + parseInt(b.f_22_24) + parseInt(b.f_18_21)) / parseInt(b.sum))) ? 1 : (((parseInt(b.f_p51) + parseInt(b.f_36_50) + parseInt(b.f_25_35) + parseInt(b.f_22_24) + parseInt(b.f_18_21)) / parseInt(b.sum)) < ((parseInt(a.f_p51) + parseInt(a.f_36_50) + parseInt(a.f_25_35) + parseInt(a.f_22_24) + parseInt(a.f_18_21)) / parseInt(a.sum))) ? -1 : 0));
                            let filteredMoreFemale2 = filteredMoreFemale.slice(0, 5)
                            return <FeatureGroup color='purple'>{filteredMoreFemale2.map(function (object, i) { return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />; })} </FeatureGroup>

                        case 'lessFemale':
                            let filteredLessFemale = (this.props.registrationData).sort((a, b) => (((parseInt(a.f_p51) + parseInt(a.f_36_50) + parseInt(a.f_25_35) + parseInt(a.f_22_24) + parseInt(a.f_18_21)) / parseInt(a.sum)) > (((parseInt(b.f_p51) + parseInt(b.f_36_50) + parseInt(b.f_25_35) + parseInt(b.f_22_24) + parseInt(b.f_18_21)) / parseInt(b.sum))) ? 1 : (((parseInt(b.f_p51) + parseInt(b.f_36_50) + parseInt(b.f_25_35) + parseInt(b.f_22_24) + parseInt(b.f_18_21)) / parseInt(b.sum)) > ((parseInt(a.f_p51) + parseInt(a.f_36_50) + parseInt(a.f_25_35) + parseInt(a.f_22_24) + parseInt(a.f_18_21)) / parseInt(a.sum))) ? -1 : 0));

                            let filteredLessFemale2 = filteredLessFemale.slice(0, 5)
                            return <FeatureGroup color='purple'>{filteredLessFemale2.map(function (object, i) { return <PollingCenter data={object} radius={10} weight={1} lat={object.lat} lon={object.lon} center={([object.lat, object.lon])} title={object.polling} key={i} />; })} </FeatureGroup>

                        default:
                            return null;
                    }
                })(this)}
            </div>
        );
    }
    render() {
        const MAP_TITLE = <Translate type='text' content='cityData.mapRegistrationTitle' />//registration shares
        const MAP_KEY = <Translate type='text' content='cityData.mapKey' />//registration shares
        const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo' />//hover info
        const CLICK_INFO = <Translate type='text' content='cityData.clickInfo' />//click info
        const Polling_Number = <Translate type='text' content='cityData.Polling_Number' />//registration shares
        const Reg_Per = <Translate type='text' content='cityData.Reg_Per' />//registration shares
        const Reg_Number = <Translate type='text' content='cityData.Reg_Number' />

        const vcFilter = <Translate type='text' content='cityData.vcFilter' />
        const allVc = <Translate type='text' content='cityData.allVc' />
        const top5Crowded = <Translate type='text' content='cityData.top5Crowded' />
        const least5Crowded = <Translate type='text' content='cityData.least5Crowded' />
        const highestYouth = <Translate type='text' content='cityData.highestYouth' />
        const lowestYouth = <Translate type='text' content='cityData.lowestYouth' />
        const highestWomen = <Translate type='text' content='cityData.highestWomen' />
        const lowestWomen = <Translate type='text' content='cityData.lowestWomen' />

        return (
            <div className='col-md-12' style={{ marginTop: '2vh' }}>
                <div className='col-md-3 card' style={{ marginTop: '7vh', padding: '5vh' }}>
                    <h6>{HOVER_INFO} </h6>
                    <h6 style={{ marginBottom: '4vh' }}>{CLICK_INFO}</h6>

                    <div className="chiller_cb" style={{ marginBottom: '5vh' }}>
                        <input onChange={this.handle_VC_Checkbox.bind(this)} id="showvc" type="checkbox" checked={this.state.VcCheckbox} />
                        <label htmlFor="showvc">{counterpart.translate('cityData.ShowVc')}</label>
                        <span></span>
                    </div>

                    <h6>{vcFilter}</h6>
                    <div className="md-radio ">
                        <input id="3vc" type="radio" name="VC" value={0} onClick={this.handleVCFilter.bind(this, 'allVC')} checked={this.state.checked[0]} />
                        <label htmlFor="3vc">{allVc}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="4vc" type="radio" name="VC" value={1} onClick={this.handleVCFilter.bind(this, 'crowdedVC')} checked={this.state.checked[1]} />
                        <label htmlFor="4vc">{top5Crowded}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="5vc" type="radio" name="VC" value={2} onClick={this.handleVCFilter.bind(this, 'emptyVC')} checked={this.state.checked[2]} />
                        <label htmlFor="5vc">{least5Crowded}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="6vc" type="radio" name="VC" value={3} onClick={this.handleVCFilter.bind(this, 'youthVC')} checked={this.state.checked[3]} />
                        <label htmlFor="6vc">{highestYouth}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="7vc" type="radio" name="VC" value={4} onClick={this.handleVCFilter.bind(this, 'lessYouthVC')} checked={this.state.checked[4]} />
                        <label htmlFor="7vc">{lowestYouth}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="8vc" type="radio" name="VC" value={5} onClick={this.handleVCFilter.bind(this, 'moreFemale')} checked={this.state.checked[5]} />
                        <label htmlFor="8vc">{highestWomen}</label>
                    </div>
                    <div className="md-radio ">
                        <input id="9vc" type="radio" name="VC" value={6} onClick={this.handleVCFilter.bind(this, 'lessFemale')} checked={this.state.checked[6]} />
                        <label htmlFor="9vc">{lowestWomen}</label>
                    </div>

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
                                    <h5>{Polling_Number} <b>{numberWithCommas(this.state.pollingCenterNumber)}</b> </h5>
                                    <h5>{Reg_Number} <b>{numberWithCommas(this.state.registrationNumber)}</b> </h5>
                                    <h5>{Reg_Per}<b>{numberWithCommas(this.state.registrationShare)}</b> % </h5>
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
                        {this.state.VcCheckbox ?
                            this.vcFilter(this.state.filter)
                            : null
                        }

                        <Control position="bottomright" >
                            <div className="info legend">
                                <p style={{ marginLeft: "10px" }}>{MAP_KEY}</p>
                                <div><i style={{ background: '#ffff9c' }}></i>0% - 2%<br /></div>
                                <div><i style={{ background: '#c2e699' }}></i>2% - 10%<br /></div>
                                <div><i style={{ background: '#78c679' }}></i>10% - 15%<br /></div>
                                <div><i style={{ background: '#238443' }}></i>+15%<br /></div>
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