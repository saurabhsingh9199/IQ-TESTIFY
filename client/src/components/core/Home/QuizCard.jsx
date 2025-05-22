import { useEffect, useState } from 'react';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const QuizCard = ({ quiz }) => {

    const [attempted, setAttempted] = useState(false)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setAttempted(user?.attemptedQuizzes?.includes(quiz._id) ? true : false)
    }, [user])

    return (
        <Link to={`/quiz/${quiz._id}`} className='bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 p-3 rounded-lg relative overflow-hidden hover:bg-white/20 transition-all duration-300'>
            <h2 className='text-xl line-clamp-2 border-b border-white/20 pb-3 mb-2 text-white'>{quiz.title}</h2>
            <span className='font-thin text-gray-300'>
                <p className='line-clamp-2'>{quiz.description}</p>
                <span className='flex gap-3'>
                    <p>{quiz.createdBy.username}</p>
                    |
                    <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
                </span>
            </span>

            <span className='absolute top-[10%] right-[-10%] rotate-[30deg]'>
                {
                    attempted && (
                        <span className='bg-green-500/80 backdrop-blur-sm text-white px-10 py-1 text-sm rounded-full shadow-lg'>Completed</span>
                    )
                }
            </span>
        </Link>
    )
}

export default QuizCard