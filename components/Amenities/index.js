import { FaRestroom, FaDog, FaStoreAlt } from 'react-icons/fa'
import {
	MdCable,
	MdOutlineLocalLaundryService,
	MdPool,
	MdOutlineOutdoorGrill,
} from 'react-icons/md'
import WiShowers from 'react-icons/wi'
import CgGym from 'react-icons/cg'
import { FiWifi, FiTrash2 } from 'react-icons/fi'
import BiHandicap from 'react-icons/bi'

const Amenities = ({ amenities }) => {
	return (
		<>
			{amenities.map((amenity, key) => (
				<div key={key} className='flex w-1/3'>
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Wifi' && <FiWifi />}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Restrooms' && (
						<FaRestroom />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'DogFacilities' && (
						<FaDog />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'CableTV' && (
						<MdCable />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Showers' && (
						<WiShowers />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'GeneralStore' && (
						<FaStoreAlt />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Laundry' && (
						<MdOutlineLocalLaundryService />
					)}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Gym' && <CgGym />}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'Pool' && <MdPool />}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'TrashPickup' && (
						<FiTrash2 />
					)}
					{Object.values(amenity)[0] &&
						Object.keys(amenity)[0] === 'HandicapFacilities' && <BiHandicap />}
					{Object.values(amenity)[0] && Object.keys(amenity)[0] === 'BBQFacilities' && (
						<MdOutlineOutdoorGrill />
					)}
					<span className='ml-2'>
						{Object.values(amenity)[0] && Object.keys(amenity)[0]}
					</span>
				</div>
			))}
		</>
	)
}

export default Amenities
