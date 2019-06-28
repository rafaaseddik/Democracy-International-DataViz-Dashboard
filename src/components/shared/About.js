import React, { Component } from 'react';
import Menu from './menu/Menu';
import UnderConstruction from '../UnderConstruction' ;
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = { menuStyle: true }
  }

  openMenu() {
    let menuStyle = !this.state.menuStyle
    this.setState({ menuStyle });
  }
  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    return (
      <section className={menuStyle} >
        <Menu activeViz=''
          activeAbout='activeLink'
          activeContact=''
          openMenu={this.openMenu.bind(this)}
        />
        <div className='container' >
        <div className='col-sm-offset-4 col-sm-4 '> 
        <UnderConstruction />
        <h4 style={{textAlign:'center'}}>Under Construction</h4><br/>
        </div>
        </div>
      </section>
    );
  }
}
