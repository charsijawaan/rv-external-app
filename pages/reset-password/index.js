import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '../../schemas'
import { resetPassword } from '../../services/auth'
import toast from 'react-hot-toast'

const ResetPassword = () => {
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(resetPasswordSchema),
	})
	const [OTP, setOTP] = useState(0)
	console.log('OTP :', OTP)

	const onResetPassword = async (data) => {
		data = { ...data, OTP }
		const res = await resetPassword(data)
		if (res.status === 200) {
			toast.success(res.data.message)
			router.push('/login')
		} else if (res.status === 401) {
			toast.error(res.data.message)
		}
	}
	return (
		<div className='max-w-md py-6 ml-auto mr-auto'>
			<div className='flex justify-center'>
				<div className='p-2 rounded-3xl bg-airbnb-red'>
					<svg
						className='w-[24px] h-[24px] fill-white'
						focusable='false'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
					</svg>
				</div>
			</div>
			<div className='flex justify-center py-2 text-2xl font-bold'>Reset Password</div>

			<form onSubmit={handleSubmit(onResetPassword)}>
				{/* Email */}

				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>Email</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='text'
							placeholder='Email'
							inputClasses={
								formState.errors.email ? 'border-red-500' : 'border-black'
							}
							register={register('email')}
						/>
					</div>
				</div>
				{/* Password */}
				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>Password</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='password'
							placeholder='Password'
							inputClasses={
								formState.errors.password ? 'border-red-500' : 'border-black'
							}
							register={register('password')}
						/>
					</div>
				</div>
				{/*Confirm Password */}
				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>
						Confirm Password
					</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='password'
							placeholder='Confirm Password'
							inputClasses={
								formState.errors.confirmPassword ? 'border-red-500' : 'border-black'
							}
							register={register('confirmPassword')}
						/>
					</div>
				</div>
				<label className='mt-[1rem] block text-lg font-medium text-gray-700'>
					Enter Code
				</label>
				<div className='mt-[1rem] mb-[2rem] grid justify-items-center'>
					<OtpInput
						value={OTP}
						onChange={setOTP}
						numInputs={6}
						separator={<span>-</span>}
						inputStyle={{
							width: '2rem',
							height: '2rem',
							margin: '0rem 0.5rem ',
							fontSize: '1rem',
							borderRadius: 4,
							border: '1px solid rgba(0,0,0,0.3)',
						}}
					/>
				</div>

				<div className='py-2'>
					<Button type='submit' buttonClasses='w-full'>
						Submit
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ResetPassword
