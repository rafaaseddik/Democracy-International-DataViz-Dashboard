import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import './Menu.css';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: 'Language'}
    }
    componentWillMount() {
        //counterpart.getLocale();
        //counterpart.setLocale('ar');
    }
    handleChangeDropdown(eventkey, event) {
        console.log(eventkey, event.target.innerText)
        this.setState({ eventkey, dropdown: event.target.innerText })
        counterpart.setLocale(eventkey);
    };

    render() {
        const VIZ = <Translate type='text' content='navbar.viz' />//General
        const ABOUT = <Translate type='text' content='navbar.about' />//Mun Map
        const CONTACT = <Translate type='text' content='navbar.contact' />//Mun Map
        const ENGLISH = <Translate type='text' content='language.english' />//Mun Map
        const ARABIC = <Translate type='text' content='language.arabic' />//Mun Map
        const FRENCH = <Translate type='text' content='language.french' />//Mun Map

        return (
            <div>
                <div onClick={this.props.openMenu} className="menu-icon">
                    <span className="menu-icon__line menu-icon__line-left"></span>
                    <span className="menu-icon__line"></span>
                    <span className="menu-icon__line menu-icon__line-right"></span>
                </div>

                <div className="nav" style={{zIndex:130}} >
                    <div className="nav__content" style={{zIndex:130,visibility:this.props.visibility}}>
                        <ul className="nav__list">
                            <li className="nav__list-item"><Link className={this.props.activeViz} to="/" >{VIZ}</Link></li>
                            <li className="nav__list-item"><Link className={this.props.activeAbout} to="/about" >{ABOUT}</Link></li>
                            <li className="nav__list-item"><Link className={this.props.activeContact} to="/contact" >{CONTACT}</Link></li>
                        </ul>
                    </div>
                </div>
               {/*  <div style={{ position: 'absolute', right: 0, margin: '30px' }}>
                    <DropdownButton
                        title={this.state.dropdown}
                        pullRight
                        onSelect={this.handleChangeDropdown.bind(this)}
                    >
                        <MenuItem eventKey="en">{ENGLISH}</MenuItem>
                        <MenuItem eventKey="ar">{ARABIC}</MenuItem>
                        <MenuItem eventKey="fr">{FRENCH}</MenuItem> 
                    </DropdownButton>
                </div> */}





            </div>
        );
    }
}

export default Menu;