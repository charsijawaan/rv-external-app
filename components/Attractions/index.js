import { FaUmbrellaBeach, FaBiking } from 'react-icons/fa'
import {
	MdGolfCourse,
	MdOutlineMuseum,
	MdSportsScore,
	MdOutlinePark,
	MdOutlineRestaurantMenu,
} from 'react-icons/md'
import { GiBoatFishing, GiHiking, GiHuntingBolas, GiWaterPolo } from 'react-icons/gi'

const Attractions = ({ attractions }) => {
	return (
		<>
			{attractions.map((attraction, key) => (
				<div key={key} className='flex w-1/3'>
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Biking' && (
						<FaBiking />
					)}
					{Object.values(attraction)[0] &&
						Object.keys(attraction)[0] === 'Restaurants' && <MdOutlineRestaurantMenu />}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Fishing' && (
						<GiBoatFishing />
					)}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Shopping' && (
						<AiOutlineShoppingCart />
					)}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Golfing' && (
						<MdGolfCourse />
					)}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Hiking' && (
						<GiHiking />
					)}
					{Object.values(attraction)[0] &&
						Object.keys(attraction)[0] === 'ProfessionalSports' && <MdSportsScore />}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Museums' && (
						<MdOutlineMuseum />
					)}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Hunting' && (
						<GiHuntingBolas />
					)}
					{Object.values(attraction)[0] &&
						Object.keys(attraction)[0] === 'Watersports' && <GiWaterPolo />}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Parks' && (
						<MdOutlinePark />
					)}
					{Object.values(attraction)[0] && Object.keys(attraction)[0] === 'Beach' && (
						<FaUmbrellaBeach />
					)}

					<span className='ml-2'>
						{Object.values(attraction)[0] && Object.keys(attraction)[0]}
					</span>
				</div>
			))}
		</>
	)
}

export default Attractions
