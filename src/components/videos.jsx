import React from 'react'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import { Skeleton } from 'antd';


const Videos = ({videos , direction}) => {
  if(!videos?.length) return <Skeleton active/>;
  return (
    <div className= {direction || 'md:grid md:grid-cols-4 md:gap-7 flex flex-col items-center'}>
      {
        videos.map((item,idx)=>(
          <div  key={idx}>
            {item.id.videoId && <VideoCard video={item}/>}
            {item.id.channelId && <ChannelCard channel={item}/>}
          
          </div>
        ))
      }
    </div>
  )
}

export default Videos
