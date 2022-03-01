import toast from 'react-hot-toast'
import { camperStore } from '../../store/camperStore'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { addNewCard } from '../../services/camper'

const AddCardForm = ({ onCancel, refetchCards }) => {
	const stripe = useStripe()
	const elements = useElements()

	const camper = camperStore.useState((s) => s.camper)

	const onSaveCard = async () => {
		if (!stripe || !elements) {
			return
		}
		const card = elements.getElement(CardElement)
		if (card) {
			const result = await stripe.createToken(card)
			if (result.error) {
				toast.error(result.error.message)
			} else {
				const { token } = result
				const res = await addNewCard({
					customerId: null,
					creditCardType: token.card.brand,
					creditCardLastFour: token.card.last4,
					creditCardExpirationMonth: token.card.exp_month,
					creditCardExpirationYear: token.card.exp_year,
					token: token.id,
					stripeCustomerId: '',
					camperId: camper._id,
					createdBy: camper.email,
					isActive: true,
				})
				toast.success(res.data.message)
				onCancel()
			}
		} else {
			toast.error('Card not found.')
		}
	}

	return (
		<>
			<div className='py-2 border-2 rounded-md'>
				<CardElement options={cardOptions} />
			</div>
			<div className='py-2'>
				<button
					disabled={!stripe}
					className='px-6 py-2 font-bold text-white rounded-md shadow-md bg-airbnb-red'
					onClick={() => {
						onSaveCard()
					}}
				>
					Save
				</button>
				<button
					disabled={!stripe}
					className='px-6 py-2 ml-2 font-bold text-white rounded-md shadow-md bg-airbnb-red'
					onClick={onCancel}
				>
					Cancel
				</button>
			</div>
		</>
	)
}

export default AddCardForm

const cardOptions = {
	hidePostalCode: true,
	style: {
		base: {
			color: '#32325d',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4',
			},
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
}
