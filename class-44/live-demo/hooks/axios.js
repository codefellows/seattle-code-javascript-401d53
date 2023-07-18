import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = (config) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    const initialGet = async () => {
      try {
        let res = await axios(config);
        setResponse(res.data)
      } catch (e){
        setError(e)
      }
    }
    initialGet();
  }, []);

  const getPage = async (url) => {
    try {
      let res = await axios.get(url);
      setResponse(res.data)
    } catch (e){
      setError(e);
    }
  }

  return {...response, error, getPage}
};

export default useAxios;

