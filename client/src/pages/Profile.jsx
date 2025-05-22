import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import Button from "../components/Button"
import { FaHome } from "react-icons/fa";

const Profile = () => {

  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();

  return (
    <section className='py-5 px-3 md:p-10 min-h-[calc(100vh-10rem)] bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900 rounded-lg flex flex-col gap-y-5 items-start justify-start'>
      <h1 className='text-2xl md:text-4xl text-white font-semibold'>Profile</h1>
      <div className='w-full bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 py-5 px-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-base md:text-xl rounded-lg'>
        <h2 className='text-white'>Username : <span className='font-thin text-gray-300'>{user.username}</span></h2>
        <p className='text-white'>Email : <span className='font-thin text-gray-300'>{user.email}</span></p>
        <p className='text-white'>Joined : <span className='font-thin text-gray-300'>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</span></p>
        <p className='text-white'>Role : <span className='font-thin text-gray-300'>{user.role}</span></p>
      </div>

      <div className='w-full min-h-[50vh] grid place-content-center'>
          <p> </p>
          <Button onClick={() => navigate('/')} className='w-max flex gap-3 items-center py-2 bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300'>
            <FaHome /> Return to Home
          </Button>
      </div>

    </section>
  )
}

export default Profile