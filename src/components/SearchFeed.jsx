import React, { useState , useEffect } from 'react'
import { FetchfromApi } from './shared/FetchfromApi'
import { useParams } from 'react-router-dom'
import { Layout} from 'antd';
const {Content} = Layout
import Videos from './videos';
import { Header } from 'antd/es/layout/layout';



const SearchFeed = () => {

  const [videos,setVideos] = useState()
  const {searchTerm} = useParams();

useEffect (()=>{
  FetchfromApi(`search?part=snippet&q=${searchTerm}`)
  .then((data)=>setVideos(data.items))
},[searchTerm])

  return (
    <Layout className='min-h-[600px] bg-black text-white'>
    <Header className='bg-black'> 
    
     <h1 className='text-red-600 text-[30px] font-bold  md:p-5'>
    Search Results For   <span className='text-white'> {searchTerm} </span> Videos</h1>
      </Header>
    <Content className='bg-black text-white mt-20'>
        {<Videos videos={videos} />}
    </Content>
  </Layout>
  )
}

export default SearchFeed
