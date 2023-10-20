import { useState, useEffect } from "react";
import axios from 'axios';

const useFetch=(endpoint, quary)=>{
    const [data,setData]=useState([])
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...quary},
        headers: {
          'X-RapidAPI-Key': 'eed226e078mshb3eead71d41e96bp1469c2jsncf5a7b942c49',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };


      const fetchData= async ()=>{
        setIsLoading(true);

        try {

            const response= await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
            
        } catch (error) {
            setError(error);
            alert('There is error!')
            
        } finally{
            setIsLoading(false);

        }
      }

      useEffect(()=>{
        fetchData();
      },[]);

      const refetch=()=>{
        setIsLoading(true);
        fetchData()
      }

      return {data, isLoading ,error , refetch}
}

export default useFetch;
