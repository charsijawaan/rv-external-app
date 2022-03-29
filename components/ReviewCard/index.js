import moment from 'moment'
import { FaStar } from 'react-icons/fa'

const ReviewCard = ({ review }) => {
	return (
		<div>
			<div className='flex'>
				<div className='flex'>
					<div>
						<div className='font-semibold'>
							{review.camper.firstName} {review.camper.lastName}
						</div>
						<div className='text-sm text-gray-600'>
							{moment(review.camper.createdAt).format('MMMM YYYY')}
						</div>
					</div>

					<div className='flex'>
						{[...Array(review.rating)].map((_, index) => (
							<FaStar
								key={index}
								size={24}
								color={'#FFBA5A'}
								className='cursor-pointer'
							/>
						))}
					</div>
				</div>
			</div>

			<div>{review.comment}</div>
		</div>
	)
}

export default ReviewCard
