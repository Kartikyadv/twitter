import React,{useEffect, useState} from 'react'
import LeftSidebar from './LeftSidebar'
import LeftSidebarMobile from './LeftSidebarMobile.js'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from '../hooks/useOtherUsers';
import { useSelector } from "react-redux";
import useGetMyTweets from '../hooks/useGetMyTweets';


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
  // custom Hook
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <div className='flex flex-col md:flex-row justify-between w-full md:w-[85%] mx-auto'>
      <div className="sidebar-toggle md:hidden fixed top-4 right-4 rounded">
      <button
        
        onClick={()=>setSidebarOpen(!sidebarOpen)}
      >
            <img className='rounded-full' width={"34px"} src="https://firebasestorage.googleapis.com/v0/b/twitter-a543f.appspot.com/o/images%2Fuser%2Fposts%2F661bfb05478f80a7ccc89995-1713551702588?alt=media&token=288ba2c2-f32a-4edf-89e0-15d8f8e2d03a" alt="user-logo" />
      </button>
      </div>
      {sidebarOpen && <div className={`w-full md:w-[20%] sidebar ${sidebarOpen? 'open' : 'closed'}`}>
      <LeftSidebar sidebarOpen={sidebarOpen}/>
        </div>}
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  )
}

export default Home