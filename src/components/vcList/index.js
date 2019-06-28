var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { Router, Route, browserHistory,IndexRoute  } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from "./reducers";
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import App from "./App.js"
import RootMap from "./statistics/RootMap.js"
import NewMunRoot from "./newMunStatistics/RootMap.js"
import RootTwoMap from "./2maps/RootTwoMap.js"

/*Data for Public*/
import VizRoot from "./vizRoot/VizRoot.js"
import About from "./vizRoot/About.js"
import RegTrackRoot from "./vizRoot/registrationTracker/RegTrackRoot.js"
import RegTrackLineRoot from "./vizRoot/registrationTrackerLine/RegTrackLineRoot.js"
import DetailedRegGovRoot from './vizRoot/detailed_registration/DetailedRegGovRoot' ;
injectTapEventPlugin();

ReactDOM.render(

    <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
    <Router history={browserHistory}>
        <Route  path="/isie" component={App}/> 
        <Route path="/electionsocio" component={RootTwoMap}/> 
        <Route path="/" component={VizRoot}/> 
        <Route path="/detailedgov" component={DetailedRegGovRoot}/> 
        <Route path="/dailyregcharts" component={RegTrackLineRoot}/>         
        <Route path="/dailyreg" component={RegTrackRoot}/> 
        <Route path="/statistics" component={RootMap}/> 
        <Route path="/newmun" component={NewMunRoot}/> 
        <Route path="/about" component={About}/> 

    </Router>
    </MuiThemeProvider>
    </Provider>,
     document.getElementById('root')
    );