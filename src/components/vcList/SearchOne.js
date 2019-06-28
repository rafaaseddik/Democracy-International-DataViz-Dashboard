import React, { Component } from 'react';
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class SearchOne extends Component {
    render() {

        return (
            <div className="col-sm-12">
            <form className="form-inline" onSubmit={this.props.handleFormSubmit}>
              <div className="row">
                <div className="col-xs-8 col-sm-10">

                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                      {/*<div className="holder">{test}</div>*/}
                    <input type="text" placeholder="Adress..." className="form-control input-lg" id="address" ref={this.props.setSearchInputElement} required />
                  </div>

                </div>
                <div className="col-xs-4 col-sm-2">
                  <button type="submit" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>

                </div>
              </div>
            </form>

          </div>
        );
    }
}

export default SearchOne;