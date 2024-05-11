import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
import { HomeOutlined,
  JavaOutlined ,
  CustomerServiceOutlined ,
  SpotifyOutlined 
} from "@ant-design/icons";

import { RiMovieLine , RiLiveFill ,RiTShirt2Fill, RiBrushFill
,RiBitCoinLine 
} from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import { MdOutlineSportsHandball,MdTheaterComedy } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { Header } from 'antd/es/layout/layout';
import Videos from './videos';
import { FetchfromApi } from './shared/FetchfromApi';




const Feed = () => {

 
   const items = [
    { label: 'New', icon: <HomeOutlined/>},
    { label: 'JS Mastery', icon: <JavaOutlined/>},
    { label: 'Music', icon: <SpotifyOutlined /> },
    { label: 'Education', icon: <HomeOutlined /> },
    { label: 'Podcast', icon: <CustomerServiceOutlined /> },
    { label: 'Movie', icon: <RiMovieLine /> },
    { label: 'Gaming', icon: <SiYoutubegaming /> },
    { label: 'Live', icon: <RiLiveFill /> },
    { label: 'Sport', icon: <MdOutlineSportsHandball /> },
    { label: 'Fashion', icon: <RiTShirt2Fill /> },
    { label: 'Beauty', icon: <RiBrushFill/> },
    { label: 'Comedy', icon: <MdTheaterComedy/> },
    { label: 'Gym', icon: <CgGym  /> },
    { label: 'Crypto', icon: <RiBitCoinLine  /> },
    ];

    const [selected , setSelected] = useState(items[0].label)
    const [videos, setVideos] = useState([])

    const handleselect =({key})=>{
       const selectedItem = items.find(item => item.label === key );
      if(selectedItem){
        setSelected(selectedItem.label);
      }
    };

    useEffect (()=>{
      FetchfromApi(`search?part=snippet&q=${selected}`)
      .then((data)=>setVideos(data.items))
    },[selected])
  
  return (
    <Layout className='min-h-[600px] bg-black text-white' >
      <Sider 
       breakpoint='sm'
       className='h-screen'
      >
        <Menu className='bg-black' theme='dark'
         mode="inline" 
         onSelect={handleselect}
         defaultSelectedKeys={items[0].label}
         >
          {items.map((item) => (
          <Menu.Item key={item.label} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className='bg-black'> 
        
         <h1 className='text-red-600 text-[30px] font-bold'><span className='text-white'> {selected} </span> Videos</h1>
          </Header>
        <Content className='bg-black text-white'>
            <Videos videos={videos} />
        </Content>
      </Layout>
    </Layout>

  );
};
export default Feed;