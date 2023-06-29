import React from 'react';

import Todo from './Components/Todo';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SettingsForm from './Components/SettingsForm';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Todo />
        <SettingsForm />
        <Footer />
      </>
    );
  }
}
