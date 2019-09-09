import React, {Component} from 'react';
import Menu from "../shared/menu/Menu";
import {Link, NavLink} from "react-router-dom";

class RootCityNotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuStyle: true, mapZIndex: 150, visibility: 'hidden'}
    }

    openMenu() {
        //this is trigered wheen the user clicks the menu icon
        let menuStyle = !this.state.menuStyle;

        let mapZIndex, visibility;
        menuStyle === true ? mapZIndex = 150 : mapZIndex = 100;
        this.state.visibility === 'hidden' ? visibility = 'visible' : visibility = 'hidden';
        this.setState({menuStyle, mapZIndex, visibility});
    }

    render() {
        let menuStyle="";
        this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active';
        return (
            <section className={menuStyle}>
                <Menu activeViz='activeLink'
                      activeAbout=''
                      activeContact=''
                      openMenu={this.openMenu.bind(this)}
                      visibility={this.state.visibility}
                />
                <div className="site-content" style={{height: '12vh', marginBottom: '2vh'}}>
                    <h1 className="site-content__headline">City Not Found </h1>
                </div>
                <div className="pt-5 mt-5 text-center">
                    <h3 className="text-danger text-center">We Apologize, but the city your requested is not available at the moment</h3>
                    <Link to={"/municipality-selection"} style={{color: '#2333ff', fontSize:'20px'}}>Return </Link>
                </div>
            </section>
        );
    }
}

export default RootCityNotFound;
