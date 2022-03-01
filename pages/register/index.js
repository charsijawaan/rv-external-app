import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { registerSchema } from '../../schemas'
import { registerCamper } from '../../services/auth'
import { camperStore } from '../../store/camperStore'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'

const RegisterPage = () => {
	const router = useRouter()
	const camper = camperStore.useState((s) => s.camper)

	if (camper) router.push('/')

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(registerSchema),
	})

	const onRegister = async (data) => {
		const res = await registerCamper(data)
		if (res.status === 200) {
			toast.success(res.data.message)
		} else if (res.status === 409) {
			toast.error(res.data.message)
		}
	}

	return (
		<div className='max-w-md py-6 ml-auto mr-auto '>
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
			<div className='flex justify-center py-2 text-2xl font-bold'>Register</div>
			<form onSubmit={handleSubmit(onRegister)}>
				{/* First Name & Last Name */}
				<div className='flex py-2'>
					<div className='w-1/2 pr-1'>
						<label className='block text-lg font-medium text-gray-700'>
							First Name
						</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<Input
								type='text'
								placeholder='First Name'
								inputClasses={
									formState.errors.firstName ? 'border-red-500' : 'border-black'
								}
								register={register('firstName')}
							/>
						</div>
					</div>

					<div className='w-1/2 pl-1'>
						<label className='block text-lg font-medium text-gray-700'>Last Name</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<Input
								type='text'
								placeholder='Last Name'
								inputClasses={
									formState.errors.lastName ? 'border-red-500' : 'border-black'
								}
								register={register('lastName')}
							/>
						</div>
					</div>
				</div>
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
				{/* Address */}
				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>Address</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='text'
							placeholder='Address'
							inputClasses={
								formState.errors.address ? 'border-red-500' : 'border-black'
							}
							register={register('address')}
						/>
					</div>
				</div>

				{/* City */}
				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>City</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='text'
							placeholder='City'
							inputClasses={formState.errors.city ? 'border-red-500' : 'border-black'}
							register={register('city')}
						/>
					</div>
				</div>

				{/* State & Zip */}
				<div className='flex py-2'>
					<div className='w-1/2 pr-1'>
						<label className='block text-lg font-medium text-gray-700'>State</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<Input
								type='text'
								placeholder='State'
								inputClasses={
									formState.errors.state ? 'border-red-500' : 'border-black'
								}
								register={register('state')}
							/>
						</div>
					</div>
					<div className='w-1/2 pl-1'>
						<label className='block text-lg font-medium text-gray-700'>Zip</label>
						<div className='relative mt-1 rounded-md shadow-sm'>
							<Input
								type='text'
								placeholder='Zip'
								inputClasses={
									formState.errors.zip ? 'border-red-500' : 'border-black'
								}
								register={register('zip')}
							/>
						</div>
					</div>
				</div>

				{/* Phone Number */}
				<div className='py-2'>
					<label className='block text-lg font-medium text-gray-700'>Phone Number</label>
					<div className='relative mt-1 rounded-md shadow-sm'>
						<Input
							type='text'
							placeholder='Phone Number'
							inputClasses={
								formState.errors.phoneNumber ? 'border-red-500' : 'border-black'
							}
							register={register('phoneNumber')}
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

				{/* Confirm Password */}
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

				{/* Continue */}
				<div className='py-2'>
					<Button type='submit' buttonClasses='w-full'>
						Continue
					</Button>
				</div>
			</form>
		</div>
	)
}

export default RegisterPage
