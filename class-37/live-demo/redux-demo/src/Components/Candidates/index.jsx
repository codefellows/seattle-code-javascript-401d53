import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { incrementVote, decrementVote } from '../../store/actions';
import { useEffect } from 'react';
import { getTodos } from '../../store/todo';

function Candidates() {
  // use state takes a callback
  // accesses redux state 
  // we can destructure what we need
  const { candidates, votes } = useSelector((state) => state);
  console.log('candidates', candidates);

  // to dispatch an action we'll use the useDispatch hook
  const dispatch = useDispatch();
  const handleChange = (candidate) => {
    dispatch(incrementVote(candidate));
  }

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      <h1>Total Candidate Votes: {votes}</h1>
      {
        candidates.map((candidate, index) => (
          <article key={`candidates-${index}`}>
            <h5>{candidate.name} has {candidate.votes} vote(s)</h5>
            <Button
              variant="contained"
              onClick={() => handleChange(candidate)}
            >
              Vote
            </Button>
            <Button
              variant="outlined"
              onClick={() => dispatch(decrementVote(candidate))}
            >
              Un-Vote
            </Button>
          </article>
        ))
      }
    </>
  )
}

export default Candidates;
