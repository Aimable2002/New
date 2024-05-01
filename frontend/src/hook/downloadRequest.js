import axios from 'axios';
import React, { useState } from 'react'

const downloadRequest = () => {
  const [loading, setLoading] = useState();
  const download = async(url) => {
    setLoading(true);
    try{
        const res = await axios.get('http://localhost:8000/api/download/', {
          params: {
            videoURL: 'https://youtu.be/NWdrO4BoCu8?si=2N-3S2ygZJ63jDvn'
          }
        })
         
        const data = res.data;
        console.log("video downloaded :", data)
    }catch(error){
        console.log("fail in download :", error.message);
    
    }finally{
        setLoading(false)
    }
  }
  return {loading, download}
}

export default downloadRequest