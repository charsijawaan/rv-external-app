import useAxios from '../../hooks/useAxios'

const axios = useAxios()

export const getNearbyTenants = async (lat, lng) => {
	try {
		return await axios.get(`/tenant?lat=${lat}&lng=${lng}`)
	} catch (err) {
		return err.response
	}
}

export const getTenantById = async (tenantId) => {
	try {
		return await axios.get(`/tenant/get_tenant_by_id?tenant_id=${tenantId}`)
	} catch (err) {
		return err.response
	}
}

export const submitReview = async (data) => {
	try {
		return await axios.post('/tenant/review', data)
	} catch (err) {
		return err.response
	}
}
