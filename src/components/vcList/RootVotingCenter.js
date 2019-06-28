import React, { Component } from 'react';
import Geocode from './Geocode' ;
import AutoSuggest from './AutoSuggest' ;
import axios from 'axios' ;
import config from './config' ;
import './style.css';
export default class RootVotingCenter extends Component {
    
    constructor(props){
        super(props);
        this.state=({key:1,shape:config.initShape,show:"layer2",hide:"layer1",gouvName:'',polling:[]})
        }
    //function from AutoSuggest executed when user clicks on submit button 
    getGouv(value){
        //console.log(value);
        this.setState({shape:value,key:2,show:"layer1",hide:"layer2"});
    }

    getGouvPolling(polling){
        this.setState({polling});
    }

    getGouvName(gouvName){
        this.setState({gouvName});
    }
    //function from GeocodeComponent executed when user clicks on back button
    BackToSelect(){
        this.setState({show:"layer2",hide:"layer1",key:3});
    }
    
    render() {
        return (
        <div /* className="container_row" */>
        <Geocode shape={this.state.shape} key={this.state.key} BackToSelect={this.BackToSelect.bind(this)} gouvName={this.state.gouvName} polling={this.state.polling} />

            {/* <div className={this.state.hide}>
            </div> */}
            {/* <div className={this.state.show}>
                <AutoSuggest getGouv={this.getGouv.bind(this)} getGouvName={this.getGouvName.bind(this)} getGouvPolling={this.getGouvPolling.bind(this)}/>
            </div> */}
        </div>    
        );
    }
}