import React from 'react';

import Todo from './Components/Todo';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Todo />
        <Footer />
      </>
    );
  }
}
