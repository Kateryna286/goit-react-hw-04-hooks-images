import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';

export default class App extends Component {
  state = {
    keyWord: '',
  };

  formSubmitHandler = data => {
    this.setState({ keyWord: data });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery keyWord={this.state.keyWord} />
      </div>
    );
  }
}

//my key 22564694-3177f5daba1f2572eee652a36;
