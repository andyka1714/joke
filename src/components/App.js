import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  searchRandomJoke,
  searchCategories,
  searchJoke
} from '../actions'
import './App.css';

class App extends Component {
  constructor(props) {
       super(props)

       this.state = {
           searchQuery: '',
       }

   }
   search = () => {
    const { searchRandomJoke, searchCategories, searchJoke } = this.props;
    if(this.state.searchQuery === 'random'){
      searchRandomJoke();
    }else if(this.state.searchQuery === 'categories'){
      searchCategories();
    }else{
      searchJoke(this.state.searchQuery);
    }
   }

   setSearchQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
   }

   moveQuery = () => {
    const query = localStorage.getItem(this.state.searchQuery)
    if(!!query){
      localStorage.removeItem(this.state.searchQuery);
      alert("This query is remove~")
    }else{
      alert("This query isn't in local!")
    }
   }

  render () {
    const {jokeList, categories} = this.props;
    return (
      <div className="App">
        <img className="logo" alt="Chuck Norris Jokes Api - JSON API for random Chuck Norris jokes" src="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small.png" srcSet="https://assets.chucknorris.host/img/chucknorris_logo_coloured_small@2x.png 720w" />
        <div className="search-block">
          <input type="text" className="search-input" onChange={ this.setSearchQuery } placeholder="Pleace type your query~"/>
          <button onClick={this.search} className="search-button">search</button>
          <button onClick={this.moveQuery} className="remove-button">remove query</button>
        </div>
        <div className="joke-list">
          <ul>
            { this.state.searchQuery === 'categories' ?
                categories.map((category, index) => {
                return (
                  <li key={index}>
                    <p>{category}</p>
                  </li>
                  )
              })
              : jokeList.map((joke, index) => {
                return (
                  <li key={index}>
                    <img src={joke.icon_url} alt="icon"/>
                    <span className="line"></span>
                    <p>{joke.value}</p>
                  </li>
                  )
              })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchRandomJoke: () => {
      dispatch(searchRandomJoke());
    },
    searchCategories: () => {
      dispatch(searchCategories());
    },
    searchJoke: (query) => {
      dispatch(searchJoke(query));
    },
  };
};

const mapStateToProps = (state) => ({
  jokeList: state.joke.jokeList,
  categories: state.joke.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
