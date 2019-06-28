import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import './ZigzagMenu.css';
import Translate from 'react-translate-component';

class ZigzagMunicipalityMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { linkActiveness: ['active', '', ''],resultLinkActiveness:['','',''] }
    }


    handleLinkClick(clicked) {
        console.log(clicked);
        let linkActiveness = ['', '', ''];
        let resultLinkActiveness=['', '', ''];
        switch (clicked) {
            case 'registration':
                linkActiveness = ['active', '', ''];
                resultLinkActiveness = ['', '', ''];
                this.setState({ linkActiveness,resultLinkActiveness });
                this.props.getVizType(clicked);
                break;
            case 'turnout':
                linkActiveness = ['', 'active', ''];
                resultLinkActiveness = ['', '', ''];
                this.setState({ linkActiveness,resultLinkActiveness });
                this.props.getVizType(clicked);
                break;
            case 'listResults':
                linkActiveness = ['', '', 'active'];
                resultLinkActiveness = ['active', '', ''];
                this.setState({ linkActiveness,resultLinkActiveness });
                this.props.getVizType(clicked);
                break;
            case 'neighborResult':
                linkActiveness = ['', '', 'active'];
                resultLinkActiveness = ['', 'active', ''];

                this.setState({ linkActiveness,resultLinkActiveness });
                this.props.getVizType(clicked);
                break;
            case 'electedCouncil':
                linkActiveness = ['', '', 'active'];
                resultLinkActiveness = ['', '', 'active'];

                this.setState({ linkActiveness,resultLinkActiveness });
                this.props.getVizType(clicked);
                break;
        }
    }

    render() {
        const REGISTRATION = <Translate type='text' content='cityData.registration' />//registration
        const TURNOUT = <Translate type='text' content='cityData.turnout' />//turnout
        const RESULTS = <Translate type='text' content='cityData.results' />//results
        const LISTSRESULTS = <Translate type='text' content='cityData.partyresults' />//results per list
        const NEIGHBORHOOD = <Translate type='text' content='cityData.neighbhor' />//results per list
        const ELECTEDCouncil = <Translate type='text' content='cityData.electedCouncil' />//results per list
        let {resultLinkActiveness,linkActiveness}=this.state
        return (
            <ul className="menuZ ">
                <li className={linkActiveness[0]} onClick={this.handleLinkClick.bind(this, 'registration')}><a href='#'>{REGISTRATION}</a></li>
                <li className={linkActiveness[1]} onClick={this.handleLinkClick.bind(this, 'turnout')}><a href='#'>{TURNOUT}</a></li>
                <li className={linkActiveness[2]} onClick={this.handleLinkClick.bind(this, 'listResults')}><a href="#">{LISTSRESULTS}</a></li>

               {/*  <li className={linkActiveness[2]} style={{ zIndex: '1' }}>
                    <a href="#">{RESULTS}</a>
                    <ul className="submenuZ">
                        <li className={resultLinkActiveness[0]} onClick={this.handleLinkClick.bind(this, 'listResults')}><a href="#">{LISTSRESULTS}</a></li>
                        <li  className={resultLinkActiveness[1]} onClick={this.handleLinkClick.bind(this, 'neighborResult')}><a href="#">{NEIGHBORHOOD}</a></li>
                        <li  className={resultLinkActiveness[2]} onClick={this.handleLinkClick.bind(this, 'electedCouncil')}><a href="#">{ELECTEDCouncil}</a></li>
                    </ul>
                </li> */}
            </ul>
        );
    }
}

export default ZigzagMunicipalityMenu;