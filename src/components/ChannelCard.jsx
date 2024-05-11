import React from 'react'
import {Card} from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card
import { demoThumbnailUrl } from './shared/files'

const ChannelCard = ({channelDetail , channel: {id: {videoId}, snippet}}) => {
  return (
    
      <div>
      <Card 
            hoverable
            size='small'
            className='bg-black h-[300px] w-[270px] border-2 flex justify-center items-center flex-col gap-2'
            cover={<img alt={channelDetail?.snippet?.title}  src={channelDetail?.snippet?.thumbnails?.high?.url || demoThumbnailUrl} />} 
            >
          <Link to = { `/channel/${channelDetail?.id?.channelId}`}/>
          <Meta title= {<span className=' text-white font-extrabold'> {snippet?.channelTitle.slice(0, 60)} 
                        </span>} />
        </Card>
        </div>

  )
}

export default ChannelCard;
