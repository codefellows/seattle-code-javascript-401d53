// Steps to creating a function component
// 1. declare a function
// 2. to return some jsx
// 3. export the function

 function Header(props){
  // let { greeting } = props;   // also can destructure
  return (
    <header>
      <h1 data-testid="header-h1">Hello {props.greeting}</h1>
    </header>
  )
 };

export default Header;
