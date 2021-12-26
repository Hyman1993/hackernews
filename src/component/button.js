import React, { Component } from 'react';

class Button extends React.Component {

    constructor(props) {
        super(props);
     }

    render() {

        return (
          <button
            onClick={this.props.onClick}
            className={this.props.className}
            type="button"
           >
            {this.props.children}
          </button>
        );

    }
}

export default Button;