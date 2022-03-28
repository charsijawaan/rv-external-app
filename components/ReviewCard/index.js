import moment from 'moment'
import { FaStar } from 'react-icons/fa'

const ReviewCard = ({ review }) => {
	return (
		<div className='flex'>
			<div>
				<div className='font-semibold'>
					{review.camper.firstName} {review.camper.lastName}
				</div>
				<div className='text-sm text-gray-600'>
					{moment(review.camper.createdAt).format('MMMM YYYY')}
				</div>
				<div>{review.comment}</div>
			</div>
			<div className='flex items-start p-2 ml-3'>
				{[...Array(review.rating)].map((_, index) => (
					<FaStar key={index} size={24} color={'#FFBA5A'} className='cursor-pointer' />
				))}
			</div>
		</div>
	)
}

export default ReviewCard
