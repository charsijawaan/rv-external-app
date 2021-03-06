import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ImageViewer from 'react-simple-image-viewer'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../../components/MapMarker'
import { camperStore } from '../../store/camperStore'
import { getTenantById } from './../../services/tenant'
import ReviewCard from '../../components/ReviewCard'
import TenantSiteTable from '../../components/TenantSiteTable'
import Amenities from '../../components/Amenities'
import Attractions from '../../components/Attractions'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import moment from 'moment'
import { getAvailableSites } from '../../services/sites'
import ReactPaginate from 'react-paginate'

const TenantPage = ({ tenant }) => {
	const router = useRouter()
	const camper = camperStore.useState((s) => s.camper)
	const [photoIndex, setPhotoIndex] = useState()
	const [imageViewerIsOpen, setImageViewerIsOpen] = useState(false)
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(moment(new Date()).add(1, 'day')),
		key: 'selection',
	})
	const [availableSites, setAvailableSites] = useState([])
	const [loading, setLoading] = useState(false)

	const refetchSites = async (arrivalDate, departureDate) => {
		setLoading(true)
		const res = await getAvailableSites(
			moment(arrivalDate).format('YYYY-MM-DD'),
			moment(departureDate).format('YYYY-MM-DD'),
			tenant._id
		)
		setAvailableSites(res.data.availableSites)
		setLoading(false)
	}

	// pagination for reviews
	const [reviewsPageNumber, setReviewsPageNumber] = useState(0)
	const reviewsPerPage = 6
	const reviewsPagesVisited = reviewsPageNumber * reviewsPerPage
	const reviewsPageCount = Math.ceil(tenant?.reviews.length / reviewsPerPage)
	const reviewsChangePage = ({ selected }) => {
		setReviewsPageNumber(selected)
	}

	useEffect(() => {
		router.replace(
			`/tenant?tenant_id=${tenant._id}&start_date=${moment(selectionRange.startDate).format(
				'YYYY-MM-DD'
			)}&end_date=${moment(selectionRange.endDate).format('YYYY-MM-DD')}`,
			undefined,
			{ scroll: false }
		)
		refetchSites(selectionRange.startDate, selectionRange.endDate)
	}, [selectionRange])

	const selectDateRange = (ranges) => {
		const startDate = ranges.selection.startDate
		const endDate = ranges.selection.endDate
		setSelectionRange({
			startDate: startDate,
			endDate: endDate,
			key: 'selection',
		})
	}

	const onReserve = (siteId) => {
		if (!camper) router.push('/login')
		else {
			router.push(
				`/reserve?tenant_id=${tenant._id}&start_date=${moment(
					selectionRange.startDate
				).format('YYYY-MM-DD')}&end_date=${moment(selectionRange.endDate).format(
					'YYYY-MM-DD'
				)}&site_id=${siteId}`
			)
		}
	}

	return (
		<div className='divide-y'>
			<div className='flex px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				{/* Left Big */}
				<div className='w-2/5'>
					<img
						className='rounded-md h-[430px] cursor-pointer'
						onClick={() => {
							setPhotoIndex(0)
							setImageViewerIsOpen(true)
						}}
						src={tenant.images[0].image}
						alt='tenant-gallery-image-1'
					/>
				</div>

				{/* Right 4 */}
				<div className='w-3/5'>
					<div className='flex'>
						<div className='w-2/5 p-2'>
							<img
								className='h-[200px] w-full rounded-md cursor-pointer'
								onClick={() => {
									setPhotoIndex(1)
									setImageViewerIsOpen(true)
								}}
								src={tenant.images[1].image}
								alt='tenant-gallery-image-2'
							/>
						</div>
						<div className='w-3/5 p-2'>
							<img
								className='h-[200px] w-full rounded-md cursor-pointer'
								onClick={() => {
									setPhotoIndex(2)
									setImageViewerIsOpen(true)
								}}
								src={tenant.images[2].image}
								alt='tenant-gallery-image-3'
							/>
						</div>
					</div>

					<div className='flex'>
						<div className='w-3/5 p-2'>
							<img
								className='h-[200px] w-full rounded-md cursor-pointer'
								onClick={() => {
									setPhotoIndex(3)
									setImageViewerIsOpen(true)
								}}
								src={tenant.images[3].image}
								alt='tenant-gallery-image-4'
							/>
						</div>
						<div className='w-2/5 p-2'>
							<img
								className='h-[200px] w-full rounded-md cursor-pointer'
								onClick={() => {
									setPhotoIndex(4)
									setImageViewerIsOpen(true)
								}}
								src={tenant.images[4].image}
								alt='tenant-gallery-image-5'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='text-xl font-bold'>Sites</div>
				<div className='flex'>
					{/* Table Container */}
					<div className='w-3/5'>
						{loading ? (
							<>
								<div className='flex items-center justify-center'>
									<div className='inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin'></div>
								</div>
							</>
						) : (
							<>
								<div className='w-full overflow-x-auto'>
									<TenantSiteTable
										sitesPerPage={10}
										availableSites={availableSites}
										onReserve={onReserve}
									/>
								</div>
							</>
						)}
					</div>

					<div className='flex items-center justify-center w-2/5'>
						<DateRange
							ranges={[selectionRange]}
							onChange={selectDateRange}
							rangeColors={['#213053']}
						/>
					</div>
				</div>
			</div>

			{/* Amenities */}
			<div className='px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='py-4 text-xl font-bold'>Amenities</div>
				<div className='grid grid-cols-3'>
					<Amenities amenities={tenant?.amenities} />
				</div>
			</div>

			{/* Attractions */}
			<div className='px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='py-4 text-xl font-bold'>Attractions</div>
				<div className='grid grid-cols-3'>
					<Attractions attractions={tenant?.attractions} />
				</div>
			</div>

			{/* Reviews */}
			<div className='px-2 py-4 md:px-10 lg:px-14 xl:px-24'>
				<div className='py-4 text-xl font-bold'>Reviews</div>
				<div className='grid grid-cols-2'>
					{tenant?.reviews
						.slice(reviewsPagesVisited, reviewsPagesVisited + reviewsPerPage)
						.map((review) => (
							<>
								<ReviewCard key={review._id} review={review} />
							</>
						))}
				</div>
				<div className='m-10 '>
					<ReactPaginate
						previousLabel={'Prev'}
						nextLabel={'Next'}
						pageCount={reviewsPageCount}
						onPageChange={reviewsChangePage}
						containerClassName={'paginationBttns'}
						previousLinkClassName={'previousBttn'}
						nextLinkClassName={'nextBttn'}
						disabledClassName={'paginationDisabled'}
						activeClassName={'paginationActive'}
					/>
				</div>
			</div>

			{/* Map */}
			<div className='w-screen px-2 py-4 h-80 md:px-10 lg:px-14 xl:px-24'>
				<GoogleMapReact
					yesIWantToUseGoogleMapApiInternals
					bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
					center={{
						lat: Number(tenant.latitude),
						lng: Number(tenant.longitude),
					}}
					defaultZoom={12}
					options={googleMapOptions}
				>
					<MapMarker
						lat={Number(tenant.latitude)}
						lng={Number(tenant.longitude)}
						key={tenant._id}
						tenant={tenant}
					/>
				</GoogleMapReact>
			</div>

			{/* Image Gallery Overlay */}
			<div>
				{imageViewerIsOpen && (
					<ImageViewer
						src={[
							'https://images.unsplash.com/photo-1612256035919-9f60d014b7e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
							'https://images.unsplash.com/photo-1586890662737-9f107825e147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
							'https://images.unsplash.com/photo-1567979046992-f09718a7c254?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
							'https://images.unsplash.com/photo-1624503498849-02bb6c225065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
							'https://images.unsplash.com/photo-1619317190381-643a6b28d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
						]}
						currentIndex={photoIndex}
						disableScroll={true}
						closeOnClickOutside={true}
						onClose={() => setImageViewerIsOpen(false)}
						backgroundStyle={{
							backgroundColor: 'rgba(0,0,0,0.8)',
							zIndex: 2,
						}}
					/>
				)}
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { tenant_id } = context.query
	const res = await getTenantById(tenant_id)
	return {
		props: {
			tenant: res.data.tenant,
		},
	}
}

export default TenantPage

const googleMapOptions = {
	scrollwheel: true,
	styles: [
		{
			stylers: [{ saturation: 20 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }],
		},
	],
}
