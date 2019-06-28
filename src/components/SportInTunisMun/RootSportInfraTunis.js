import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../shared/menu/Menu';
import ShuffleBoxes from './ShuffleBoxes' ;
import MapTunisArrond from './MapTunisArrond' ;
import Article from './Article' ;
import ZigzagMenu from '../shared/menu/ZigzagMenu' ;
export default class RootHome extends Component {
  constructor(props) {
    super(props);
    this.state = { menuStyle: true,chosenViz:'boxes',mapZIndex:150 }
  }
  openMenu() {
    //this is trigered wheen the user clicks the menu icon
    let menuStyle = !this.state.menuStyle

    let mapZIndex;
    menuStyle==true?mapZIndex=150:mapZIndex=100;
    this.setState({ menuStyle,mapZIndex });
  }
  getVizType(e){
    console.log('dddd',e);
    this.setState({chosenViz:e})
  }
  
  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    let { chosenViz } = this.state;
    const TITLE = <Translate type='text' content='title.title' />//Distribution of citizens & Sport infrastructure
    const TITLE2 = <Translate type='text' content='title.title2' />//in Tunis Municipality

    return (
      <section className={menuStyle} >
        <Menu activeViz='activeLink'
          activeAbout=''
          activeContact=''
          openMenu={this.openMenu.bind(this)}
        />
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE}<br/> {TITLE2}</h1>
        </div>
        <ZigzagMenu getVizType={this.getVizType.bind(this)}/>
        {this.state.chosenViz=='boxes'?<ShuffleBoxes/>:(this.state.chosenViz=='map'?<MapTunisArrond mapZIndex={this.state.mapZIndex}/>:<Article/>)}
      </section>
    );
  }
}
