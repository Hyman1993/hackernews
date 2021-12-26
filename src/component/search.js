import React, { Component } from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
     }

     render() {

        return (
            <form>
            {this.props.children} <input
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
            />
          </form>
        );

    }
}

export default Search;