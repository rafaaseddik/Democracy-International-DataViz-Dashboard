import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Menu from '../menu/Menu';
import Card from './Card';
import counterpart  from 'counterpart';
import '../shared.css'
export default class RootHome extends Component {
  constructor(props) {
    super(props);
    this.state = { menuStyle: true, chosenViz: 'boxes', mapZIndex: 150 }
  }
  openMenu() {
    //this is trigered wheen the user clicks the menu icon
    let menuStyle = !this.state.menuStyle

    let mapZIndex;
    menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
    this.setState({ menuStyle, mapZIndex });
  }

  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    let { chosenViz } = this.state;
    const TITLE = <Translate type='text' content='home.title' />//Municipal election data
    /* translation 1st Card */
    const TITLECARD = <Translate type='text' content='card.title1' />//Distribution of citizens & Sport infrastructure
    const DESC_CARD = <Translate type='text' content='card.description1' />//Tunis Municipality
    /* translation 2nd Card */
    console.log(counterpart.translate('card.title2'));
    const TITLECARD2 = <Translate type='text' content='card.title2' />//Municipal election data
    const DESC_CARD2 = <Translate type='text' content='card.description2' />//Municipal election data
    /* translation 2nd Card */
    console.log(counterpart.translate('card.title2'));
    const TITLECARD3 = <Translate type='text' content='card.title3' />//Municipal election data
    const DESC_CARD3 = <Translate type='text' content='card.description3' />//Municipal election data

    return (
      <section className={menuStyle} >
        <Menu activeViz='activeLink'
          activeAbout=''
          activeContact=''
          openMenu={this.openMenu.bind(this)}
        />
        <div className="site-content">
          <h1 className="font_wsRegular">{TITLE}</h1>
        </div>

        <div className='container'>
          <div className='row col-md-12' style={{zIndex:this.state.mapZIndex}} >
            <Card img="card1.jpg" redirectLink="/sport-infra-tunis" title={TITLECARD} description={DESC_CARD} />
            <Card img="card2.jpg" redirectLink="/voting-center" title={TITLECARD2} description={DESC_CARD2} />
            <Card img="card2.jpg" redirectLink="/kairouan" title={TITLECARD3} description={DESC_CARD3} />
            {/* <Card img="card2.jpg" redirectLink="/participation-gov-level" title={TITLECARD3} description={DESC_CARD3} /> */}

          </div>

        </div>
      </section>
    );
  }
}
