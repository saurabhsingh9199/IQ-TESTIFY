import { useEffect, useState } from 'react'
import React from 'react'
import { apiConnector } from "../services/apiConnector"
import { useParams } from 'react-router-dom'
import { questionEndpoints, quizEndpoints } from '../services/APIs'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import QuizQuestions from '../components/core/attemptQuiz/QuizQuestions'
import toast from 'react-hot-toast'

const AttemptQuiz = () => {

    const [quizDetails, setQuizDetails] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [writtenAnswer, setWrittenAnswer] = useState('');

    const { token } = useSelector(state => state.auth)

    const { id: quizId } = useParams();

    const fetchQuizQuestions = async () => {
        setQuestionsLoading(true);
        try {
            const response = await apiConnector("GET", `${questionEndpoints.GET_QUIZ_QUESTIONS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })

            if (!response?.data?.success) {
                throw new Error(response.data.error || "Failed to fetch questions");
            }

            setQuizQuestions(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz details:', error);
            toast.error(error.message || "Failed to fetch questions");
        } finally {
            setQuestionsLoading(false);
        }
    };

    const fetchQuizDetails = async () => {
        try {
            setDetailsLoading(true);
            const response = await apiConnector("GET", `${quizEndpoints.GET_QUIZ_DETAILS}/${quizId}`, null, {
                Authorization: `Bearer ${token}`
            })

            if (!response?.data?.success) {
                throw new Error(response.data.error || "Failed to fetch quiz details");
            }

            setQuizDetails(response?.data?.data);
        } catch (error) {
            console.log('Error fetching quiz details:', error);
            toast.error(error.message || "Failed to fetch quiz details");
        } finally {
            setDetailsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizDetails();
        fetchQuizQuestions();
    }, [quizId]);

    const handleWrittenAnswerChange = (e) => {
        setWrittenAnswer(e.target.value);
    };

    return (
        <section className='min-h-[90vh] py-10'>
            <div className='border py-3 px-5 rounded-lg bg-slate-900 border-slate-600'>
                {
                    questionsLoading || detailsLoading ? <h1>Loading...</h1> :
                        <>
                            <span className='flex flex-col md:flex-row gap-x-5 gap-y-1 items-center justify-between font-thin mb-3'>
                                <h3 className='text-base md:text-2xl font-semibold line-clamp-2'>{quizDetails?.title}</h3>
                                <p className='text-slate-300 w-fit text-nowrap'>Time : {quizDetails?.timer} minutes</p>
                            </span>
                            <span className='flex flex-col md:flex-row justify-between items-center gap-x-5 gap-y-1 font-thin'>
                                <p className='font-thin mt-1 line-clamp-2'>{quizDetails?.description} </p>
                                <span className='flex gap-3 text-slate-300 w-fit text-nowrap'>
                                    <p>created By - {quizDetails?.createdBy?.username}</p>
                                    
                                    <p>{formatDistanceToNow(new Date(quizDetails.createdAt), { addSuffix: true })}</p>
                                </span>
                            </span>
                            
                            {/* Written Answer Section */}
                            <div className='mt-6 border-t border-slate-600 pt-4'>
                                <h4 className='text-lg font-semibold mb-2'>Additional Comments or Explanation</h4>
                                <textarea
                                    value={writtenAnswer}
                                    onChange={handleWrittenAnswerChange}
                                    placeholder="Write your additional thoughts or explanations here..."
                                    className='w-full min-h-[120px] p-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-y'
                                />
                            </div>
                        </>
                }
            </div>
            <div>
                <QuizQuestions 
                    quizDetails={quizDetails} 
                    quizQuestions={quizQuestions}
                    writtenAnswer={writtenAnswer} 
                />
            </div>
        </section>
    )
}

export default AttemptQuiz