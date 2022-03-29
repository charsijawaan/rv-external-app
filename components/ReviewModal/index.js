import { useState } from 'react'
import { camperStore } from '../../store/camperStore'
import Button from '../UI/Button'
import { FaStar } from 'react-icons/fa'

const ReviewModal = ({ setShowModal, onSubmitReview, reservation }) => {
	const camper = camperStore.useState((s) => s.camper)
	const stars = Array(5).fill(0)
	const [rating, setRating] = useState(0)
	const [hoverValue, setHoverValue] = useState(undefined)
	const [comment, setComment] = useState('')

	const handleClick = (value) => {
		setRating(value)
	}

	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue)
	}

	const handleMouseLeave = () => {
		setHoverValue(undefined)
	}

	return (
		<>
			<div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
				<div className='relative w-auto max-w-3xl mx-auto my-6'>
					{/* Content */}
					<div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
						{/* Header */}
						<div className='flex items-start justify-between p-2 border-b border-solid rounded-t border-blueGray-200'>
							<button
								type='button'
								className='inline-flex items-center ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
								data-modal-toggle='popup-modal'
								onClick={() => setShowModal(false)}
							>
								<svg
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
							</button>
						</div>
						{/* Body */}
						<div className='relative flex-auto p-2 text-center'>
							<div className='flex items-start p-2'>
								{stars.map((_, index) => {
									return (
										<FaStar
											key={index}
											size={24}
											onClick={() => handleClick(index + 1)}
											onMouseOver={() => handleMouseOver(index + 1)}
											onMouseLeave={handleMouseLeave}
											color={
												(hoverValue || rating) > index
													? '#FFBA5A'
													: '#a9a9a9'
											}
											className='cursor-pointer'
										/>
									)
								})}
							</div>

							<div className='p-2'>
								<textarea
									placeholder="What's your experience?"
									className='rounded-[12px] border-solid border-2 p-6 outline-none'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
							</div>
						</div>
						{/* Footer */}
						<div className='flex items-center justify-end p-2 border-t border-solid rounded-b border-blueGray-200'>
							<Button
								buttonClasses='mr-2'
								onClick={() => {
									onSubmitReview({
										tenantId: reservation.tenantId,
										rating,
										comment,
										camperId: camper._id,
										reservationId: reservation._id,
									})
								}}
							>
								Submit
							</Button>
							<Button onClick={() => setShowModal(false)}>Cancel</Button>
						</div>
					</div>
				</div>
			</div>
			<div className='fixed inset-0 z-40 bg-black opacity-25'></div>
		</>
	)
}

export default ReviewModal
