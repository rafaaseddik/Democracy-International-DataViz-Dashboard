import React, { Component } from 'react';
//import AutoComplete from 'material-ui/AutoComplete';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios' ;
import { indexOf } from 'underscore';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import config from './config';
import ReactLoading from 'react-loading';


const _t = Translate.translate;


class App extends Component {
    
    constructor(props){
        super(props);
         this.state=({gouv:'',disabled:true,loading:false})
    }
    
    componentWillMount() {
       // counterpart.setLocale('ar');
    }
    handleTranslation(e){
        // console.log(e.target.getAttribute('data-tag'));
        counterpart.setLocale(e.target.getAttribute('data-tag'))
    }
    ChosenGouv(chosenRequest){
        this.setState({gouv:chosenRequest.value,disabled:false});
    }
    handleClick(){
        //send value from the input to parent
        console.log("click",this.state.gouv);
        this.setState({loading:true});
        let qString=config.apiUrl+"/api/shape/"+this.state.gouv;
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
    .then(response=>{
        //console.log(response.data.data)
         console.log('we got shape data frm db');
         console.log(response);
         this.setState({loading:false});
         this.props.getGouv(response.data.data)
         this.props.getGouvName(this.state.gouv)
        }
    )
    .catch(function (error) {
        console.log(error);
    });

    console.log("request the db for polling ",this.state.gouv);
    let qString2=config.apiUrl+"/api/polling/"+this.state.gouv;
        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
    .then(response=>{
         console.log('we got polling data frm db');
         //console.log(response.data[0].data);
         console.log(typeof(response.data[0].data));
         this.props.getGouvPolling(response.data[0].data)
        }
    )
    .catch(function (error) {
        console.log(error);
    });

    }

    render() {
        var options = [{value: "Ariana",label: "Ariana" }, {value: "Beja",label: "Beja" }, {value: "BenArous",label: "BenArous" }, {value: "Bizerte",label: "Bizerte" }, {value: "Gabes",label: "Gabes" }, {value: "Gafsa",label: "Gafsa" }, {value: "Jendouba",label: "Jendouba" }, {value: "Kairouan",label: "Kairouan" }, {value: "Kasserine",label: "Kasserine" }, {value: "Kebili",label: "Kebili" }, {value: "Mannouba",label: "Mannouba" }, {value: "Kef",label: "Kef" }, {value: "Mahdia",label: "Mahdia" }, {value: "Medenine",label: "Medenine" }, {value: "Monastir",label: "Monastir" }, {value: "Nabeul",label: "Nabeul" }, {value: "Sfax",label: "Sfax" }, {value: "SidiBouzid",label: "SidiBouzid" }, {value: "Siliana",label: "Siliana" }, {value: "Sousse",label: "Sousse" }, {value: "Tataouine",label: "Tataouine" }, {value: "Tozeur",label: "Tozeur" }, {value: "Tunis",label: "Tunis" }, {value: "Zaghouan",label: "Zaghouan" }]
        return (
   <div>
    <div>
            <IconButton onTouchTap={this.handleTranslation.bind(this)} data-tag='ar' tooltip="Arabic">
                <FontIcon className="flag-icon flag-icon-tn" data-tag='ar'/>
            </IconButton>

            <IconButton onTouchTap={this.handleTranslation.bind(this)} data-tag='fr' tooltip="French">
                <FontIcon className="flag-icon flag-icon-fr" data-tag='fr'/>
            </IconButton>

            <IconButton onTouchTap={this.handleTranslation.bind(this)} data-tag='en' tooltip="English">
                <FontIcon className="flag-icon flag-icon-gb" data-tag='en'/>
            </IconButton>
        </div>
    <div className="row titleTop">
    
                    <div className="col-md-8 col-md-offset-2 text-center gtco-heading">
                        <h2>{_t('AutoSuggest.Title')}</h2>
                        <p style={{color:'#00267f'}}>{_t('AutoSuggest.sub1')}</p>
                        <p style={{color:'#00267f'}} >{_t('AutoSuggest.sub2')}</p>
                        <p style={{color:'red',fontSize:"17px"}}>{_t('AutoSuggest.rk1')}</p>
                    </div>
                </div>
        <div className="col-md-12">
            <div className="col-md-2"></div>
            
            <div className="col-md-7">
            <Select
                    clearable={false}
                    name="gouvernorate_chousing"
                    placeholder={_t('AutoSuggest.InputGuide')}
                    value={this.state.gouv}
                    options={options}
                    onChange={this.ChosenGouv.bind(this)}
            />

            </div>

            <div className="col-md-1" style={{marginTop:"0%"}}>
            <RaisedButton onClick={this.handleClick.bind(this)} /* disabled={this.state.disabled} */ label={_t('AutoSuggest.SubmitButton')}  />
            </div>

            <div className="col-md-2"></div>
        </div>
        {this.state.loading?
            <div>
                <div className="col-md-5"></div>
                <article className="col-md-6">
                    <h2>{_t('AutoSuggest.loading')}</h2>
                    <ReactLoading type="bars" color="#444" className="react-Loader" delay={0} />
                </article>
            </div>
        :<div></div>}
        
        <div className="footer">
            <div className="footercontainer">
                    
            </div>
        </div>

    </div>
        );
    }
}

export default App;