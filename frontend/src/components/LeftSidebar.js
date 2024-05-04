import React, { useContext, useState } from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
// import { deleteSocket, SocketContext } from '../utils/socket';

const LeftSidebar = ({ sidebarOpen }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const socket = useContext(SocketContext);



  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      // deleteSocket(socket);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const LeftSidebarMenu = [
    {
      link: "/",
      icon: <CiHome size="24px" />,
      text: "Home",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      link: "/",
      icon: <CiHashtag size="24px" />,
      text: "Explore",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      icon: <IoIosNotificationsOutline size="24px" />,
      text: "Notifications",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      link: "/messages",
      icon: <BiMessageSquareDetail size="24px" />,
      text: "Messages",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      link: `/profile/${user?._id}`,
      icon: <CiUser size="24px" />,
      text: "Profile",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      icon: <CiBookmark size="24px" />,
      text: "Bookmarks",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
    {
      onClick: logoutHandler,
      icon: <AiOutlineLogout size="24px" />,
      text: "Logout",
      className:
        "flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full",
    },
  ];
  return (
    <div className="">
      <div className={``}>
        {LeftSidebarMenu.map((menu,index) => {
          return (
            <div key={index} onClick={menu?.onClick}>
              <Link to={menu?.link} className={menu.className}>
                <div>{menu.icon}</div>
                <h1 className="font-bold text-lg ml-2">{menu.text}</h1>
              </Link>
            </div>
          );
        })}
        <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
