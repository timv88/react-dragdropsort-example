import React, { Component } from 'react';
import Container from './Container';

export default class App extends Component {
  render() {
    return (
        <div>
            <h1>Dragging, dropping &amp; sorting.</h1>
            <Container />
        </div>
    );
  }
}
