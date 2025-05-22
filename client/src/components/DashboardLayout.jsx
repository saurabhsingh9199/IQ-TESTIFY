import { useLocation } from 'react-router-dom'
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { logout } from '../services/operations/AuthAPIs'
import { useDispatch, useSelector } from 'react-redux'

const DashboardLayout = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector(state => state.auth)

    return (
        <section className='bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900 min-h-screen'>
            <div className='flex py-3 px-3 justify-between items-center gap-y-5 my-3 text-lg bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-lg'>
                <span className='space-x-1 md:space-x-3 text-sm md:text-base'>
                    <NavLink to={"/dashboard"} className={`hover:bg-white/20 transition-all duration-300 px-3 py-1 rounded-full text-white ${location.pathname === "/dashboard" && "bg-white/30"}`}>
                        Profile
                    </NavLink>
                    {
                        user.role === "admin" ? <>
                            <Link to={"/dashboard/create-quiz"} className={`hover:bg-white/20 transition-all duration-300 px-3 py-1 rounded-full text-white ${location.pathname.includes("create") && "bg-white/30"}`}>
                                Create
                            </Link>
                            <Link to={"/dashboard/quizes"} className={`hover:bg-white/20 transition-all duration-300 px-3 py-1 rounded-full text-white ${location.pathname.includes("quizes") && "bg-white/30"}`}>
                                Quizes
                            </Link>
                        </> : <>
                            <Link to={"/dashboard/history"} className={`hover:bg-white/20 transition-all duration-300 px-3 py-1 rounded-full text-white ${location.pathname.includes("history") && "bg-white/30"}`}>
                                History
                            </Link>
                        </>
                    }
                </span>
                <span>
                    <Button active={false} onClick={() => logout(dispatch, navigate)}>
                        Logout
                    </Button>
                </span>
            </div>
            <div className='p-4'>
                {children}
            </div>
        </section>
    )
}

export default DashboardLayout