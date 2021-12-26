import React, { Component } from 'react';
import './App.css';
import Button  from './component/button.js';
import Search from './component/search';

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '100';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result:null,
      searchTerm: DEFAULT_QUERY,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  }

  setSearchTopStories(result) {
      const { hits, page } = result;
      const oldHits = page !== 0
      ? this.state.result.hits
      : [];
      const updatedHits = [
      ...oldHits,
      ...hits
      ];
      this.setState({
      result: { hits: updatedHits, page }
      });
    }

  fetchSearchTopStories(searchTerm,page=0) {
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => console.error(e));
 }

  componentDidMount() {
      const { searchTerm } = this.state;
      this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    if(!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSearchSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        { result &&
        <Table
          list={result.hits}
          onDismiss={this.onDismiss}
        />
        }

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
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
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

export default App;