import React, { Component } from 'react';
import Button  from './component/button.js';

class Table extends React.Component {

    constructor(props) {
        super(props);
     }

    render() {

        return (
            <div className="table">
            {this.props.list.filter(isSearched(this.props.pattern)).map(item =>
              <div key={item.objectID} className="table-row">
                <span style={largeColumn}>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>
                  {item.author}
                </span>
                <span style={smallColumn}>
                  {item.num_comments}
                </span>
                <span style={smallColumn}>
                  {item.points}
                </span>
                <span style={smallColumn}>
                  <Button
                    onClick={() => this.props.onDismiss(item.objectID)}
                    className="button-inline"
                  >
                    Dismiss
                  </Button>
                </span>
              </div>
            )}
          </div>
        
        );

    }
}

export default Table;