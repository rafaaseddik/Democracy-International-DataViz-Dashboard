import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import RootSportInfraTunis from './components/SportInTunisMun/RootSportInfraTunis' ;
import RootVotingCenter from './components/vcList/RootVotingCenter' ;
import RootAllCityData from './components/AllCityData/RootAllCityData' ;
//import RootCrowdsourcing from './components/crowdsourcing/RootCrowdsourcing' ;
//import RootParticipationGov from './components/participationGov/RootParticipationGov' ;
import RootHome from './components/shared/home/RootHome' ;
import About from './components/shared/About' ;
import Contact from './components/shared/Contact' ;
import counterpart  from 'counterpart';
import MunicipalitySelection from "./components/municipalitySelection/municipalitySelection";
import RootCityNotFound from "./components/AllCityData/RootCityNotFound";
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
counterpart.registerTranslations('ar',require('./../locales/ar'));
export default class App extends Component {
  
  render() {
    return (
      <Switch>
      <Route exact path="/" component={RootHome} />

      <Route exact path="/municipality-selection" component={MunicipalitySelection} />
      <Route exact path="/municipality-not-found" component={RootCityNotFound} />
      <Route exact path="/sport-infra-tunis" component={RootSportInfraTunis} />
      <Route exact path="/voting-center" component={RootVotingCenter} />
      <Route exact path="/kairouan" component={RootAllCityData} />
      <Route exact path="/beja" component={RootAllCityData} />
      <Route exact path="/tibar" component={RootAllCityData} />
      <Route exact path="/nabeul" component={RootAllCityData} />
      <Route exact path="/ariana" component={RootAllCityData} />
      <Route path="/municipalityDetails/:munName" component={RootAllCityData} />
      {/* <Route exact path="/crowdsource" component={RootCrowdsourcing} />
      <Route exact path="/participation-gov-level" component={RootParticipationGov} />*/}

      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      </Switch>
    );
  }
}
