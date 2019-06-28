import React, { Component } from 'react';

export default class Rectangle extends Component {
    render() {
        return (
            <div>
                <div className="featured-item border-box hover brand-hover-light col-md-3" style={{ left: '1vh', padding: "15px 25px", marginBottom: '5vh' }}>
                    <div className="desc">
                        <h2 className="text-bold">{this.props.value}</h2>
                        <p>{this.props.title}</p>
                    </div>
                </div>

            </div>

        );
    }
}

