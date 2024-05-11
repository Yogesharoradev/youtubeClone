import React, { useState } from 'react'
import { logo } from './shared/files'
import { Input , Tooltip } from 'antd';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const navigate = useNavigate()


  const gotomain=()=>{
    navigate('/');
  };
  
  const handleSubmit =(e) =>{
    e.preventDefault();
    if(searchTerm) {
      navigate(`/search/${searchTerm}`)
      setSearchTerm('')
    }
  }
  
  const [searchTerm , setSearchTerm] = useState('')
  return (
    <div className='min-h-[70px] bg-black'>
    <div className='flex items-center justify-between gap-20'>
     <button className='ml-10 mt-3 mb-3' onClick={gotomain}> 
      <img src={logo} alt="logo" height={80} width={60} />
      </button>
      <div className='flex items-end mr-20 w-[300px]'>
            <Input placeholder="Search Here" size='large' value={searchTerm} onPressEnter={handleSubmit}
                   onChange={(e)=>setSearchTerm(e.target.value)}
            suffix = {<Tooltip color='red' title='Search'> <button onSubmit={handleSubmit}><CiSearch color='red' /></button></Tooltip>}/>;
      </div>
    </div>
    </div>
  )
}

export default Navbar
