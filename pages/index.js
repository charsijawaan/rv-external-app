import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GooglePlacesAutocomplete, {
	geocodeByPlaceId,
	getLatLng,
} from 'react-google-places-autocomplete'

export default function Home() {
	const router = useRouter()
	const [address, setAddress] = useState(null)

	useEffect(() => {
		const onPlaceSelect = async () => {
			const geocodeObj =
				address && address.value && (await geocodeByPlaceId(address.value.place_id))
			const coordinates = geocodeObj && (await getLatLng(geocodeObj[0]))
			const palce = address?.label
			const lat = coordinates?.lat
			const lng = coordinates?.lng
			const query = `place=${palce}&lat=${lat}&lng=${lng}`
			router.push(`/rvparks?${query}`)
		}
		if (address) onPlaceSelect()
	}, [address])

	return (
		<>
			<div className='w-full h-[85vh] relative bg-no-repeat bg-home-bg-image bg-cover bg-fixed bg-center px-2 md:px-10 lg:px-14 xl:px-24'>
				<div className='flex items-center justify-center h-full'>
					<div className='relative w-4/5 p-2 bg-white md:w-1/2 rounded-3xl'>
						<GooglePlacesAutocomplete
							apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
							selectProps={{
								address,
								onChange: setAddress,
								styles: googleInputStyles,
							}}
						/>
						<div className='absolute p-3 text-white cursor-pointer right-5 top-2 bg-airbnb-red rounded-3xl'>
							<svg
								viewBox='0 0 32 32'
								xmlns='http://www.w3.org/2000/svg'
								aria-hidden='true'
								role='presentation'
								focusable='false'
								className='block stroke-current overflow-visible fill-inherit stroke-[4px] h-[16px] w-[16px]'
							>
								<g fill='none'>
									<path d='m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9'></path>
								</g>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const googleInputStyles = {
	menu: (provided, state) => ({
		...provided,
		outline: 'none',
		border: 'none',
		color: state.selectProps.menuColor,
		marginTop: 20,
		borderRadius: 20,
		padding: 10,
	}),
	control: (provided) => ({
		...provided,
		outline: 'none',
		border: 'none',
		boxShadow: 'none',
	}),
	singleValue: (provided) => ({
		...provided,
		boxShadow: 'none',
		borderRadius: 20,
	}),
}
