import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

const MapMarker = ({ tenant }) => {
	const getStartingRate = () => Math.min(...tenant.sites.map((site) => Number(site.rate)))

	return (
		<Tooltip
			placement='top'
			overlay={<MapMarkerOverlay tenant={tenant} />}
			overlayInnerStyle={{
				padding: 0,
				margin: 0,
				borderRadius: 15,
			}}
		>
			<div className='relative'>
				<img
					src='/white.webp'
					width={50}
					height={50}
					className='rounded-md'
					alt='white-background'
				/>
				<div className='absolute text-lg font-bold top-[1px] left-[10px]'>
					${getStartingRate()}
				</div>
			</div>
		</Tooltip>
	)
}

const MapMarkerOverlay = ({ tenant }) => {
	const getDefaultImage = () => tenant.images.filter((image) => image.isDefault)[0].image

	return (
		<div>
			<div>
				<img
					className='w-[200px] h-[150px] rounded-xl'
					src={getDefaultImage()}
					alt='default-tenant-image'
				/>
			</div>
			<div className='py-2 pl-4'>
				<div>
					<span className='text-lg font-semibold'>{tenant.name}</span>
				</div>
				<div>
					<span className='font-semibold text-[14px]'>$55 / night</span>
				</div>
			</div>
		</div>
	)
}

export default MapMarker
