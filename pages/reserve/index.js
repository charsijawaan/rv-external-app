import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { camperStore, mutateCamper } from '../../store/camperStore'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AddCardForm from '../../components/AddCardForm'
import {
	getCardsByCamperId,
	reserveSite,
	deleteCard,
	updateAdults,
	updateChildren,
} from '../../services/camper'
import { getTenantById } from '../../services/tenant'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import Button from './../../components/UI/Button'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const ReservePage = ({ tenant, siteId, startDate, endDate }) => {
	const router = useRouter()
	const camper = camperStore.useState((s) => s.camper)

	const [camperCards, setCamperCards] = useState([])
	const [showCheckoutForm, setShowCheckoutForm] = useState(false)
	const [selectedCreditCard, setSelectedCreditCard] = useState()
	const [notes, setNotes] = useState('')

	const refetchCards = async () => {
		const res = await getCardsByCamperId(camper._id)
		setCamperCards(res.data.creditCards)
		setSelectedCreditCard(res.data.creditCards[0])
	}

	useEffect(() => {
		if (!camper) router.push('/login')
		refetchCards()
	}, [])

	const onReserve = async () => {
		const res = await reserveSite({
			camperId: camper._id,
			tenantId: tenant._id,
			siteId: siteId,
			startDate: startDate,
			endDate: endDate,
			camperCreditCard: selectedCreditCard,
			notes: notes,
			createdBy: camper.email,
		})
		if (res.status === 200) toast.success(res.data.message)
		else toast.error(res.data.message)
	}

	const onDeleteCard = async (card) => {
		const res = await deleteCard({
			cardId: card._id,
		})
		if (res.status === 200) {
			toast.success(res.data.message)
			refetchCards()
		} else toast.error(res.data.message)
	}

	const onUpdateAdults = async (adults) => {
		const res = await updateAdults({ camperId: camper._id, adults: adults })
		if (res.status === 200) {
			mutateCamper({ ...camper, adults: adults })
		}
	}

	const onUpdateChildren = async (children) => {
		const res = await updateChildren({ camperId: camper._id, children: children })
		if (res.status === 200) {
			mutateCamper({ ...camper, children: children })
		}
	}

	return (
		<>
			<div className='px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='flex py-4'>
					{/* Tenant Details */}
					<div>
						<div className='text-xl font-bold'>Tenant Details</div>
						<div>{tenant.name}</div>
						<div>{tenant.address}</div>
						<div>{tenant.phoneNumber}</div>
					</div>
					{/* Camper Details */}
					<div className='ml-20 '>
						<div className='text-xl font-bold'>Camper Details</div>
						<div>
							{camper?.firstName} {camper?.lastName}
						</div>
						<div>
							{camper?.address} {camper?.city}, {camper?.state} {camper?.zip}
						</div>
					</div>
				</div>

				<div className='py-4'>
					<div className='text-xl font-bold'>Reserve Date</div>
					<div className='py-2'>14 Feb 2022 - 15 Feb 2022</div>
				</div>

				<div className='py-4'>
					<div className='text-xl font-bold'>How many people are travelling</div>
					<div className='flex py-2'>
						<div>
							<span>Adults</span>
							<input
								onChange={(e) => {
									onUpdateAdults(e.target.value)
								}}
								type='number'
								value={camper?.adults}
								min={0}
								className='ml-2 pl-2 w-[70px] border-2 rounded-md outline-none'
							/>
						</div>
						<div className='ml-6'>
							<span>Children</span>
							<input
								onChange={(e) => {
									onUpdateChildren(e.target.value)
								}}
								type='number'
								value={camper?.children}
								min={0}
								className='ml-2 pl-2 w-[70px] border-2 rounded-md outline-none'
							/>
						</div>
					</div>
				</div>

				<div className='py-4'>
					<div className='text-xl font-bold'>Credit Cards</div>
					<div>
						{camperCards?.map((card) => (
							<div
								className={classNames(
									'flex items-center justify-between max-w-xs py-2 cursor-pointer',
									card?._id === selectedCreditCard?._id
										? 'text-blue-600 border border-red-500 px-0.5'
										: undefined
								)}
								onClick={() => {
									setSelectedCreditCard(card)
								}}
							>
								<span className='text-lg'>
									{card?.creditCardType} - {'**** ***** **** '}
									{card.creditCardLastFour}
								</span>
								<span>
									<Button onClick={() => onDeleteCard(card)}>Delete</Button>
								</span>
							</div>
						))}
					</div>
					<div className='py-2 font-bold text-m'>Add New Credit Card</div>
					<div>
						{showCheckoutForm ? (
							<>
								<Elements stripe={stripePromise}>
									<AddCardForm
										onCancel={() => {
											setShowCheckoutForm(false)
											refetchCards()
										}}
									/>
								</Elements>
							</>
						) : (
							<>
								<Button
									onClick={() => {
										setShowCheckoutForm(true)
									}}
								>
									Add New
								</Button>
							</>
						)}
					</div>
				</div>

				<div className='py-4'>
					<div className='text-xl font-bold'>Requests (Optional)</div>
					<div className='py-2'>
						<textarea
							cols={60}
							rows={5}
							className='pl-2 border-2 rounded-md outline-none'
							value={notes}
							onChange={(e) => {
								setNotes(e.target.value)
							}}
						></textarea>
					</div>
				</div>

				<div className='py-4'>
					<Button onClick={onReserve}>Reserve</Button>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const { tenant_id, site_id, start_date, end_date } = context.query
	const res = await getTenantById(tenant_id)
	return {
		props: {
			tenant: res.data.tenant,
			siteId: site_id,
			startDate: start_date,
			endDate: end_date,
		},
	}
}

export default ReservePage
