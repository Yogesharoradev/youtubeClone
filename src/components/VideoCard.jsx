import React from 'react'
import {Link } from 'react-router-dom'
import { demoChannelTitle, demoProfilePicture ,demoVideoTitle,
demoVideoUrl,demoThumbnailUrl } from './shared/files'
import { Card } from 'antd';
const { Meta } = Card;
import { FaRegCheckCircle } from "react-icons/fa";


const VideoCard = ({video: {id: {videoId}, snippet}}) => {
  return (
    <div>
        
        <Link to = {videoId ? `/video/${videoId}` : demoVideoUrl }>
      <Card  size='small'
            className='bg-gray-900 h-[300px] w-[270px] border-0 '
            cover={<img alt={snippet?.title}  src={snippet?.thumbnails?.high?.url || demoProfilePicture} />} 
            >
         
          <Meta  title={ <span className='text-white font-bold'> {snippet?.title.slice(0, 60) || {demoVideoTitle}} </span>} / >
        
         
          <Meta  title={ <span className='text-gray-300 flex gap-2 items-center'> {snippet?.channelTitle.slice(0, 60) || {demoChannelTitle}} 
          < FaRegCheckCircle color='white'  className='mt-1'/></span> }/ >
          
      
      </Card>
      </Link>
      
    </div>
  )
}

export default VideoCard
