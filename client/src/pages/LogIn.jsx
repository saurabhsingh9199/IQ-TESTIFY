import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { login } from '../services/operations/AuthAPIs'
import HighLightText from '../components/HighLightText'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";
import toast from 'react-hot-toast'


const LogIn = () => {

  const [hidePassword, setHidePassword] = useState(true)
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      const response = await login(data, dispatch)
      if (response) {
        navigate("/dashboard")
      }
    } catch (e) {
      console.log("ERROR WHILE SINGING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900'>
      <section className='w-full max-w-md px-4'>
        <h1 className='text-center pb-5 text-5xl font-mono text-white font-bold tracking-wider'>IQ-TESTIFY</h1>
        <div className='relative'>
          <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-50 hover:opacity-75 transition duration-1000'></div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='relative flex flex-col gap-y-4 bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 p-8 rounded-2xl'
          >
            <div>
              <h3 className='text-3xl pb-5 text-center leading-[1.125] text-white font-semibold'>
                Welcome Back!
              </h3>
              <p className='text-center text-gray-300 text-sm'>Please enter your credentials to continue</p>
            </div>

            {
              loading &&
              <span className='text-center text-red-300 text-sm bg-red-500/20 p-2 rounded-lg'>
                When loaded for the first time, the server might take a minute or two to respond. Please be patient!
              </span>
            }

            <span className='flex flex-col gap-1'>
              <label htmlFor="email" className='text-white font-medium'>Email</label>
              <input
                id='email'
                placeholder='Enter your email'
                className='py-2.5 text-base placeholder:text-gray-400 text-white rounded-lg px-4 outline-none bg-white/10 border border-white/20 focus:border-blue-500 transition-all duration-200 xl:text-lg'
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {
                errors?.email && <RequiredError>{errors.email.message}</RequiredError>
              }
            </span>

            <span className='flex flex-col gap-1'>
              <label htmlFor="password" className='text-white font-medium'>Password</label>
              <span className='flex items-center w-full'>
                <input
                  id='password'
                  placeholder='Enter your password'
                  className='py-2.5 text-base placeholder:text-gray-400 text-white w-full rounded-lg px-4 outline-none bg-white/10 border border-white/20 focus:border-blue-500 transition-all duration-200 xl:text-lg'
                  type={hidePassword ? "password" : "text"}
                  {...register("password", { required: "Password is required" })}
                />
                <span
                  className='p-3 cursor-pointer text-white hover:text-blue-400 transition-colors'
                  onClick={() => setHidePassword(!hidePassword)}
                >
                  {
                    hidePassword ? <TbEyeClosed size={20} /> : <TbEyeCheck size={20} />
                  }
                </span>
              </span>
              {
                errors?.password && <RequiredError>{errors.password.message}</RequiredError>
              }
            </span>

            <span className='mt-2'>
              <Button disabled={loading} varient={"primary"} type={"submit"} className="w-full py-2.5 text-lg font-medium">Sign In</Button>
            </span>

            <p className='text-center mt-4 text-gray-300'>
              Don't have an account? 
              <span 
                onClick={() => navigate("/signup")} 
                className='ml-2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-medium'
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LogIn