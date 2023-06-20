import React from 'react';
import Header from './Components/Header';
import Content from './Components/Content';
import Article from './Components/Article';

class App extends React.Component {

  changeTitle = (newTitle) => {
    // you can do multiple things here
    document.title = newTitle;
  };
  
  render() {
    // let moreComplexObject = {
    //   changeTitle: this.changeTitle,
    //   weather: 'rainy'
    // }
    return (
      <>
        <Header greeting="401d53" />
        {/* <Content ourObject={moreComplexObject} /> */}
        <Content 
          changeTitle={this.changeTitle} 
          weather="rainy" 
        />
        <Article />

      </>
    );
  }
}

export default App;
