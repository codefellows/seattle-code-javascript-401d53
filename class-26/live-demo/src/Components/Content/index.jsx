function Content(props) {
  // changeTitle will be sent as a property
  // let { changeTitle, weather } = props.ourObject;
    let { changeTitle, weather } = props;


  return (
    <>
      <h4 data-testid="content-h4">Let's make changes!</h4>
      <button onClick={() => changeTitle('It worked')}>Change Title</button>
      <p>The weather is {weather}</p>
    </>
  )
}

export default Content;
