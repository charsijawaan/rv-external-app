import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { camperStore } from '../../store/camperStore'
import { getTrips, cancelReservation } from '../../services/camper'
import { submitReview } from '../../services/tenant'
import moment from 'moment'
import { MdDelete, MdReviews } from 'react-icons/md'
import Button from './../../components/UI/Button'
import ReviewModal from '../../components/ReviewModal'
import CancelTripModal from '../../components/CancelTripModal'
import toast from 'react-hot-toast'

const MyTripsPage = () => {
	const router = useRouter()
	const camper = camperStore.useState((s) => s.camper)
	const [selectedTab, setSelectedTab] = useState('current')

	const [reservations, setReservations] = useState({
		current: [],
		upcoming: [],
		history: [],
	})
	const [showModal, setShowModal] = useState(false)

	const refetchTrips = async () => {
		const res = await getTrips(camper._id)
		const reservations = res.data.reservations

		let today = new Date()
		let currentTemp = []
		let upcomingTemp = []
		let historyTemp = []

		for (let i = 0; i < reservations?.length; i++) {
			let startDate = new Date(reservations[i].arrivalDate)
			let endDate = new Date(reservations[i].departureDate)

			if (today > endDate) {
				historyTemp.push(reservations[i])
			} else if (today < startDate) {
				upcomingTemp.push(reservations[i])
			} else if (startDate < today && endDate > today) {
				currentTemp.push(reservations[i])
			}
		}

		setReservations({
			current: currentTemp,
			upcoming: upcomingTemp,
			history: historyTemp,
		})
	}

	const onCancelReservation = async (reservationId) => {
		const res = await cancelReservation({
			reservationId: reservationId,
		})
		if (res.status === 200) {
			toast.success(res.data.message)
			refetchTrips()
		} else {
			toast.error(res.data.message)
		}
	}

	const onSubmitReview = async (data) => {
		const res = await submitReview(data)
		if (res.status === 200) {
			toast.success(res.data.message)
			setShowModal(false)
		} else {
			toast.error(res.data.message)
		}
	}

	useEffect(() => {
		if (!camper) router.push('/login')
		refetchTrips()
	}, [])

	return (
		<>
			<div className='flex px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<ul className='flex flex-wrap border border-gray-200 rounded-md shadow-md'>
					<MyTripsTab
						tabName='current'
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
					<MyTripsTab
						tabName='upcoming'
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
					<MyTripsTab
						tabName='history'
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</ul>
			</div>
			<div className='flex px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='w-full overflow-x-auto'>
					<table className='table-auto'>
						<thead>
							<tr>
								<th className='py-3 pr-16'>Name</th>
								<th className='py-3 pr-16'>Address</th>
								<th className='py-3 pr-16'>Arrival & Departure</th>
								<th className='py-3 pr-16'>Total Cost</th>
								{selectedTab === 'upcoming' && (
									<th className='py-3 pr-16'>Cancel</th>
								)}
								{selectedTab === 'history' && (
									<th className='py-3 pr-16'>Review</th>
								)}
							</tr>
						</thead>
						<tbody>
							{selectedTab === 'current' && (
								<>
									{reservations.current?.map((r) => (
										<tr>
											<td className='py-3 pr-16'>{r.tenantId.name}</td>
											<td className='py-3 pr-16'>{r.tenantId.address}</td>
											<td className='py-3 pr-16'>
												{moment(r.arrivalDate).format('YYYY-MM-DD')} &{' '}
												{moment(r.departureDate).format('YYYY-MM-DD')}
											</td>
											<td className='py-3 pr-16'>-</td>
										</tr>
									))}
								</>
							)}
							{selectedTab === 'upcoming' && (
								<>
									{reservations.upcoming?.map((r) => (
										<tr>
											<td className='py-3 pr-16'>{r.tenantId.name}</td>
											<td className='py-3 pr-16'>{r.tenantId.address}</td>
											<td className='py-3 pr-16'>
												{moment(r.arrivalDate).format('YYYY-MM-DD')} &{' '}
												{moment(r.departureDate).format('YYYY-MM-DD')}
											</td>
											<td className='py-3 pr-16'>-</td>
											<td className='py-3 pr-16'>
												<Button onClick={() => setShowModal(true)}>
													<MdDelete
														style={{
															fontSize: 18,
															color: '#fff',
														}}
													/>
												</Button>{' '}
												<>
													{showModal && (
														<CancelTripModal
															setShowModal={setShowModal}
															onCancelReservation={
																onCancelReservation
															}
															reservationId={r._id}
														/>
													)}
												</>
											</td>
										</tr>
									))}
								</>
							)}
							{selectedTab === 'history' && (
								<>
									{reservations.history?.map((r) => (
										<tr>
											<td className='py-3 pr-16'>{r.tenantId.name}</td>
											<td className='py-3 pr-16'>{r.tenantId.address}</td>
											<td className='py-3 pr-16'>
												{moment(r.arrivalDate).format('YYYY-MM-DD')} &{' '}
												{moment(r.departureDate).format('YYYY-MM-DD')}
											</td>
											<td className='py-3 pr-16'>-</td>
											<td className='py-3 pr-16'>
												<Button onClick={() => setShowModal(true)}>
													<MdReviews
														style={{
															fontSize: 18,
															color: '#fff',
														}}
													/>
												</Button>{' '}
												<>
													{showModal && (
														<ReviewModal
															setShowModal={setShowModal}
															onSubmitReview={onSubmitReview}
															reservation={r}
														/>
													)}
												</>
											</td>
										</tr>
									))}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

const MyTripsTab = ({ tabName, selectedTab, setSelectedTab }) => {
	return (
		<>
			<li className='mr-2'>
				<a
					className={classNames(
						'inline-block px-4 py-4 text-sm font-medium text-center rounded-t-lg cursor-pointer capitalize',
						selectedTab === tabName ? 'bg-airbnb-red text-white' : 'text-black'
					)}
					onClick={() => setSelectedTab(tabName)}
				>
					{tabName}
				</a>
			</li>
		</>
	)
}

export default MyTripsPage
