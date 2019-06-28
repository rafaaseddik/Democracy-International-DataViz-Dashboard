import React, { Component } from 'react';

export default class Rectangle extends Component {
    render() {
        return (
            <div className="featured-item border-box hover brand-hover-light" style={{ padding: "15px 25px", marginBottom:'5vh' }}>
                <div className="desc">
                    <h2 className="text-bold">{this.props.value}</h2>
                    <p>{this.props.title}</p>
                </div>
            </div>
        );
    }
}

