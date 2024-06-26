import React, {useState , useEffect} from 'react'
import { Link , useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import Videos from './videos';
import { FetchfromApi } from './shared/FetchfromApi';
import Layout, { Content } from 'antd/es/layout/layout';
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import {FacebookShareButton ,InstapaperShareButton, TwitterShareButton} from 'react-share'

import { Button , Modal, Tooltip , Skeleton} from "antd";
import {  DislikeOutlined, FacebookOutlined, InstagramOutlined, LikeOutlined, TwitterOutlined } from '@ant-design/icons';





const VideoDetail = () => {

    const {id} = useParams()
    const [videoDetail , setVideoDetail]= useState(null)
    const[video,setVideo] = useState(null)
    const[comments, setComments]=useState([])
    const[modalOpen , setModalOpen] = useState(false)


    const openModal = ()=>{
        setModalOpen(true)
    }
    const handleOk = () => {
        setModalOpen(false);
      };
      const handleCancel = () => {
        setModalOpen(false);
      };

      const shareurl = `https://www.youtube.com/watch?v=${id}`

    useEffect(()=>{
            FetchfromApi(`videos?part=snippet,statistics&id=${id}`)
            .then((data)=> setVideoDetail(data.items[0]) )

            FetchfromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data)=> setVideo(data.items) )

    const fetchComments = async () => {
        try {
          const response = await FetchfromApi(`commentThreads?part=snippet&videoId=${id}&maxResults=10`);
          const commentItems = response.items || [];
          const commentsArray = commentItems.map(item => ({
            id: item.id,
            text: item.snippet.topLevelComment.snippet.textDisplay,
            author: item.snippet.topLevelComment.snippet.authorDisplayName,
            publishedAt:new Date (item.snippet.topLevelComment.snippet.publishedAt).toLocaleString(),
          }));
          setComments(commentsArray);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
    }, [id]);

        if(!videoDetail?.snippet) return   <Skeleton active />

    const {snippet:{ title, channelId, channelTitle } , statistics:{viewCount , likeCount}} = videoDetail
  return (
   <Layout  className='min-h-[600px] bg-black text-white'>
    <Content className='text-white'>
        <div className='grid md:grid-cols-3'>
            <div className='flex flex-col gap-5 col-span-2 p-7'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls width='auto' />
            <h1 className='font-bold p-2'>{title}</h1>
            <div className=' flex md:justify-between justify-evenly gap-6'>
                <Link to={`/channel/${channelId}`}>
                    <div className='flex gap-2'>
                    <h1 className='text-white font-semibold text-xl'>{channelTitle}</h1>
                    <span>< FaRegCheckCircle color='white'  className='mt-1  text-xl'/></span>
                    </div>
                </Link>
                <div className='flex'>
                    <h1 className='mr-5 text-gray-400'> {parseInt(viewCount).toLocaleString()} Views</h1>
                    <h1 className='mr-9 text-gray-400'> {parseInt(likeCount).toLocaleString()} Likes</h1>
                </div>
            </div>
             
            
             <Button type='primary'
                      onClick={openModal} 
                     className=' p-2 rounded-lg text-xl flex items-center justify-center gap-3 ' >
                Share  <FaRegShareSquare/>
            </Button> 
          <Modal title="Share With...." open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='gap-7 flex mt-6'>
                <FacebookShareButton url={shareurl}>
                 <button>
                    <Tooltip title="FaceBook">
                    <FacebookOutlined className='text-6xl text-blue-500'/>
                    </Tooltip>
                </button>   
                </FacebookShareButton>
                <InstapaperShareButton url={shareurl}>
                <button>
                    <Tooltip title="Instagram">
                    <InstagramOutlined className=' text-orange-400 text-6xl' />
                    </Tooltip>
                 </button>    
                 </InstapaperShareButton>
                 <TwitterShareButton url={shareurl}>
                 <button>
                    <Tooltip title="Twitter">
                    <TwitterOutlined className='text-red-600 text-6xl'/>
                    </Tooltip>
                </button>  
                </TwitterShareButton>
            </div>

      </Modal>

         <div className='col-span-2 hidden md:block'>
        <h1 className='font-bold text-2xl text-red-500'>Comments</h1>
         <div className='  mt-4'>
             {comments.map(comment => (
                 <div key={comment.id} className=' border-b border-t border-gray-400 p-5' >
                    <div className='flex gap-4 items-center justify-start'>
                     <p className="text-lg">By: {comment.author}</p> 
                     <p>Published at: { comment.publishedAt}</p>
                     </div>
                     <div className='p-2 flex justify-start'> 
                         <p className='text-slate-300'>{comment.text}</p> 
                    </div>
                    <div className='gap-5 flex items-center ml-3'>
                        <Tooltip title="Like">
                        <button>
                        <LikeOutlined className='text-xl'/>
                        </button>
                        </Tooltip>
                        <Tooltip title="Dislike">
                        <button>
                        <DislikeOutlined className='text-xl mt-1'/>
                        </button>
                        </Tooltip>
                    </div>
                 </div>
             ))}
        </div>
         </div>
             </div>

             <div className='mx-24'>
                <div className='flex flex-col items-center p-4'>
                    <h1 className='text-rose-500 font-semibold text-2xl' > Related to your Search Video</h1>
                    <Videos videos={video} direction="flex flex-col items-center" />
                </div>
            </div>

        </div>
    </Content>
   </Layout>
    )
}
export default VideoDetail;
