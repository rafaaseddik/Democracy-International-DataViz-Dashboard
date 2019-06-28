import React, { Component } from 'react';
import '../../partyCode.css'
var randomColor = require('randomcolor');

class PartyCard extends Component {
    render() {
        let data = this.props.data
        return (
            <div className="featured-item-NoHover border-box  col-md-4" style={{ left: '1vh', padding: "15px 25px", marginBottom: '5vh', minHeight: '30vh' }}>
                <div className="desc">
                    <h3>{data.name + ' ' + data.surname}</h3>
                    <p className="title-card">Rank in list <b>{data.list_rank}</b></p>
                    {
                        /*   data.list_name == 'Ennahdha' ?
                              <h4 style={{ color:'#5FC8F8'}}>{data.list_name}</h4> :
                              data.list_name == 'Nidaa Tounes' ?
                                  <h4 style={{ color:'#FD6B54'}}>{data.list_name}</h4> :
                                  <h4 style={ {color:this.props.color}}>{data.list_name}</h4> */

                    }
                    <h4 style={ {color:this.props.color}}>{data.list_name}</h4>
                    <div style={{ textAlign: 'center' }}>
                        {data.fb_link != '/' ?
                            <a href={data.fb_link} target='blank' ><i className="fa fa-facebook"></i></a>
                            :
                            <a href="#"><i className="fa fa-facebook" style={{ color: 'red' }}></i></a>

                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default PartyCard;