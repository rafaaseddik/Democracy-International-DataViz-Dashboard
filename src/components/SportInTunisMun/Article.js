import React, { Component } from 'react';
import './Article.css'
import Translate from 'react-translate-component';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    // console.log(dataSport);
    const DESCRIPTION = <Translate type='text' content='articleText.desc' />//Article and data collected by Barr al amen
    const LINK = <Translate type='text' content='articleText.link' />//Article Link

    return (
      <div className='container row'>
        <div className='col-md-offset-2'>
          <h4>{DESCRIPTION} <a href='http://news.barralaman.tn/tunmun-sport/' target="_blank">{LINK}</a></h4>
          <div className='col-md-12'>
            <a href="http://news.barralaman.tn/tunmun-sport/">
              <img src="https://i2.wp.com/news.barralaman.tn/wp-content/uploads/2018/04/tunmun_inf.jpg?resize=930%2C450 " alt="Article barlamen" style={{ marginTop: '20px',width:'100%' }} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

