import useAxios from '../../hooks/useAxios'

const axios = useAxios()

export const getAvailableSites = async (arrivalDate, departureDate, tenantId) => {
	try {
		return await axios.get(
			`/site/get_available_sites?arrival_date=${arrivalDate}&departure_date=${departureDate}&tenant_id=${tenantId}`
		)
	} catch (err) {
		return err.response
	}
}
