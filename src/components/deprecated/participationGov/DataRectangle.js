import React, { Component } from 'react';
import './DataRectangle.css'
class DataRectangle extends Component {
    render() {
        return (
                <div className="row text-center"style={{padding:"2vh"}} >
                    <div className="col-sm-12">
                        <div className="color-box blue-grad">
                        <h2><span className="timer">{this.props.population}aa</span></h2>
                        <span className="count-desc">Population</span>
                        </div>
                    </div> {/* /.col-sm-3 */}

                    <div className="col-sm-12">
                    <div className="color-box pink-grad">
                        <h2><span className="timer">{this.props.chairs}aa</span></h2>
                        <span className="count-desc">Chair</span>
                    </div>
                    </div>{/* /.col-sm-3 */}

                    <div className="col-sm-12">
                    <div className="color-box green-grad">
                        <h2><span> {this.props.area}aa</span> Km²</h2>
                        <span className="count-desc">Area</span>
                    </div>
                    </div>{/* /.col-sm-3 */}

                    
                </div>
        );
    }
}

export default DataRectangle;