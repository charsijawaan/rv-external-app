import useAxios from '../../hooks/useAxios'

const axios = useAxios()

export const registerCamper = async (data) => {
	try {
		return await axios.post('/auth/register_camper', data)
	} catch (err) {
		return err.response
	}
}

export const loginCamper = async (data) => {
	try {
		return await axios.post('/auth/login_camper', data)
	} catch (err) {
		return err.response
	}
}
