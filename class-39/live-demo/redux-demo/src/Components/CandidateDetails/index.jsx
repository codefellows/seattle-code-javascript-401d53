import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function CandidateDetails() {
   let { id } = useParams();
   let { candidates } = useSelector(state => state);

   const activeCandidate = candidates.find(candidate => candidate._id === id);
   console.log('active candidate', activeCandidate);

  return (
    <>
      {/* <h1>Hello</h1> */}
      <h4>The Active Candidate is {activeCandidate.name}</h4>
    </>
  )
}


export default CandidateDetails;
