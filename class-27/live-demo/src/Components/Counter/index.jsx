import { useState } from 'react';

function Counter () {
  // clicks:  actual state
  // setClicks:  the function we use too update the actual state
  const [clicks, setClicks] = useState(0);
  const [factorOfFive, setFactorOfFive] = useState(false);

  const updateCounter = () => {
    let newCount = clicks +1;
    setClicks(newCount);
    setFactorOfFive(newCount % 5 === 0);
  }

  return (
    <>
      <h2>Button has been clicked {clicks} time(s)</h2>
      <h2>Factor of Five? {factorOfFive.toString()}</h2>
      <button onClick={updateCounter}>Update Clicks</button>
    </>
  )
}

export default Counter;
