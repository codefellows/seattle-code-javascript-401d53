import { useEffect } from 'react';

function Content(){

  // greedy at first, BUT we add a return for unmount
  // takes ina  callback, then tho achieve unmount functionality, use a return in the callback (that returns a callback)
  // specifically we want to RETURN a callback
  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log('Content Mounted, and running...')
    }, 1000);
    return () => {
      console.log('Component Unmounted!!!  not running anymore!');
      clearInterval(intervalId);
    }
  });
  return (
    <>
      <p>I am the component that is running some process</p>
    </>
  )
}

export default Content;
