import React, { Component } from 'react';


import Translate from 'react-translate-component';

export default class WaffleChairs extends Component {
    render() {
        let arrayOfSvg = [];
        //we sort the data array to show the seats in an organized way nahdha then nida ...
        let ResultsData = this.props.data.sort((a, b) => (parseInt(a.votes_obtenus) < parseInt(b.votes_obtenus)) ? 1 : ((parseInt(b.votes_obtenus) < parseInt(a.votes_obtenus)) ? -1 : 0));
        const SEATS = <Translate type='text' content='cityResultsList.seats' />

        return (
            <div >
                {
                    ResultsData.map(function (element, index) {

                        for (let i = 0; i < parseInt(element.sieges_obtenus); i++) {
                            //find in randomColor array the party in question and get its color
                            let fillColor = '#fff'
                            if ((this.props.randomColors).length != 0) {
                                let obj=this.props.randomColors.find(x => x.nom_liste_fr === element.nom_liste_fr)
                                let index = this.props.randomColors.indexOf(obj)
                                fillColor=this.props.randomColors[index].color
                                console.debug('ffff',fillColor);
                            }
                            arrayOfSvg.push(
                                <div className="tooltipRectangle col-md-1">
                                    <svg  key={this.props.keyy+index} height="10vh" style={{ marginTop: '1.5vh' }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.813 482.813" enableBackground="new 0 0 482.813 482.813">
                                        <path style={{ fill: fillColor }} d="m360.397,243.813h-7.49v-122.994c3.567-1.146 6.919-2.983 9.848-5.469 6.452-5.478 10.152-13.475 10.152-21.941v-55.56c0-14.006-9.999-25.939-23.774-28.374-71.482-12.633-143.969-12.633-215.451,0-13.775,2.435-23.774,14.368-23.774,28.374v55.56c0,8.466 3.7,16.463 10.152,21.941 4.527,3.844 10.061,6.142 15.848,6.708v121.756h-13.491c-14.061,0-25.499,11.439-25.499,25.5v3.771c0,14.061 11.438,25.5 25.499,25.5h3.225v176.729c0,4.142 3.357,7.5 7.5,7.5h28.724c4.143,0 7.5-3.358 7.5-7.5v-70.671h150.714v70.671c0,4.142 3.357,7.5 7.5,7.5h28.724c4.143,0 7.5-3.358 7.5-7.5v-176.963c12.456-1.67 22.096-12.36 22.096-25.266v-3.771c-0.003-14.061-11.442-25.501-25.503-25.501zm-66.157,0v-127.681c5.894,0.519 11.783,1.125 17.667,1.818v125.863h-17.667zm-58.667,0v-129.982c5.889-0.057 11.778-0.027 17.667,0.089v129.894h-17.667zm-58.666-.001v-126.539c5.884-0.634 11.773-1.181 17.666-1.64v128.18h-17.666zm32.666-129.165c3.666-0.194 7.333-0.352 11-0.479v129.644h-11v-129.165zm58.667-.242c3.667,0.164 7.334,0.358 11,0.589v128.817h-11v-129.406zm58.667,5.494c3.669,0.525 7.336,1.089 11,1.682v122.231h-11v-123.913zm-202-26.492v-55.56c1.42109e-14-6.716 4.788-12.437 11.386-13.603 34.874-6.164 69.994-9.246 105.114-9.246s70.24,3.082 105.114,9.246c6.598,1.166 11.386,6.887 11.386,13.603v55.56c0,4.054-1.771,7.884-4.86,10.506-3.103,2.634-7.193,3.765-11.216,3.104-66.637-10.956-134.211-10.957-200.848,0-4.028,0.661-8.112-0.47-11.216-3.104-3.089-2.623-4.86-6.452-4.86-10.506zm26,27.233c3.664-0.556 7.331-1.082 11-1.57v124.742h-11v-123.172zm3.457,347.171h-13.724v-169.228h13.724v169.228zm165.714-104.686h-150.714v-64.542h150.714v64.542zm-150.714,26.515v-11.515h150.714v11.515h-150.714zm165.714,78.171v-169.228h13.724v169.229h-13.724zm35.819-194.729c0,5.79-4.71,10.5-10.5,10.5h-237.981c-5.789,0-10.499-4.71-10.499-10.5v-3.771c0-5.79 4.71-10.5 10.499-10.5h237.981c5.79,0 10.5,4.71 10.5,10.5v3.771z" />
                                    </svg>
                                    <div className="inner"></div>
                                    <div className="tooltiptextUnemp">
                                        <h5 >{element.nom_liste_fr}</h5>
                                        <h5 >{element.sieges_obtenus} {SEATS}</h5>
                                    </div>
                                </div>
                            )
                        }

                    },this)
                }
                {
                    arrayOfSvg.map(function (element, index) {
                        return (
                            element
                        )
                    })
                }
            </div>
        );
    }
}
