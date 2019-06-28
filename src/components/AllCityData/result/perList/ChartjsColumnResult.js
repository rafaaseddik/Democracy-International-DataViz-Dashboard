import React, { Component } from 'react';
var Chart = require("chart.js");
import counterpart from 'counterpart';
import 'chartjs-plugin-datalabels'
var randomColor = require('randomcolor');

export default class ChartjsColumnResult extends Component {
    componentDidMount() {
        //calculate number of votes for each party and put it in array
        let labelArray = [], dataArray = [], colorArray = [], allArray = [], obj = {};
        var totalValid = this.props.data[0].total_votes_valide;
        for (let i = 0; i < (this.props.data).length; i++) {
            const element = this.props.data[i];
            obj.nom_liste_fr = element.nom_liste_fr;
            obj.nom_liste_ar = element.nom_liste_ar;
            obj.votes_obtenus = parseInt(element.votes_obtenus);
            if (element.nom_liste_fr === 'Ennahdha') { obj.color = '#5FC8F8' }
            else if (element.nom_liste_fr === 'Nidaa Tounes') { obj.color = '#FD6B54' }
            else if (element.nom_liste_fr === 'Courant Démocrate') { obj.color = '#F6D84B' }
            else {
                obj.color = randomColor()
            }
            allArray.push(obj)
            obj = {}
        }
        //send back the 
        this.props.getUsedColor(allArray);
        //sorting array
        allArray.sort((a, b) => (a.votes_obtenus < b.votes_obtenus) ? 1 : ((b.votes_obtenus < a.votes_obtenus) ? -1 : 0));
        for (let i = 0; i < allArray.length; i++) {
            const element = allArray[i];

            if (counterpart.getLocale() === 'ar') {
                labelArray.push(element.nom_liste_ar);
            } else {
                labelArray.push(element.nom_liste_fr);
            }

            dataArray.push(parseInt(element.votes_obtenus));
            colorArray.push(element.color)
        }

        const node = this.node;

        var myChart = new Chart(node, {
            type: "horizontalBar",
            data: {
                labels: labelArray,
                datasets: [
                    {
                        label: counterpart.translate('cityResultsList.validVotes'),
                        data: dataArray,
                        backgroundColor: colorArray
                    }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {

                        label: function (tooltipItem, data) {
                            //console.log(colorArray[0], totalValid);
                            return counterpart.translate('cityResultsList.votesPer') + (tooltipItem.xLabel * 100 / parseInt(totalValid)).toFixed(2) + ' %'
                        }
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 0
                    }
                },
                plugins: {
                    datalabels: {
                        color: 'black',
                        formatter: function (value, context) {
                            return value + ' votes';
                        },
                        font: {
                            weight: 'bold'
                        },

                    }
                }
            },
            onAnimationComplete: function () {
            }
        });
    }
    render() {

        return (
            <div>
                <canvas
                    ref={node => (this.node = node)}
                />
            </div>

        );
    }
}

