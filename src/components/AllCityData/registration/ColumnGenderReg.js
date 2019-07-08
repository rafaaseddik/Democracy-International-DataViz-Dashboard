import React, { Component } from 'react';
import HighchartInit from '../../shared/HighchartInit';
import counterpart from 'counterpart' ;

export default class ColumnGenderReg extends Component {
    constructor(props) {
        super(props);
        this.state = { option: {} }
    }
    componentWillMount() {
        this.setState({
            options: {
                chart: {
                    type: 'column'
                },
                credits:false,
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['']
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
                        var pcnt = (this.y / 71511) * 100;
                        return  Highcharts.numberFormat(pcnt) + '%';
                    }
                },
                plotOptions: {

                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                // get the number of the registered male and female from the _cityRegistration component and delete the , in the value string 
                series: [{
                    name: counterpart.translate('cityData.female'),
                    data: [parseFloat(this.props.registeredFemale.replace(/,/g, ''))],
                    color:'#d61d2f'
                }, {
                    name: counterpart.translate('cityData.male'),
                    data: [parseFloat(this.props.registeredMale.replace(/,/g, ''))],
                    color:'#03a9f4'
                }]
            }   
        }

        )
    }
    render() {
        return (
            <div className='col-md-12' >
                <HighchartInit styles={{height:'100%'}} options={this.state.options} />
            </div>
        );
    }
}
