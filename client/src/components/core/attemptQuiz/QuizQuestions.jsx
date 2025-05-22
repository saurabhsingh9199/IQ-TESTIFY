import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../Button';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiConnector';
import { quizEndpoints } from "../../../services/APIs";
import { setUser } from "../../../slices/AuthSlice";
import toast from 'react-hot-toast';

const QuizQuestions = ({ quizDetails, quizQuestions, writtenAnswer }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const { token, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quizDetails?.timer) {
            setRemainingTime(quizDetails.timer * 60);
        }
    }, [quizDetails]);

    useEffect(() => {
        let timer;
        if (quizStarted && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (quizStarted && remainingTime === 0) {
            clearInterval(timer);
            alert('Time is up!');
            submitQuiz();
        }
        return () => clearInterval(timer);
    }, [quizStarted, remainingTime]);

    const handleAnswerChange = useCallback((questionId, selectedOption) => {
        setUserAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );
            if (existingAnswerIndex >= 0) {
                const newAnswers = [...prevAnswers];
                newAnswers[existingAnswerIndex].selectedOption = selectedOption;
                return newAnswers;
            } else {
                return [...prevAnswers, { questionId, selectedOption }];
            }
        });
    }, []);

    const startQuiz = () => {
        setQuizStarted(true);
    };

    const submitQuiz = async () => {
        try {
            // Validate that all questions are answered
            if (userAnswers.length < quizQuestions.length) {
                toast.error("Please answer all questions before submitting");
                return;
            }

            const response = await apiConnector(
                'POST',
                `${quizEndpoints.ATTEMMP_QUIZ}/${quizDetails._id}/attempt`,
                {
                    quizId: quizDetails._id,
                    answers: userAnswers,
                    writtenAnswer: writtenAnswer || '', // Include written answer in submission
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.error || "Failed to submit quiz");
            }

            dispatch(setUser({ 
                ...user, 
                attemptedQuizzes: [...(user.attemptedQuizzes || []), quizDetails._id] 
            }));
            
            navigate('/quiz-results', { 
                state: { 
                    score: response.data.score, 
                    total: quizQuestions.length,
                    writtenAnswer: writtenAnswer 
                } 
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast.error(error.message || "Failed to submit quiz");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='flex py-5 border min-h-[70vh] px-5 justify-center items-start mt-5 rounded-lg bg-slate-900 border-slate-600'>
            {!quizStarted ? (
                <div className='text-center'>
                    <p className='mb-4 text-slate-300'>Click the button below to start the quiz. Make sure you have enough time to complete it.</p>
                    <Button className='w-max mx-auto' onClick={startQuiz}>Start Quiz</Button>
                </div>
            ) : (
                <div className='w-full flex flex-col'>
                    <h2 className='border border-slate-600 py-2 px-3 rounded-lg text-center md:text-end'>Time Remaining: <span className='text-red-500 ml-2'>{formatTime(remainingTime)}</span></h2>
                    <div className='min-h-[50vh]'>
                        {quizQuestions && quizQuestions.map((ques) => (
                            <QuestionCard
                                key={ques._id}
                                question={ques}
                                onAnswerChange={handleAnswerChange}
                            />
                        ))}
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <p className='text-sm text-slate-400'>
                            {userAnswers.length} of {quizQuestions?.length} questions answered
                        </p>
                        <Button className='w-max self-end' onClick={submitQuiz}>Submit Quiz</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
