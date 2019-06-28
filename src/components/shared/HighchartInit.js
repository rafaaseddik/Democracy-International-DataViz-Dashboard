import React, { Component } from 'react';

class HighchartInit extends Component {
componentDidMount() {
    this.chart = Highcharts.chart(
        this.refs.chart,
        this.props.options,
    )
    }
    componentWillUnmount() {
        this.chart.destroy();
    }
    
    render() {

        return (
            <div ref="chart" style={this.props.styles}/>
        );
    }
}

export default HighchartInit;