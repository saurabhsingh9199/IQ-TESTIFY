import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import RequiredError from '../components/RequiredError'
import { signUp } from '../services/operations/AuthAPIs'
import HighLightText from '../components/HighLightText'
import { TbEyeClosed, TbEyeCheck } from "react-icons/tb";


const SignUp = () => {

  const [hidePassword, setHidePassword] = useState({
    password: true,
    confirmPassword: true,
  })
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...")
    try {
      const response = await signUp(data)
      if (response) {
        navigate("/login")
      }
    } catch (e) {
      console.log("ERROR WHILE SINGING UP : ", e);
    } finally {
      setLoading(false)
      toast.dismiss(toastId)
    }
  }

  useEffect(() => {
    setValue("role", "user")
  }, [setValue])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900'>
      <section className='w-full max-w-md px-4'>
        <h1 className='text-center pb-5 text-5xl font-mono text-white font-bold tracking-wider'>IQ-TESTIFY</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className='flex flex-col gap-y-4 bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 p-8 rounded-2xl'
        >
          <div>
            <h3 className='text-3xl pb-2 text-center leading-[1.125] text-white font-semibold'>
              Create Your <HighLightText>Free</HighLightText> Account
            </h3>
            <p className='text-center text-gray-300 text-sm'>Join us and start your learning journey</p>
          </div>

          {
            loading &&
            <span className='text-center text-red-300 text-sm bg-red-500/20 p-2 rounded-lg'>
              When loaded for the first time, the server might take a minute or two to respond. Please be patient!
            </span>
          }

          <span className='flex flex-col gap-1'>
            <label htmlFor="username" className='text-white font-medium'>Username</label>
            <input
              id='username'
              placeholder='Choose a username'
              className='py-2.5 text-base placeholder:text-gray-400 text-white rounded-lg px-4 outline-none bg-white/10 border border-white/20 focus:border-blue-500 transition-all duration-200 xl:text-lg'
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {
              errors?.username && <RequiredError>{errors.username.message}</RequiredError>
            }
          </span>

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
                placeholder='Create a password'
                className='py-2.5 text-base placeholder:text-gray-400 text-white w-full rounded-lg px-4 outline-none bg-white/10 border border-white/20 focus:border-blue-500 transition-all duration-200 xl:text-lg'
                type={hidePassword.password ? "password" : "text"}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className='p-3 cursor-pointer text-white hover:text-blue-400 transition-colors'
                onClick={() => setHidePassword((prev) => ({ ...prev, password: !hidePassword.password }))}
              >
                {
                  hidePassword.password ? <TbEyeClosed size={20} /> : <TbEyeCheck size={20} />
                }
              </span>
            </span>
            {
              errors?.password && <RequiredError>{errors.password.message}</RequiredError>
            }
          </span>

          <span className='flex flex-col gap-1'>
            <label htmlFor="confirmPassword" className='text-white font-medium'>Confirm Password</label>
            <span className='flex items-center w-full'>
              <input
                name='confirmPassword'
                id='confirmPassword'
                placeholder='Confirm your password'
                className='py-2.5 text-base placeholder:text-gray-400 text-white w-full rounded-lg px-4 outline-none bg-white/10 border border-white/20 focus:border-blue-500 transition-all duration-200 xl:text-lg'
                type={hidePassword.confirmPassword ? "password" : "text"}
                {...register("confirmPassword", { required: "Re-enter your password" })}
              />
              <span
                className='p-3 cursor-pointer text-white hover:text-blue-400 transition-colors'
                onClick={() => setHidePassword((prev) => ({ ...prev, confirmPassword: !hidePassword.confirmPassword }))}
              >
                {
                  hidePassword.confirmPassword ? <TbEyeClosed size={20} /> : <TbEyeCheck size={20} />
                }
              </span>
            </span>
            {
              errors?.confirmPassword && <RequiredError>{errors.confirmPassword.message}</RequiredError>
            }
          </span>

          <span className='flex border border-white/20 p-1 cursor-pointer w-max gap-3 rounded-full bg-white/5'>
            <button
              type="button"
              className={`${role === "user" ? "bg-blue-500 text-white" : "text-gray-300 hover:text-white"} px-4 py-1 rounded-full transition-all duration-200`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "user");
                setRole("user")
              }}>
              User
            </button>
            <button
              type="button"
              className={`${role === "admin" ? "bg-blue-500 text-white" : "text-gray-300 hover:text-white"} px-4 py-1 rounded-full transition-all duration-200`}
              onClick={(e) => {
                e.preventDefault();
                setValue("role", "admin");
                setRole("admin")
              }}>
              Admin
            </button>
          </span>

          <span className='mt-2'>
            <Button disabled={loading} varient={"primary"} type={"submit"} className="w-full py-2.5 text-lg font-medium">Create Account</Button>
          </span>

          <p className='text-center mt-4 text-gray-300'>
            Already have an account? 
            <span 
              onClick={() => navigate("/login")} 
              className='ml-2 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-medium'
            >
              Log in
            </span>
          </p>
        </form>
      </section>
    </div>
  )
}

export default SignUp