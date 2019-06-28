import React, { Component } from 'react';
import {Popup,Circle,Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
const market = L.icon({iconUrl: '/img/cart.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const post = L.icon({iconUrl: '/img/post-office.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const transpot = L.icon({iconUrl: '/img/bus-stop.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const service = L.icon({iconUrl: '/img/service.svg',iconSize: [30, 30],iconAnchor: [20, 20]});
const municipality = L.icon({iconUrl: '/img/city-hall.svg',iconSize: [40, 40],iconAnchor: [20, 20]});
const irie = L.icon({iconUrl: '/img/office-block.svg',iconSize: [30, 30],iconAnchor: [20, 20]});

var markerIcon;

class RegSpotMarker extends Component {
    render() {
        var markers=[];// add all position info in an array
        var rows=[];//append all markers
        console.log("Municipalities : ",this.props.regData);
        for (var i = 0; i < this.props.regData.length; i++ ) {
            let data=this.props.regData[i].data
            //console.log(data);
            let lat,long,city_en,city,name

            data.name ?  name =data.name:name="irie "+data.city_en; 

            if (data.latlon) {
                console.log(data.latlon);
                lat=data.latlon.split(",")[0];
                long=data.latlon.split(",")[1];
                city_en=data.city_en;
                city =data.city;
            }else{
                lat= data.lat;
                long=data.long;
                name=" بلدية "+data.mun
            }
            
        if (data.type=="c") {
             markers.push({lat:lat,lng:long,options:{icon:market,title:city_en},popup:name}  )  
        }else if(data.type=="p"){
             markers.push({lat:lat,lng:long,options:{icon:post,title:city_en},popup:name}  )  
        }else if(data.type=="sm"||data.type=="s"){
             markers.push({lat:lat,lng:long,options:{icon:service,title:city_en},popup:name}  )  
        }else if(data.type=="t"){
             markers.push({lat:lat,lng:long,options:{icon:transpot,title:city_en},popup:name}  )  
        }else if(data.type=="m"){
             markers.push({lat:lat,lng:long,options:{icon:municipality,title:city_en},popup:name}  )  
        }else{
            markers.push({lat:lat,lng:long,options:{icon:irie,title:city_en},popup:name}  )
        }
        }
            rows.push(<MarkerClusterGroup markers={markers} wrapperOptions={{enableDefaultStyle: true}} key={i}/>)
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default RegSpotMarker;