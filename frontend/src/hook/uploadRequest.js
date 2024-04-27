import axios from 'axios';
import React, { useState } from 'react'

const uploadRequest = () => {
  const [loading, setLoading] = useState();
  const upload = async(file) => {
    setLoading(true)
    try{
      const token = localStorage.getItem('online-user')
        const formData = new FormData();
        formData.append('file', file)
        console.log('file on frontend :', file)
        const res = await axios.post('http://localhost:8000/api/uploadProfile/uploadProfile', 
        formData,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`
        }
    })
        const data = res.data;
        if(data.error){
            throw new Error("fail on server upload", + data.error)
        }

    }catch(error){
        console.log("fail to on client upload", error.message)
    }finally{
        setLoading(false)
    }
  }
  return {upload, loading}
}

export default uploadRequest