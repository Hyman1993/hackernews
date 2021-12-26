import React, { Component } from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
     }

     render() {

        return (
            <form onSubmit={this.props.onSearchSubmit}>
            {this.props.children} <input
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <button type="submit">
              {this.props.children}
            </button>
          </form>
        );

    }
}

export default Search;