import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const QuizResults = () => {
    const location = useLocation();
    const { score, total, writtenAnswer } = location.state || { score: 0, writtenAnswer: '' };
    const navigate = useNavigate();

    return (
        <div className='min-h-[80vh] flex flex-col gap-5 justify-center items-center'>
            <div className='text-center max-w-2xl w-full'>
                <h1 className='text-3xl border-b border-slate-600 pb-5'>Quiz Results</h1>
                <p className='text-2xl mt-4 flex items-center justify-center gap-3 font-thin'>
                    Your Score: <span className='font-semibold'>
                        <span className={`${score / total >= 0.4 ? "text-green-500" : "text-red-700"} `}>
                            {score}
                        </span> / {total}
                    </span>
                </p>

                {writtenAnswer && (
                    <div className='mt-8 text-left'>
                        <h2 className='text-xl mb-3 font-semibold'>Your Additional Comments:</h2>
                        <div className='p-4 bg-slate-800 rounded-lg border border-slate-600'>
                            <p className='whitespace-pre-wrap text-slate-300'>{writtenAnswer}</p>
                        </div>
                    </div>
                )}
            </div>
            <Button className='w-max mt-6' onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
};

export default QuizResults;
