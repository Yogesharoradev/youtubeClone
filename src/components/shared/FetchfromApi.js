import axios from "axios";

 export const BASE_URL =  'https://youtube-v31.p.rapidapi.com'

const options = {
    
    url:  BASE_URL ,
    params: {
      maxResults : "50"
    },
    headers: {
      'X-RapidAPI-Key':   'ae2eb78916msh41ff6ff7c8e4bb3p1d8de4jsn27b9cd6bde36',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

  export const FetchfromApi = async (url)=>{
   const {data} =  await axios.get(`${BASE_URL}/${url}`, options)
   return data;
  }