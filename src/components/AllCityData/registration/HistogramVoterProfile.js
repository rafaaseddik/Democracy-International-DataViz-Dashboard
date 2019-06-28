import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';
import counterpart from 'counterpart';

class HistogramVoterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { options: {} }
    }

    componentWillMount() {
        let categories = ['18-24', '25-35', '36-50', '+50']

        //get the number of registered 18-24
        let reg18_24_m = 0; let reg25_35_m = 0; let reg36_50_m = 0; let regp51_m = 0;
        let reg18_24_f = 0; let reg25_35_f = 0; let reg36_50_f = 0; let regp51_f = 0;
        let totalNumber=0;let maleFemaleHistogram;

        (this.props.data).map((element) => {
            reg18_24_m += parseInt(element.m_18_21) + parseInt(element.m_22_24);
            reg25_35_m += parseInt(element.m_25_35);
            reg36_50_m += parseInt(element.m_36_50);
            regp51_m += parseInt(element.m_p51);

            reg18_24_f += parseInt(element.f_18_21) + parseInt(element.f_22_24);
            reg25_35_f += parseInt(element.f_25_35);
            reg36_50_f += parseInt(element.f_36_50);
            regp51_f += parseInt(element.f_p51);

            totalNumber+=parseInt(element.sum) ;
        })
        maleFemaleHistogram=[reg18_24_m+reg18_24_f,reg25_35_m +reg25_35_f,reg36_50_m+reg36_50_f,regp51_m+regp51_f ]

        this.setState({
            options: {
                chart: {
                    type: 'bar',
                    backgroundColor: 'rgba(255, 255, 255, .6)'
                },
                title: {
                    text: '',
                },
                credits: false,
               
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                               // console.log(this);
                                let positiveNum = this.y
                                if (positiveNum < 0) {
                                    positiveNum = this.y * (-1)
                                }
                                return (positiveNum);
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            counterpart.translate('cityData.population')+ ': <b>' + Highcharts.numberFormat(Math.abs(this.point.y), 0) + '</b><br/>' +
                            counterpart.translate('cityData.totalNumber') +this.point.category+ ': <b>' + maleFemaleHistogram[this.point.index] + '</b>'
                            ;
                    }
                },

                series: [{
                    name: counterpart.translate('cityData.male'),
                    data: [-reg18_24_m, -reg25_35_m, -reg36_50_m, -regp51_m],
                    color: "#5895c5"
                }, {
                    name: counterpart.translate('cityData.female'),
                    data: [reg18_24_f, reg25_35_f, reg36_50_f, regp51_f],
                    color: "#d56147"
                }]
            }
        });
    }

    render() {
        return (
            <div style={{ position: "absolute!important" }} >
                <HighchartInit options={this.state.options} /* styles={{ height: "75vh" }} */ />
            </div>
        );
    }
}

export default HistogramVoterProfile;