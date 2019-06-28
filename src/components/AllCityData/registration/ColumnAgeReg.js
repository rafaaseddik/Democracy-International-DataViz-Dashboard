import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';
import counterpart from 'counterpart';

export default class ColumnAgeReg extends Component {
    constructor(props) {
        super(props);
        this.state = { option: {} }
    }
    componentWillMount() {
        //get the number of registered 18-24
        let reg18_24 = 0; let reg25_35 = 0; let reg36_50 = 0; let regp51 = 0;
        (this.props.data).map((element) => {
            reg18_24 += parseInt(element.m_18_21) + parseInt(element.f_18_21) + parseInt(element.m_22_24) + parseInt(element.f_22_24);
            reg25_35 += parseInt(element.m_25_35) + parseInt(element.f_25_35);
            reg36_50 += parseInt(element.m_36_50) + parseInt(element.f_36_50);
            regp51 += parseInt(element.m_p51) + parseInt(element.f_p51);
        })
        var totalReg=reg18_24+reg25_35+reg36_50+regp51;

        this.setState({
            options: {
                chart: {
                    type: 'column'
                },
                credits: false,
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [counterpart.translate('cityData.ageTranches')]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: counterpart.translate('cityData.regnumber')
                    }
                },
                tooltip: {

                    headerFormat: '<b>{this.name}</b><br/>',
                    formatter: function () {
                        var pcnt = (this.y / totalReg) * 100;
                        return Highcharts.numberFormat(pcnt) + '%';
                    }
                },
                plotOptions: {

                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },

                series: [{
                    name: '18-24',
                    data: [reg18_24],
                    color: '#D3EEE7'
                }, {
                    name: '25-35',
                    data: [reg25_35],
                    color: '#FFDCD2'
                },
                {
                    name: '36-50',
                    data: [reg36_50],
                    color: '#F6D84B'
                }, 
                {
                    name: 'plus 50',
                    data: [regp51],
                    color: '#FD6B54'
                }]
            }
        }

        )
    }
    render() {
        return (
            <div className='col-md-12' >
                <HighchartInit   styles={{ height: '360px' }} options={this.state.options} />
            </div>
        );
    }
}