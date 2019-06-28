import React, { Component } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import './ZigzagMenu.css';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

class ZigzagMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { linkActiveness:['active', '', ''] }
    }


    handleLinkClick(clicked) {
        console.log(clicked);
        let linkActiveness  = ['', '', '']
        switch (clicked) {
            case 'boxes':
                linkActiveness = ['active', '', '']
                this.setState({ linkActiveness });
                this.props.getVizType(clicked)
                break;
            case 'map':
                linkActiveness = ['', 'active', '']
                this.setState({ linkActiveness });
                this.props.getVizType(clicked)
                break;
            case 'article':
                linkActiveness = ['', '', 'active']
                this.setState({ linkActiveness });
                this.props.getVizType(clicked)

                break;
        }
    }

    render() {
        const BOXES = <Translate type='text' content='zigzagMenu.boxes' />//boxes
        const MAP = <Translate type='text' content='zigzagMenu.map' />//map
        const ARTICLE = <Translate type='text' content='zigzagMenu.article' />//article
        let linkActiveness=this.state.linkActiveness;
        return (
            <ul className="menuZ ">
                <li className={linkActiveness[0]} onClick={this.handleLinkClick.bind(this, 'boxes')}><a href='#'>{BOXES}</a></li>
                <li className={linkActiveness[1]} onClick={this.handleLinkClick.bind(this, 'map')}><a href='#'>{MAP}</a></li>
                <li className={linkActiveness[2]} onClick={this.handleLinkClick.bind(this, 'article')}><a href='#'>{ARTICLE}</a></li>
            </ul>
        );
    }
}

export default ZigzagMenu;