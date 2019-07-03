import React, {Component} from 'react';
import Menu from "../shared/menu/Menu";
import Card from "../shared/home/Card";
import Translate from "react-translate-component";

import {
    Map,
    Marker,
    Popup,
    TileLayer,
    GeoJSON,
    FeatureGroup,
    Tooltip,
    LayersControl,
    Circle,
    CircleMarker
} from 'react-leaflet';
import config from "../config";
import * as axios from "axios";
import Control from "react-leaflet-control";
import general_results_per_mun from "../AllCityData/general_results_per_mun";
import * as stored_data from "../shared/stored_data";

const {BaseLayer, Overlay} = LayersControl;

class MunicipalitySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuStyle: true, chosenViz: 'boxes', mapZIndex: 150,
            center: stored_data.tunisiacoordinates, zoom: 7,
            selectedGov: {
                nameEN: "",
                nameAR: ""
            }
        }
    }

    componentWillMount() {
        let qString = `${config.localApiUrl}/api/shape/getAllGovsShape`;
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(data => {
            this.setState({
                shape: data.data.shape
            });
            console.log(this.state)
        })
    }

    openMenu() {
        //this is trigered wheen the user clicks the menu icon
        let menuStyle = !this.state.menuStyle;

        let mapZIndex;
        menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
        this.setState({menuStyle, mapZIndex});
    }

    highlightFeature(e) {
        const layer = e.target;
        const properties = e.target.feature.properties;
        this.setState({
            selectedGov: {
                nameEN: properties.gouv_name,
                nameAR: properties.NAME_AR
            }

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
    selectGov(e){
        let govName = e.target.feature.properties.gouv_name
        console.log(e.target.feature.properties.gouv_name)
        let govData = stored_data.globalHierarchy.find(e=>e.nameEN==govName)
        this.setState({
            center:govData.coordinates,
            zoom:8
        })
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
        return {
            fillColor: this.getColorRegElg(PROPERTY, ["#ffff9c", "#c2e699", "#78c679", "#238443"], [0, 15, 20, 30]),
            weight: 1.2,
            opacity: 0.9,
            color: 'grey',
            dashArray: '1',
            fillOpacity: 0.9
        };
    }

    render() {
        let menuStyle = this.state.menuStyle ? '' : 'nav-active';
        const TITLE = <Translate type='text' content='title.chooseState'/>//Municipal election data

        const MAP_Turnout = <Translate type='text' content='cityTurnoutList.MAP_Turnout'/>//registration shares
        const MAP_KEY = <Translate type='text' content='cityData.mapKey'/>//registration shares
        const HOVER_INFO = <Translate type='text' content='cityData.hoverInfo'/>//hover info
        const turnout_info = <Translate type='text' content='cityTurnoutList.turnout_info'/>//click info
        const Polling_Number = <Translate type='text' content='cityData.Polling_Number'/>//registration shares
        const validVotes = <Translate type='text' content='cityResultsList.validVotes'/>//registration shares
        const Reg_Number = <Translate type='text' content='cityData.Reg_Number'/>
        const TURNOUT = <Translate type='text' content='cityTurnoutList.turnout'/>//

        return (
            <section className={menuStyle}>
                <Menu activeViz='activeLink'
                      activeAbout=''
                      activeContact=''
                      openMenu={this.openMenu.bind(this)}
                />
                <div className="site-content">
                    <h1 className="font_wsRegular">{TITLE}</h1>
                </div>

                <div className='container'>
                    <div className='row col-md-12' style={{zIndex: this.state.mapZIndex}}>

                        {!this.state.shape ? <div><h1>LOADING...</h1></div> :
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
                                        this.setState({zoom: e.target._animateToZoom});
                                    }
                                }
                                style={{width: '100%', height: "80vh", position: "relative", zIndex: 0}}>
                                <TileLayer
                                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {/* <Marker position={this.props.markerpos} icon={pin} />  */}
                                <GeoJSON
                                    //key={this.props.keymap}
                                    data={this.state.shape}
                                    style={this.style.bind(this)}
                                    onEachFeature={
                                        (feature, layer) => {
                                            layer.on({mouseover: this.highlightFeature.bind(this)});
                                            layer.on({mouseout: this.resetFeature.bind(this)});
                                            layer.on({ 'click' : this.selectGov.bind(this)})
                                        }
                                    }
                                >
                                    <Tooltip>
                                        <div>
                                            <h4 style={{textAlign: 'center'}}>{this.state.selectedGov.nameEN} - {this.state.selectedGov.nameAR}</h4>
                                        </div>
                                    </Tooltip>
                                </GeoJSON>
                                <LayersControl position="topright" className="one">
                                    <BaseLayer name="OpenStreetMap">
                                        <TileLayer
                                            attribution="OpenStreetMap"
                                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                        />
                                    </BaseLayer>
                                    <BaseLayer checked name="Light">
                                        <TileLayer
                                            attribution="mapbox"
                                            url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                        />
                                    </BaseLayer>

                                </LayersControl>


                                <Control position="bottomright">
                                    <div className="info legend">
                                        <p style={{marginLeft: "10px"}}>{TURNOUT}</p>
                                        <div><i style={{background: '#ffff9c'}}></i>0% - 15%<br/></div>
                                        <div><i style={{background: '#c2e699'}}></i>15% - 20%<br/></div>
                                        <div><i style={{background: '#78c679'}}></i>20% - 30%<br/></div>
                                        <div><i style={{background: '#238443'}}></i>+30%<br/></div>
                                    </div>
                                </Control>
                                <Control>
                                    <div>
                                        <h5>Zoom: <b> {this.state.zoom}</b></h5>
                                        <button
                                            className='simpleButton'
                                            //onClick={this.resetMap.bind(this)}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </Control>
                            </Map>
                        }

                    </div>

                </div>
            </section>
        );
    }
}

export default MunicipalitySelection;
