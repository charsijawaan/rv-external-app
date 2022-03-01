import { useRouter } from 'next/router'
import Button from '../UI/Button'

const RVParkCard = ({ tenant }) => {
	const router = useRouter()

	const getDefaultImage = () => tenant.images.filter((image) => image.isDefault)[0].image
	const getStartingRate = () => Math.min(...tenant.sites.map((site) => Number(site.rate)))

	return (
		<div className='flex items-center py-6'>
			{/* Image */}
			<div>
				<img
					className='w-[300px] h-[200px] rounded-xl'
					src={getDefaultImage()}
					alt='default-rv-image'
				/>
			</div>
			{/* Info */}
			<div className='ml-5'>
				<div className='py-1 text-xl font-bold'>{tenant.name}</div>
				<div className='flex py-1 text-gray-600'>
					<svg
						className='w-[24px] h-[24px]'
						focusable='false'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z'></path>
						<circle cx='12' cy='9' r='2.5'></circle>
					</svg>
					<span className='ml-2'>{tenant.address}</span>
				</div>
				<div className='flex py-1 text-gray-600'>
					<svg
						className='w-[24px] h-[24px]'
						focusable='false'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z'></path>
					</svg>
					<span className='ml-2'>{tenant.phoneNumber}</span>
				</div>
				<div className='flex py-1 text-gray-600'>
					<svg
						className='w-[24px] h-[24px]'
						focusable='false'
						viewBox='0 0 24 24'
						aria-hidden='true'
					>
						<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 9h10.5v3.5H4V9zm0 5.5h10.5V18H4v-3.5zM20 18h-3.5V9H20v9z'></path>
					</svg>
					<span className='ml-2'>
						<a href={tenant?.businnessWebsite} target='_blank' rel='noreferrer'>
							{tenant?.businnessWebsite || 'N/A'}
						</a>
					</span>
				</div>
				<div className='py-1'>
					<Button onClick={() => router.push(`/tenant?tenant_id=${tenant._id}`)}>
						Check Availability
					</Button>
					<span className='ml-2'>
						<span className='font-bold'>${getStartingRate()}</span> / night
					</span>
				</div>
			</div>
		</div>
	)
}

export default RVParkCard
