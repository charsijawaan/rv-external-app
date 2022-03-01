import RVParkCard from '../../components/RvParkCard'
import { getNearbyTenants } from '../../services/tenant'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../../components/MapMarker'

const RVParks = ({ tenants, location }) => {
	return (
		<>
			<div className='relative z-[1] px-2 md:px-10 lg:px-14 xl:px-24 flex'>
				{/* Rv Parks Container */}
				<div className='md:min-w-[600px] bg-white z-[2] h-screen'>
					<div className='py-6'>
						<span className='text-2xl font-bold shadow-md'>
							RV Parks Nearby, {location?.place}
						</span>
					</div>
					{/* Rv Park Cards List */}
					{tenants?.map((t) => (
						<RVParkCard key={t._id} tenant={t} />
					))}
				</div>
				{/* Map Container */}
				<div className='fixed right-0 w-0 h-screen lg:w-1/2'>
					<GoogleMapReact
						yesIWantToUseGoogleMapApiInternals
						bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
						center={{
							lat: location.lat,
							lng: location.lng,
						}}
						defaultZoom={12}
						options={googleMapOptions}
					>
						{tenants?.map((t) => (
							<MapMarker
								lat={Number(t.latitude)}
								lng={Number(t.longitude)}
								key={t._id}
								tenant={t}
							/>
						))}
					</GoogleMapReact>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const { place, lat, lng } = context.query
	const res = await getNearbyTenants(lat, lng)
	return {
		props: {
			tenants: res.data.tenants,
			location: {
				lat: Number(lat),
				lng: Number(lng),
				place: place,
			},
		},
	}
}

export default RVParks

const googleMapOptions = {
	scrollwheel: true,
	styles: [
		{
			stylers: [{ saturation: 20 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }],
		},
	],
}
