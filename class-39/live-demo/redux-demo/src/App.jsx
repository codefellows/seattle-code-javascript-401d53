import CandidateDetails from './Components/CandidateDetails';
import Candidates from './Components/Candidates'

import Header from './Components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Candidates />} />
        <Route path="/candidate/:id" element={<CandidateDetails />} />
      

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
